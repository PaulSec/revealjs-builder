import { X } from 'lucide-react';
import { useDeckStore } from '../../store/deckStore';
import { RevealTheme, RevealTransition } from '../../types';
import './Modal.css';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { deck, updateSettings, updateMetadata } = useDeckStore();

  const themes: RevealTheme[] = [
    'black',
    'white',
    'league',
    'beige',
    'sky',
    'night',
    'serif',
    'simple',
    'solarized',
    'blood',
    'moon',
  ];

  const transitions: RevealTransition[] = ['none', 'fade', 'slide', 'convex', 'concave', 'zoom'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Deck Settings</h2>
          <button onClick={onClose} className="icon-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="settings-section">
            <h3>Metadata</h3>
            
            <div className="form-group">
              <label>Presentation Title</label>
              <input
                type="text"
                value={deck.metadata.title}
                onChange={(e) => updateMetadata({ title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={deck.metadata.author}
                onChange={(e) => updateMetadata({ author: e.target.value })}
              />
            </div>
          </div>

          <div className="divider"></div>

          <div className="settings-section">
            <h3>Appearance</h3>
            
            <div className="form-group">
              <label>Theme</label>
              <select
                value={deck.settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as RevealTheme })}
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Transition</label>
              <select
                value={deck.settings.transition}
                onChange={(e) => updateSettings({ transition: e.target.value as RevealTransition })}
              >
                {transitions.map((transition) => (
                  <option key={transition} value={transition}>
                    {transition.charAt(0).toUpperCase() + transition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Transition Speed</label>
              <select
                value={deck.settings.transitionSpeed}
                onChange={(e) => updateSettings({ transitionSpeed: e.target.value as any })}
              >
                <option value="default">Default</option>
                <option value="fast">Fast</option>
                <option value="slow">Slow</option>
              </select>
            </div>
          </div>

          <div className="divider"></div>

          <div className="settings-section">
            <h3>Controls & Navigation</h3>
            
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={deck.settings.controls}
                  onChange={(e) => updateSettings({ controls: e.target.checked })}
                />
                <span>Show Controls</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={deck.settings.progress}
                  onChange={(e) => updateSettings({ progress: e.target.checked })}
                />
                <span>Show Progress Bar</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={!!deck.settings.slideNumber}
                  onChange={(e) => updateSettings({ slideNumber: e.target.checked })}
                />
                <span>Show Slide Numbers</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={deck.settings.center}
                  onChange={(e) => updateSettings({ center: e.target.checked })}
                />
                <span>Center Slides Vertically</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={deck.settings.loop}
                  onChange={(e) => updateSettings({ loop: e.target.checked })}
                />
                <span>Loop Presentation</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={deck.settings.fragments}
                  onChange={(e) => updateSettings({ fragments: e.target.checked })}
                />
                <span>Enable Fragments</span>
              </label>
            </div>
          </div>

          <div className="divider"></div>

          <div className="settings-section">
            <h3>Display Size</h3>
            
            <div className="property-row">
              <div className="form-group">
                <label>Width (px)</label>
                <input
                  type="number"
                  value={deck.settings.width}
                  onChange={(e) => updateSettings({ width: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Height (px)</label>
                <input
                  type="number"
                  value={deck.settings.height}
                  onChange={(e) => updateSettings({ height: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="primary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
