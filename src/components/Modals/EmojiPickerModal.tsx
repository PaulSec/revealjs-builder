import { useState } from 'react';
import { X, Search } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import './Modal.css';

interface EmojiPickerModalProps {
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerModal = ({ onClose, onEmojiSelect }: EmojiPickerModalProps) => {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <h2>Select Emoji</h2>
          <button onClick={onClose} className="icon-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 0 }}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width="100%"
            height="400px"
            searchPlaceHolder="Search emoji..."
          />
        </div>
      </div>
    </div>
  );
};

export default EmojiPickerModal;
