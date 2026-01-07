import { useState } from 'react';
import { Type, Palette } from 'lucide-react';
import { SlideElement } from '../../types';
import { useDeckStore } from '../../store/deckStore';
import EmojiPickerModal from '../Modals/EmojiPickerModal';

interface ElementPropertiesProps {
  slideId: string;
  element: SlideElement;
}

const ElementProperties = ({ slideId, element }: ElementPropertiesProps) => {
  const { updateElement } = useDeckStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleStyleChange = (styleUpdates: Partial<SlideElement['style']>) => {
    updateElement(slideId, element.id, {
      style: { ...element.style, ...styleUpdates },
    });
  };

  const handleContentChange = (content: string) => {
    updateElement(slideId, element.id, { content });
  };

  const handleEmojiSelect = (emoji: string) => {
    if (element.type === 'text') {
      handleContentChange(element.content + emoji);
    }
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div className="property-section">
        <div className="property-section-title">
          {element.type === 'text' ? <Type size={16} /> : <Palette size={16} />}
          {element.type === 'text' ? 'Text Content' : 'Image'}
        </div>

        {element.type === 'text' ? (
          <>
            <div className="form-group textarea-group">
              <label>HTML Content</label>
              <textarea
                value={element.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Enter HTML content..."
              />
            </div>
            <button
              onClick={() => setShowEmojiPicker(true)}
              className="icon-button"
              style={{ width: '100%' }}
            >
              😀 Add Emoji
            </button>
          </>
        ) : (
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={element.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Image URL or data URL"
            />
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="property-section">
        <div className="property-section-title">
          <Palette size={16} />
          Style
        </div>

        <div className="property-row">
          <div className="form-group">
            <label>Width</label>
            <input
              type="number"
              value={element.width}
              onChange={(e) => updateElement(slideId, element.id, { width: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="number"
              value={element.height}
              onChange={(e) => updateElement(slideId, element.id, { height: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="property-row">
          <div className="form-group">
            <label>X Position</label>
            <input
              type="number"
              value={element.x}
              onChange={(e) => updateElement(slideId, element.id, { x: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>Y Position</label>
            <input
              type="number"
              value={element.y}
              onChange={(e) => updateElement(slideId, element.id, { y: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {element.type === 'text' && (
          <>
            <div className="form-group">
              <label>Font Size</label>
              <input
                type="text"
                value={element.style.fontSize || '24px'}
                onChange={(e) => handleStyleChange({ fontSize: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Font Weight</label>
              <select
                value={element.style.fontWeight || 'normal'}
                onChange={(e) => handleStyleChange({ fontWeight: e.target.value })}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
              </select>
            </div>

            <div className="form-group">
              <label>Text Align</label>
              <select
                value={element.style.textAlign || 'left'}
                onChange={(e) => handleStyleChange({ textAlign: e.target.value as any })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </>
        )}

        <div className="form-group">
          <label>Text/Foreground Color</label>
          <div className="color-picker-group">
            <input
              type="color"
              value={element.style.color || '#ffffff'}
              onChange={(e) => handleStyleChange({ color: e.target.value })}
            />
            <input
              type="text"
              value={element.style.color || '#ffffff'}
              onChange={(e) => handleStyleChange({ color: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Background Color</label>
          <div className="color-picker-group">
            <input
              type="color"
              value={element.style.backgroundColor || '#000000'}
              onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
            />
            <input
              type="text"
              value={element.style.backgroundColor || 'transparent'}
              onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={element.style.opacity || 1}
            onChange={(e) => handleStyleChange({ opacity: parseFloat(e.target.value) })}
          />
          <span>{element.style.opacity || 1}</span>
        </div>

        <div className="form-group">
          <label>Rotation (degrees)</label>
          <input
            type="number"
            value={element.style.rotation || 0}
            onChange={(e) => handleStyleChange({ rotation: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Padding</label>
          <input
            type="text"
            value={element.style.padding || '10px'}
            onChange={(e) => handleStyleChange({ padding: e.target.value })}
            placeholder="10px"
          />
        </div>

        <div className="form-group">
          <label>Border</label>
          <input
            type="text"
            value={element.style.border || 'none'}
            onChange={(e) => handleStyleChange({ border: e.target.value })}
            placeholder="1px solid #fff"
          />
        </div>

        <div className="form-group">
          <label>Border Radius</label>
          <input
            type="text"
            value={element.style.borderRadius || '0px'}
            onChange={(e) => handleStyleChange({ borderRadius: e.target.value })}
            placeholder="4px"
          />
        </div>

        <div className="form-group">
          <label>Box Shadow</label>
          <input
            type="text"
            value={element.style.boxShadow || 'none'}
            onChange={(e) => handleStyleChange({ boxShadow: e.target.value })}
            placeholder="0 2px 4px rgba(0,0,0,0.2)"
          />
        </div>
      </div>

      {showEmojiPicker && (
        <EmojiPickerModal
          onClose={() => setShowEmojiPicker(false)}
          onEmojiSelect={handleEmojiSelect}
        />
      )}
    </>
  );
};

export default ElementProperties;
