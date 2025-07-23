import Modal from '../ui/Modal';
import { X, Download } from 'lucide-react';

const VideoViewer = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  fileName = 'Video',
  className = '' 
}) => {
  if (!videoUrl) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`bg-black rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] ${className}`}
      showBackdrop={true}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white truncate">
            {fileName}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close video viewer"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Video Content */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            src={videoUrl}
            controls
            className="max-w-full max-h-full"
            style={{ minHeight: '300px' }}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">
              Video Player
            </span>
            <a
              href={videoUrl}
              download={fileName}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
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

export default VideoViewer;