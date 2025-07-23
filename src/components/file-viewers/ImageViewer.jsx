import Modal from '../ui/Modal';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

const ImageViewer = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  fileName = 'Image',
  alt = 'Image',
  className = '' 
}) => {
  const [zoom, setZoom] = useState(1);
  
  if (!imageUrl) {
    return null;
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.25));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] ${className}`}
      showBackdrop={true}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {fileName}
          </h3>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Zoom out"
                disabled={zoom <= 0.25}
              >
                <ZoomOut size={16} className="text-gray-600" />
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Zoom in"
                disabled={zoom >= 3}
              >
                <ZoomIn size={16} className="text-gray-600" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close image viewer"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{ 
              transform: `scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'default'
            }}
            draggable={false}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Image Viewer
            </span>
            <a
              href={imageUrl}
              download={fileName}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Download size={16} />
              Download
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageViewer;