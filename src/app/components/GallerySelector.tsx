import { useState, useEffect } from 'react';
import { X, Check, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface UploadedAsset {
  id: string;
  dataUrl: string;
  preview: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: 'image' | 'video';
}

interface GallerySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (urls: string[]) => void;
  type: 'image' | 'video' | 'both';
  multiple?: boolean;
}

export function GallerySelector({ isOpen, onClose, onSelect, type, multiple = true }: GallerySelectorProps) {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const savedAssets = localStorage.getItem('admin_uploaded_assets');
      if (savedAssets) {
        try {
          const allAssets = JSON.parse(savedAssets);
          const filteredAssets = type === 'both' 
            ? allAssets 
            : allAssets.filter((asset: UploadedAsset) => asset.type === type);
          setAssets(filteredAssets);
        } catch (error) {
          console.error('Error loading assets:', error);
        }
      }
    }
  }, [isOpen, type]);

  const toggleSelect = (url: string) => {
    if (multiple) {
      setSelectedUrls(prev =>
        prev.includes(url)
          ? prev.filter(u => u !== url)
          : [...prev, url]
      );
    } else {
      setSelectedUrls([url]);
    }
  };

  const handleConfirm = () => {
    onSelect(selectedUrls);
    setSelectedUrls([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedUrls([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Select from Gallery</h2>
            <p className="text-sm text-gray-600">
              {multiple ? 'Select multiple' : 'Select one'} {type === 'both' ? 'asset' : type}
              {selectedUrls.length > 0 && ` • ${selectedUrls.length} selected`}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {assets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-3">
                {type === 'image' ? <ImageIcon className="w-16 h-16 mx-auto" /> : <VideoIcon className="w-16 h-16 mx-auto" />}
              </div>
              <p className="text-gray-600 mb-2">No {type}s in gallery</p>
              <p className="text-sm text-gray-500">Upload some {type}s first in the Image Management page</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => toggleSelect(asset.preview)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedUrls.includes(asset.preview)
                      ? 'border-pink-600 ring-2 ring-pink-300'
                      : 'border-gray-200 hover:border-pink-400'
                  }`}
                >
                  {/* Asset Preview */}
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
                    />
                  )}

                  {/* Type Badge */}
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

                  {/* Selection Indicator */}
                  {selectedUrls.includes(asset.preview) && (
                    <div className="absolute inset-0 bg-pink-600 bg-opacity-30 flex items-center justify-center">
                      <div className="bg-pink-600 text-white rounded-full p-2">
                        <Check className="w-6 h-6" />
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 truncate">
                    {asset.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            {selectedUrls.length} {type === 'both' ? 'asset' : type}{selectedUrls.length !== 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedUrls.length === 0}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
