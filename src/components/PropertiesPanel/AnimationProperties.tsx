import { Sparkles } from 'lucide-react';
import { SlideElement, FragmentStyle } from '../../types';
import { useDeckStore } from '../../store/deckStore';

interface AnimationPropertiesProps {
  slideId: string;
  element: SlideElement;
}

const AnimationProperties = ({ slideId, element }: AnimationPropertiesProps) => {
  const { updateElement } = useDeckStore();

  const handleAnimationChange = (animationUpdates: Partial<SlideElement['animation']>) => {
    updateElement(slideId, element.id, {
      animation: { ...element.animation, ...animationUpdates },
    });
  };

  const fragmentStyles: FragmentStyle[] = [
    'fade-in',
    'fade-out',
    'fade-up',
    'fade-down',
    'grow',
    'shrink',
    'highlight-red',
    'highlight-blue',
    'highlight-green',
    'semi-fade-out',
    'strike',
    'custom',
  ];

  return (
    <div className="property-section">
      <div className="property-section-title">
        <Sparkles size={16} />
        Animation & Fragments
      </div>

      <div className="form-group">
        <label className="flex-row" style={{ cursor: 'pointer', marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={element.animation.enabled}
            onChange={(e) => handleAnimationChange({ enabled: e.target.checked })}
          />
          <span>Enable Fragment Animation</span>
        </label>
      </div>

      {element.animation.enabled && (
        <>
          <div className="form-group">
            <label>Fragment Style</label>
            <select
              value={element.animation.fragmentStyle}
              onChange={(e) =>
                handleAnimationChange({ fragmentStyle: e.target.value as FragmentStyle })
              }
            >
              {fragmentStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {element.animation.fragmentStyle === 'custom' && (
            <div className="form-group">
              <label>Custom Class</label>
              <input
                type="text"
                value={element.animation.customClass || ''}
                onChange={(e) => handleAnimationChange({ customClass: e.target.value })}
                placeholder="my-custom-animation"
              />
            </div>
          )}

          <div className="form-group">
            <label>Fragment Index (Order)</label>
            <input
              type="number"
              min="0"
              value={element.animation.fragmentIndex || 0}
              onChange={(e) => handleAnimationChange({ fragmentIndex: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Duration (ms)</label>
            <input
              type="number"
              min="0"
              step="100"
              value={element.animation.duration || 400}
              onChange={(e) => handleAnimationChange({ duration: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Delay (ms)</label>
            <input
              type="number"
              min="0"
              step="100"
              value={element.animation.delay || 0}
              onChange={(e) => handleAnimationChange({ delay: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Easing</label>
            <select
              value={element.animation.easing || 'ease'}
              onChange={(e) => handleAnimationChange({ easing: e.target.value })}
            >
              <option value="ease">Ease</option>
              <option value="ease-in">Ease In</option>
              <option value="ease-out">Ease Out</option>
              <option value="ease-in-out">Ease In Out</option>
              <option value="linear">Linear</option>
            </select>
          </div>

          <div className="form-group">
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Fragment animations will appear in order during presentation. Lower indices appear first.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimationProperties;
