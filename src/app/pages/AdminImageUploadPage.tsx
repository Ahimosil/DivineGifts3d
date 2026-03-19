import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Upload, X, Copy, Check, Image as ImageIcon, Video as VideoIcon, LogOut, ArrowLeft, Trash2 } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { AdminNav } from '../components/AdminNav';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface UploadedAsset {
  id: string;
  dataUrl: string; // base64 data URL for localStorage
  preview: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: 'image' | 'video';
}

export function AdminImageUploadPage() {
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    fileName: string;
    progress: number;
    completed: boolean;
  }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load assets from localStorage on mount
  useEffect(() => {
    const savedAssets = localStorage.getItem('admin_uploaded_assets');
    if (savedAssets) {
      try {
        setUploadedAssets(JSON.parse(savedAssets));
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    }
  }, []);

  // Save assets to localStorage whenever they change
  useEffect(() => {
    if (uploadedAssets.length > 0) {
      localStorage.setItem('admin_uploaded_assets', JSON.stringify(uploadedAssets));
    }
  }, [uploadedAssets]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Limit to 15 files at a time
    if (fileArray.length > 15) {
      alert(`⚠️ Upload Limit Exceeded\n\nYou can only upload 15 files at a time.\n\nYou selected: ${fileArray.length} files\nPlease select 15 or fewer files and try again.`);
      return;
    }
    
    // Show upload UI immediately
    setIsUploading(true);
    
    // Initialize progress for all files at 0%
    const initialProgress = fileArray.map(file => ({
      fileName: file.name,
      progress: 0,
      completed: false
    }));
    setUploadProgress(initialProgress);

    let completedCount = 0;

    fileArray.forEach((file, fileIndex) => {
      // Check if it's an image or video
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (isImage || isVideo) {
        const id = `${isImage ? 'img' : 'vid'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const size = (file.size / 1024).toFixed(2);
        
        const reader = new FileReader();
        
        // Simulate progress since onprogress may not fire reliably
        const progressInterval = setInterval(() => {
          setUploadProgress(prev =>
            prev.map((item, i) => {
              if (i === fileIndex && !item.completed) {
                const newProgress = Math.min(item.progress + 10, 90);
                return { ...item, progress: newProgress };
              }
              return item;
            })
          );
        }, 100);
        
        reader.onloadstart = () => {
          setUploadProgress(prev =>
            prev.map((item, i) =>
              i === fileIndex ? { ...item, progress: 5 } : item
            )
          );
        };
        
        reader.onloadend = () => {
          clearInterval(progressInterval);
          
          const dataUrl = reader.result as string;
          const newAsset: UploadedAsset = {
            id,
            dataUrl,
            preview: dataUrl,
            name: file.name,
            size: `${size} KB`,
            uploadedAt: new Date().toISOString(),
            type: isImage ? 'image' : 'video'
          };
          
          setUploadedAssets(prev => [...prev, newAsset]);
          
          // Mark as 100% complete
          setUploadProgress(prev =>
            prev.map((item, i) =>
              i === fileIndex ? { ...item, progress: 100, completed: true } : item
            )
          );
          
          completedCount++;
          
          // Clear progress when all files are done
          if (completedCount === fileArray.length) {
            setTimeout(() => {
              setUploadProgress([]);
              setIsUploading(false);
            }, 1500);
          }
        };
        
        reader.onerror = () => {
          clearInterval(progressInterval);
          setUploadProgress(prev =>
            prev.map((item, i) =>
              i === fileIndex ? { ...item, progress: 0, completed: true } : item
            )
          );
          completedCount++;
          
          if (completedCount === fileArray.length) {
            setTimeout(() => {
              setUploadProgress([]);
              setIsUploading(false);
            }, 1500);
          }
        };
        
        reader.readAsDataURL(file);
      } else {
        completedCount++;
        if (completedCount === fileArray.length) {
          setTimeout(() => {
            setUploadProgress([]);
            setIsUploading(false);
          }, 1500);
        }
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeAsset = (id: string) => {
    setUploadedAssets(uploadedAssets.filter(asset => asset.id !== id));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all uploaded assets? This action cannot be undone.')) {
      setUploadedAssets([]);
      localStorage.removeItem('admin_uploaded_assets');
    }
  };

  return (
    <>
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
              <p className="text-sm text-gray-600">Upload and manage product images & videos • {uploadedAssets.length} assets stored</p>
            </div>
            <AdminNav />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Admin', path: '/admin' },
          { label: 'Asset Management' }
        ]} />
        
        {/* Upload Area */}
        <div
          className={`bg-white rounded-lg shadow-sm p-8 mb-6 border-2 border-dashed transition-colors ${
            isDragging 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-300 hover:border-pink-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Product Images
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop images here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Select Images
            </label>
            <p className="text-sm text-gray-500 mt-3">
              Supports: JPG, PNG, GIF, WebP, MP4, MOV • <strong>Max 15 files per upload</strong>
            </p>
          </div>
        </div>

        {/* Upload Limit Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                <strong>Upload Limit:</strong> You can upload a maximum of <strong>15 files per batch</strong>. If you need to upload more, please do multiple uploads.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📤 Uploading {uploadProgress.length} file{uploadProgress.length !== 1 ? 's' : ''}...
            </h3>
            <div className="space-y-4">
              {uploadProgress.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 truncate flex-1">
                      {item.fileName}
                    </span>
                    <span className={`ml-2 font-semibold ${
                      item.progress === 100 ? 'text-green-600' : 'text-pink-600'
                    }`}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        item.progress === 100 
                          ? 'bg-green-600' 
                          : 'bg-pink-600 animate-pulse'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  {item.progress === 100 && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Check className="w-4 h-4" />
                      <span>Complete</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Assets Grid */}
        {uploadedAssets.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Uploaded Assets ({uploadedAssets.length})
              </h2>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Asset Preview */}
                  <div className="relative aspect-square bg-gray-100">
                    {asset.type === 'image' ? (
                      <img
                        src={asset.preview}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={asset.preview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    )}
                    <button
                      onClick={() => removeAsset(asset.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      title="Remove asset"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {/* Type badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full flex items-center gap-1">
                      {asset.type === 'image' ? (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          Image
                        </>
                      ) : (
                        <>
                          <VideoIcon className="w-3 h-3" />
                          Video
                        </>
                      )}
                    </div>
                  </div>

                  {/* Asset Info */}
                  <div className="p-4">
                    <div className="flex items-start mb-3">
                      <ImageIcon className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {asset.name}
                        </p>
                        <p className="text-xs text-gray-500">{asset.size}</p>
                      </div>
                    </div>

                    {/* Asset ID - Copy Section */}
                    <div className="bg-gray-50 rounded p-3 mb-2">
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Asset ID
                      </label>
                      <div className="flex items-center justify-between">
                        <code className="text-xs text-gray-900 font-mono truncate flex-1">
                          {asset.id}
                        </code>
                        <button
                          onClick={() => copyToClipboard(asset.id, asset.id)}
                          className="ml-2 p-1.5 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded transition-colors"
                          title="Copy ID"
                        >
                          {copiedId === asset.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Preview URL - Copy Section */}
                    <div className="bg-gray-50 rounded p-3">
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Preview URL
                      </label>
                      <div className="flex items-center justify-between">
                        <code className="text-xs text-gray-900 font-mono truncate flex-1">
                          {asset.preview.substring(0, 30)}...
                        </code>
                        <button
                          onClick={() => copyToClipboard(asset.preview, `url_${asset.id}`)}
                          className="ml-2 p-1.5 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded transition-colors"
                          title="Copy URL"
                        >
                          {copiedId === `url_${asset.id}` ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {uploadedAssets.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📸 Image Gallery Features:
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span><strong>Persistent Storage:</strong> Images are saved to your browser and persist across sessions</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span><strong>Quick Upload:</strong> Drag & drop or click to upload multiple images at once</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span><strong>Easy Copy:</strong> One-click copy for image IDs and preview URLs</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">✓</span>
                <span><strong>Always Accessible:</strong> Access your gallery anytime at <code className="bg-blue-100 px-2 py-0.5 rounded">/admin/images</code></span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-blue-300">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Upload images here first, then copy the image URLs to use when adding/editing products.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}