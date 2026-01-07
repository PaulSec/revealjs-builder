import { useState } from 'react';
import { Plus, Copy, Trash2, GripVertical } from 'lucide-react';
import { useDeckStore } from '../../store/deckStore';
import './SlideList.css';

const SlideList = () => {
  const { deck, currentSlideIndex, setCurrentSlide, addSlide, duplicateSlide, deleteSlide, reorderSlides } = useDeckStore();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    reorderSlides(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="slide-list">
      <div className="slide-list-header">
        <h3>Slides</h3>
        <button
          onClick={() => addSlide()}
          className="icon-button primary"
          title="Add Slide"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="slides-container">
        {deck.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-item ${index === currentSlideIndex ? 'active' : ''} ${draggedIndex === index ? 'dragging' : ''}`}
            onClick={() => setCurrentSlide(index)}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="slide-drag-handle">
              <GripVertical size={14} />
            </div>
            
            <div className="slide-preview">
              <div
                className="slide-thumbnail"
                style={{
                  background:
                    slide.background.type === 'color'
                      ? slide.background.value
                      : slide.background.type === 'image'
                      ? `url(${slide.background.value})`
                      : slide.background.value,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="slide-number">{index + 1}</div>
              </div>
              
              <div className="slide-info">
                <div className="slide-title">{slide.title || 'Untitled'}</div>
                <div className="slide-elements-count">
                  {slide.elements.length} element{slide.elements.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            <div className="slide-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateSlide(slide.id);
                }}
                className="icon-button"
                title="Duplicate Slide"
              >
                <Copy size={14} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (deck.slides.length > 1 && confirm('Delete this slide?')) {
                    deleteSlide(slide.id);
                  }
                }}
                className="icon-button danger"
                title="Delete Slide"
                disabled={deck.slides.length <= 1}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideList;
