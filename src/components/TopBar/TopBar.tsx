import { useState } from 'react';
import { Settings, Eye, Download, Save, Upload, FileJson } from 'lucide-react';
import { useDeckStore } from '../../store/deckStore';
import SettingsModal from '../Modals/SettingsModal';
import { exportDeckToHTML } from '../../utils/export';
import './TopBar.css';

const TopBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { deck, previewMode, setPreviewMode, exportToJSON, importFromJSON } = useDeckStore();

  const handleExportJSON = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deck.metadata.title.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const json = event.target?.result as string;
          if (importFromJSON(json)) {
            alert('Deck imported successfully!');
          } else {
            alert('Failed to import deck. Please check the JSON format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportHTML = async () => {
    try {
      const html = await exportDeckToHTML(deck);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${deck.metadata.title.replace(/\s+/g, '-')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export deck');
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="flex-row">
          <h1>📽️ Reveal.js Builder</h1>
          <span className="deck-title">{deck.metadata.title}</span>
        </div>
        
        <div className="top-bar-actions">
          <button
            onClick={() => setShowSettings(true)}
            className="icon-button"
            title="Deck Settings"
          >
            <Settings size={18} />
          </button>
          
          <div className="divider-vertical"></div>
          
          <button
            onClick={handleImportJSON}
            className="icon-button"
            title="Import JSON"
          >
            <Upload size={18} />
            <span className="button-label">Import</span>
          </button>
          
          <button
            onClick={handleExportJSON}
            className="icon-button"
            title="Export JSON"
          >
            <FileJson size={18} />
            <span className="button-label">JSON</span>
          </button>
          
          <button
            onClick={handleExportHTML}
            className="primary icon-button"
            title="Export HTML"
          >
            <Download size={18} />
            <span className="button-label">Export HTML</span>
          </button>
          
          <div className="divider-vertical"></div>
          
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={previewMode ? 'success icon-button' : 'icon-button'}
            title={previewMode ? 'Exit Preview' : 'Preview'}
          >
            <Eye size={18} />
            <span className="button-label">{previewMode ? 'Edit' : 'Preview'}</span>
          </button>
        </div>
      </div>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default TopBar;
