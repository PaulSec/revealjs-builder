import { useEffect } from 'react';
import { useDeckStore } from './store/deckStore';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
  const loadFromLocalStorage = useDeckStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    // Load deck from localStorage on mount
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return <Layout />;
}

export default App;
