import { useDeckStore } from '../../store/deckStore';
import TopBar from '../TopBar/TopBar';
import SlideList from '../SlideList/SlideList';
import Canvas from '../Canvas/Canvas';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';
import Preview from '../Preview/Preview';

const Layout = () => {
  const previewMode = useDeckStore((state) => state.previewMode);

  return (
    <div className="layout">
      <TopBar />
      <div className="main-content">
        {previewMode ? (
          <div className="preview-container">
            <Preview />
          </div>
        ) : (
          <>
            <div className="left-sidebar">
              <SlideList />
            </div>
            <div className="canvas-area">
              <Canvas />
            </div>
            <div className="right-sidebar">
              <PropertiesPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
