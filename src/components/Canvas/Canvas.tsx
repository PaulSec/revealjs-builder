import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Type, Image as ImageIcon, Grid, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useDeckStore } from '../../store/deckStore';
import { DEFAULT_ELEMENT_STYLE, DEFAULT_ANIMATION } from '../../types';
import ImageUploadModal from '../Modals/ImageUploadModal';
import './Canvas.css';

const Canvas = () => {
  const {
    deck,
    currentSlideIndex,
    selectedElementId,
    selectElement,
    addElement,
    updateElement,
    deleteElement,
    snapToGrid,
    setSnapToGrid,
    bringElementForward,
    sendElementBackward,
  } = useDeckStore();

  const [showImageModal, setShowImageModal] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const currentSlide = deck.slides[currentSlideIndex];
  
  if (!currentSlide) return null;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  const handleAddText = () => {
    addElement(currentSlide.id, {
      type: 'text',
      x: 100,
      y: 100,
      width: 300,
      height: 100,
      content: '<p>New text element</p>',
      style: { ...DEFAULT_ELEMENT_STYLE },
      animation: { ...DEFAULT_ANIMATION },
    });
  };

  const handleAddImage = (imageUrl: string) => {
    addElement(currentSlide.id, {
      type: 'image',
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      content: imageUrl,
      style: { ...DEFAULT_ELEMENT_STYLE, backgroundColor: 'transparent' },
      animation: { ...DEFAULT_ANIMATION },
    });
    setShowImageModal(false);
  };

  const handleElementDrag = (elementId: string, x: number, y: number) => {
    updateElement(currentSlide.id, elementId, { x, y });
  };

  const handleElementResize = (elementId: string, width: number, height: number, x: number, y: number) => {
    updateElement(currentSlide.id, elementId, { width, height, x, y });
  };

  const selectedElement = currentSlide.elements.find((el) => el.id === selectedElementId);

  const snapGrid = snapToGrid ? 10 : 1;

  return (
    <div className="canvas-wrapper">
      <div className="canvas-toolbar">
        <div className="flex-row">
          <button onClick={handleAddText} className="icon-button">
            <Type size={16} />
            <span>Add Text</span>
          </button>
          
          <button onClick={() => setShowImageModal(true)} className="icon-button">
            <ImageIcon size={16} />
            <span>Add Image</span>
          </button>
          
          <div className="divider-vertical"></div>
          
          <label className="flex-row" style={{ cursor: 'pointer', margin: 0 }}>
            <input
              type="checkbox"
              checked={snapToGrid}
              onChange={(e) => setSnapToGrid(e.target.checked)}
            />
            <Grid size={16} />
            <span>Snap to Grid</span>
          </label>
        </div>
        
        {selectedElement && (
          <div className="flex-row">
            <button
              onClick={() => bringElementForward(currentSlide.id, selectedElementId!)}
              className="icon-button"
              title="Bring Forward"
            >
              <ArrowUp size={16} />
            </button>
            
            <button
              onClick={() => sendElementBackward(currentSlide.id, selectedElementId!)}
              className="icon-button"
              title="Send Backward"
            >
              <ArrowDown size={16} />
            </button>
            
            <button
              onClick={() => deleteElement(currentSlide.id, selectedElementId!)}
              className="icon-button danger"
              title="Delete Element"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={canvasRef}
        className="canvas"
        onClick={handleCanvasClick}
        style={{
          background:
            currentSlide.background.type === 'color'
              ? currentSlide.background.value
              : currentSlide.background.type === 'image'
              ? `url(${currentSlide.background.value})`
              : currentSlide.background.value,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="canvas-content">
          {currentSlide.elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((element) => (
              <Rnd
                key={element.id}
                position={{ x: element.x, y: element.y }}
                size={{ width: element.width, height: element.height }}
                onDragStop={(e, d) => handleElementDrag(element.id, d.x, d.y)}
                onResizeStop={(e, direction, ref, delta, position) => {
                  handleElementResize(
                    element.id,
                    parseInt(ref.style.width),
                    parseInt(ref.style.height),
                    position.x,
                    position.y
                  );
                }}
                dragGrid={[snapGrid, snapGrid]}
                resizeGrid={[snapGrid, snapGrid]}
                bounds="parent"
                className={`canvas-element ${selectedElementId === element.id ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectElement(element.id);
                }}
              >
                <div
                  className="element-content"
                  style={{
                    ...element.style,
                    transform: `rotate(${element.style.rotation || 0}deg)`,
                    width: '100%',
                    height: '100%',
                    overflow: element.type === 'text' ? 'auto' : 'hidden',
                  }}
                >
                  {element.type === 'text' ? (
                    <div dangerouslySetInnerHTML={{ __html: element.content }} />
                  ) : (
                    <img
                      src={element.content}
                      alt="Slide element"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  )}
                </div>
              </Rnd>
            ))}
        </div>
      </div>

      {showImageModal && (
        <ImageUploadModal
          onClose={() => setShowImageModal(false)}
          onImageSelect={handleAddImage}
        />
      )}
    </div>
  );
};

export default Canvas;
