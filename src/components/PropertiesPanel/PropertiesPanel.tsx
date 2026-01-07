import { useDeckStore } from '../../store/deckStore';
import SlideProperties from './SlideProperties';
import ElementProperties from './ElementProperties';
import AnimationProperties from './AnimationProperties';
import './PropertiesPanel.css';

const PropertiesPanel = () => {
  const { deck, currentSlideIndex, selectedElementId } = useDeckStore();
  
  const currentSlide = deck.slides[currentSlideIndex];
  const selectedElement = selectedElementId
    ? currentSlide?.elements.find((el) => el.id === selectedElementId)
    : null;

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <h3>Properties</h3>
      </div>
      
      <div className="properties-content">
        {selectedElement ? (
          <>
            <ElementProperties
              slideId={currentSlide.id}
              element={selectedElement}
            />
            <div className="divider"></div>
            <AnimationProperties
              slideId={currentSlide.id}
              element={selectedElement}
            />
          </>
        ) : (
          <SlideProperties slide={currentSlide} />
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
