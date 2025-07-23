import Modal from '../ui/Modal';
import { X } from 'lucide-react';

const PDFViewer = ({ 
  isOpen, 
  onClose, 
  pdfUrl, 
  fileName = 'Document',
  className = '' 
}) => {
  if (!pdfUrl) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] ${className}`}
      showBackdrop={true}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {fileName}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close PDF viewer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            title={fileName}
            className="w-full h-full border-0"
            style={{ minHeight: '500px' }}
          />
        </div>

        {/* Footer with download link */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              PDF Document Viewer
            </span>
            <a
              href={pdfUrl}
              download={fileName}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PDFViewer;