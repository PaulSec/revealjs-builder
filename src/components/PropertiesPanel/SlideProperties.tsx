import { useState } from 'react';
import { Slide, SlideBackground } from '../../types';
import { useDeckStore } from '../../store/deckStore';
import { Palette, StickyNote } from 'lucide-react';

interface SlidePropertiesProps {
  slide: Slide;
}

const SlideProperties = ({ slide }: SlidePropertiesProps) => {
  const { updateSlide, updateSlideBackground, updateSlideNotes } = useDeckStore();
  const [bgType, setBgType] = useState<'color' | 'image' | 'gradient'>(slide.background.type);

  const handleBackgroundChange = (type: 'color' | 'image' | 'gradient', value: string) => {
    const background: SlideBackground = { type, value };
    updateSlideBackground(slide.id, background);
  };

  return (
    <>
      <div className="property-section">
        <div className="property-section-title">
          <Palette size={16} />
          Slide Background
        </div>
        
        <div className="background-type-selector">
          <button
            className={bgType === 'color' ? 'active' : ''}
            onClick={() => setBgType('color')}
          >
            Color
          </button>
          <button
            className={bgType === 'image' ? 'active' : ''}
            onClick={() => setBgType('image')}
          >
            Image
          </button>
          <button
            className={bgType === 'gradient' ? 'active' : ''}
            onClick={() => setBgType('gradient')}
          >
            Gradient
          </button>
        </div>

        {bgType === 'color' && (
          <div className="form-group">
            <label>Background Color</label>
            <div className="color-picker-group">
              <input
                type="color"
                value={slide.background.type === 'color' ? slide.background.value : '#2c3e50'}
                onChange={(e) => handleBackgroundChange('color', e.target.value)}
              />
              <input
                type="text"
                value={slide.background.type === 'color' ? slide.background.value : '#2c3e50'}
                onChange={(e) => handleBackgroundChange('color', e.target.value)}
              />
            </div>
          </div>
        )}

        {bgType === 'image' && (
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={slide.background.type === 'image' ? slide.background.value : ''}
              onChange={(e) => handleBackgroundChange('image', e.target.value)}
            />
          </div>
        )}

        {bgType === 'gradient' && (
          <div className="form-group">
            <label>Gradient CSS</label>
            <input
              type="text"
              placeholder="linear-gradient(to right, #667eea, #764ba2)"
              value={slide.background.type === 'gradient' ? slide.background.value : ''}
              onChange={(e) => handleBackgroundChange('gradient', e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="property-section">
        <div className="form-group">
          <label>Slide Title</label>
          <input
            type="text"
            value={slide.title || ''}
            onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
            placeholder="Enter slide title..."
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="property-section">
        <div className="property-section-title">
          <StickyNote size={16} />
          Speaker Notes
        </div>
        
        <div className="form-group textarea-group">
          <textarea
            value={slide.notes || ''}
            onChange={(e) => updateSlideNotes(slide.id, e.target.value)}
            placeholder="Add speaker notes for this slide..."
          />
        </div>
      </div>
    </>
  );
};

export default SlideProperties;
