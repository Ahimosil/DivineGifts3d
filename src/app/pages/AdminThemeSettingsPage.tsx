import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AdminNav } from '../components/AdminNav';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Check, Palette, Type, Sparkles, Layers } from 'lucide-react';

export function AdminThemeSettingsPage() {
  const { isAdminAuthenticated } = useAdminAuth();
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const themePreview = {
    default: {
      primary: '#3b82f6',
      secondary: '#e0e7ff',
      background: '#f8fafc',
      font: 'System Sans',
      radius: 'Medium',
      shadow: 'Subtle'
    },
    pink: {
      primary: '#e63946',
      secondary: '#ffe0e6',
      background: '#fff5f7',
      font: 'Rounded',
      radius: 'Very Round',
      shadow: 'Soft Pink'
    },
    dark: {
      primary: '#a855f7',
      secondary: '#27272a',
      background: '#0f0f1a',
      font: 'Modern Sans',
      radius: 'Sharp',
      shadow: 'Purple Glow'
    },
    ocean: {
      primary: '#0891b2',
      secondary: '#cffafe',
      background: '#f0f9ff',
      font: 'Clean Sans',
      radius: 'Flowing',
      shadow: 'Watery'
    },
    forest: {
      primary: '#16a34a',
      secondary: '#bbf7d0',
      background: '#f0fdf4',
      font: 'Serif',
      radius: 'Organic',
      shadow: 'Natural'
    },
    sunset: {
      primary: '#f97316',
      secondary: '#fde68a',
      background: '#fffbeb',
      font: 'Bold Sans',
      radius: 'Bold',
      shadow: 'Warm Glow'
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Theme Settings</h1>
              <p className="text-sm text-gray-600">Transform your entire website's look and feel</p>
            </div>
            <AdminNav />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Admin' },
            { label: 'Settings' },
            { label: 'Theme' }
          ]}
        />

        {/* Current Theme Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Current Theme</h2>
              <p className="text-sm text-gray-600">
                Active: <span className="font-semibold text-primary">
                  {availableThemes.find(t => t.name === currentTheme)?.label}
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Each theme completely transforms your website with unique colors, typography, spacing, shadows, and border styles. 
            Changes apply instantly across all pages.
          </p>
          
          {/* Theme Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Type className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-semibold text-sm text-blue-900">Typography</div>
                <div className="text-xs text-blue-700">Unique fonts per theme</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Layers className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <div className="font-semibold text-sm text-purple-900">Spacing & Layout</div>
                <div className="text-xs text-purple-700">Custom border radius</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-pink-600 mt-0.5" />
              <div>
                <div className="font-semibold text-sm text-pink-900">Shadow Effects</div>
                <div className="text-xs text-pink-700">Theme-specific shadows</div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available Themes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableThemes.map((theme) => {
              const preview = themePreview[theme.name as keyof typeof themePreview];
              const isActive = currentTheme === theme.name;
              
              return (
                <button
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  className={`relative text-left p-6 rounded-lg border-2 transition-all ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-sm'
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  {/* Theme Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {theme.label}
                  </h3>
                  
                  {/* Theme Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {theme.description}
                  </p>

                  {/* Color Swatches */}
                  <div className="flex gap-2 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: preview.primary }}
                      title="Primary Color"
                    />
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: preview.secondary }}
                      title="Secondary Color"
                    />
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: preview.background }}
                      title="Background Color"
                    />
                  </div>

                  {/* Theme Characteristics */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Typography:</span>
                      <span className="font-semibold text-gray-700">{preview.font}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Border Style:</span>
                      <span className="font-semibold text-gray-700">{preview.radius}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Shadow Effect:</span>
                      <span className="font-semibold text-gray-700">{preview.shadow}</span>
                    </div>
                  </div>

                  {/* Preview Buttons */}
                  <div className="space-y-2">
                    <div
                      className="px-3 py-2 rounded text-white text-sm font-medium text-center"
                      style={{ 
                        backgroundColor: preview.primary,
                        borderRadius: theme.name === 'pink' ? '2rem' : 
                                     theme.name === 'dark' ? '0.375rem' :
                                     theme.name === 'ocean' ? '0.625rem' :
                                     theme.name === 'sunset' ? '0.75rem' : '0.5rem'
                      }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="px-3 py-2 rounded text-sm text-center"
                      style={{ 
                        backgroundColor: preview.secondary,
                        color: theme.name === 'dark' ? '#e4e4e7' : '#1f2937',
                        borderRadius: theme.name === 'pink' ? '0.875rem' : 
                                     theme.name === 'dark' ? '0.375rem' :
                                     theme.name === 'ocean' ? '0.625rem' :
                                     theme.name === 'sunset' ? '0.75rem' : '0.5rem'
                      }}
                    >
                      Secondary Element
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            Complete Theme Transformation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Unique color palettes for each theme</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Custom typography and font families</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Theme-specific shadow effects</span>
              </li>
            </ul>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Different border radius styles</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Instant application across all pages</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Automatic saving of preferences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}