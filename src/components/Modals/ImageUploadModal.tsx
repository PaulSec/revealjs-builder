import { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import './Modal.css';

interface ImageUploadModalProps {
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploadModal = ({ onClose, onImageSelect }: ImageUploadModalProps) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreviewUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleSubmit = () => {
    if (previewUrl) {
      onImageSelect(previewUrl);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Image</h2>
          <button onClick={onClose} className="icon-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="tab-buttons">
            <button
              className={activeTab === 'upload' ? 'active' : ''}
              onClick={() => setActiveTab('upload')}
            >
              <Upload size={16} /> Upload
            </button>
            <button
              className={activeTab === 'url' ? 'active' : ''}
              onClick={() => setActiveTab('url')}
            >
              <LinkIcon size={16} /> URL
            </button>
          </div>

          {activeTab === 'upload' && (
            <div
              className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="drop-zone-icon">📁</div>
              <div className="drop-zone-text">
                Drop an image here or click to browse
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Supports: JPG, PNG, GIF, WebP
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileInput}
              />
            </div>
          )}

          {activeTab === 'url' && (
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} className="primary" disabled={!previewUrl}>
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
