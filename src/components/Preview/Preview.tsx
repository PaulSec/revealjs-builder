import { useEffect, useRef } from 'react';
import { useDeckStore } from '../../store/deckStore';
import { generateRevealHTML } from '../../utils/revealGenerator';
import './Preview.css';

const Preview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { deck } = useDeckStore();

  useEffect(() => {
    if (iframeRef.current) {
      const html = generateRevealHTML(deck, true);
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
    }
  }, [deck]);

  return (
    <div className="preview">
      <iframe
        ref={iframeRef}
        className="preview-iframe"
        title="Presentation Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Preview;
