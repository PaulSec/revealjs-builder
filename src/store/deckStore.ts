import { create } from 'zustand';
import {
  Deck,
  Slide,
  SlideElement,
  GlobalSettings,
  DEFAULT_GLOBAL_SETTINGS,
  DEFAULT_ELEMENT_STYLE,
  DEFAULT_ANIMATION,
  SlideBackground,
} from '../types';

interface DeckStore {
  deck: Deck;
  currentSlideIndex: number;
  selectedElementId: string | null;
  snapToGrid: boolean;
  previewMode: boolean;
  
  // Deck operations
  setDeck: (deck: Deck) => void;
  updateMetadata: (updates: Partial<Deck['metadata']>) => void;
  updateSettings: (updates: Partial<GlobalSettings>) => void;
  
  // Slide operations
  addSlide: (index?: number) => void;
  duplicateSlide: (slideId: string) => void;
  deleteSlide: (slideId: string) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  setCurrentSlide: (index: number) => void;
  updateSlide: (slideId: string, updates: Partial<Slide>) => void;
  updateSlideBackground: (slideId: string, background: SlideBackground) => void;
  updateSlideNotes: (slideId: string, notes: string) => void;
  
  // Element operations
  addElement: (slideId: string, element: Omit<SlideElement, 'id' | 'zIndex'>) => void;
  updateElement: (slideId: string, elementId: string, updates: Partial<SlideElement>) => void;
  deleteElement: (slideId: string, elementId: string) => void;
  selectElement: (elementId: string | null) => void;
  bringElementForward: (slideId: string, elementId: string) => void;
  sendElementBackward: (slideId: string, elementId: string) => void;
  
  // UI state
  setSnapToGrid: (snap: boolean) => void;
  setPreviewMode: (preview: boolean) => void;
  
  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;
  exportToJSON: () => string;
  importFromJSON: (json: string) => boolean;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const createDefaultSlide = (): Slide => ({
  id: generateId(),
  title: 'New Slide',
  background: { type: 'color', value: '#2c3e50' },
  notes: '',
  elements: [],
});

const createDefaultDeck = (): Deck => ({
  metadata: {
    title: 'My Presentation',
    author: 'Anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  settings: DEFAULT_GLOBAL_SETTINGS,
  slides: [
    {
      ...createDefaultSlide(),
      title: 'Welcome',
      elements: [
        {
          id: generateId(),
          type: 'text',
          x: 100,
          y: 150,
          width: 760,
          height: 150,
          content: '<h1>Welcome to Reveal.js Builder</h1>',
          style: {
            ...DEFAULT_ELEMENT_STYLE,
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#ffffff',
          },
          animation: { ...DEFAULT_ANIMATION },
          zIndex: 1,
        },
        {
          id: generateId(),
          type: 'text',
          x: 100,
          y: 350,
          width: 760,
          height: 100,
          content: '<p>Start creating your presentation by adding slides and elements</p>',
          style: {
            ...DEFAULT_ELEMENT_STYLE,
            fontSize: '28px',
            textAlign: 'center',
            color: '#ecf0f1',
          },
          animation: { ...DEFAULT_ANIMATION, enabled: true, fragmentIndex: 0, fragmentStyle: 'fade-in' },
          zIndex: 2,
        },
      ],
    },
  ],
});

const STORAGE_KEY = 'revealjs-builder-deck';

export const useDeckStore = create<DeckStore>((set, get) => ({
  deck: createDefaultDeck(),
  currentSlideIndex: 0,
  selectedElementId: null,
  snapToGrid: false,
  previewMode: false,

  setDeck: (deck) => {
    set({ 
      deck: {
        ...deck,
        metadata: {
          ...deck.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
      currentSlideIndex: 0,
      selectedElementId: null,
    });
    get().saveToLocalStorage();
  },

  updateMetadata: (updates) => {
    set((state) => ({
      deck: {
        ...state.deck,
        metadata: {
          ...state.deck.metadata,
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    get().saveToLocalStorage();
  },

  updateSettings: (updates) => {
    set((state) => ({
      deck: {
        ...state.deck,
        settings: { ...state.deck.settings, ...updates },
        metadata: {
          ...state.deck.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    get().saveToLocalStorage();
  },

  addSlide: (index) => {
    set((state) => {
      const newSlide = createDefaultSlide();
      const slides = [...state.deck.slides];
      const insertIndex = index !== undefined ? index : state.currentSlideIndex + 1;
      slides.splice(insertIndex, 0, newSlide);
      return {
        deck: {
          ...state.deck,
          slides,
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
        currentSlideIndex: insertIndex,
      };
    });
    get().saveToLocalStorage();
  },

  duplicateSlide: (slideId) => {
    set((state) => {
      const slideIndex = state.deck.slides.findIndex((s) => s.id === slideId);
      if (slideIndex === -1) return state;
      
      const originalSlide = state.deck.slides[slideIndex];
      const newSlide: Slide = {
        ...originalSlide,
        id: generateId(),
        title: `${originalSlide.title} (Copy)`,
        elements: originalSlide.elements.map((el) => ({
          ...el,
          id: generateId(),
        })),
      };
      
      const slides = [...state.deck.slides];
      slides.splice(slideIndex + 1, 0, newSlide);
      
      return {
        deck: {
          ...state.deck,
          slides,
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
        currentSlideIndex: slideIndex + 1,
      };
    });
    get().saveToLocalStorage();
  },

  deleteSlide: (slideId) => {
    set((state) => {
      if (state.deck.slides.length <= 1) return state;
      
      const slideIndex = state.deck.slides.findIndex((s) => s.id === slideId);
      if (slideIndex === -1) return state;
      
      const slides = state.deck.slides.filter((s) => s.id !== slideId);
      const newIndex = Math.min(state.currentSlideIndex, slides.length - 1);
      
      return {
        deck: {
          ...state.deck,
          slides,
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
        currentSlideIndex: newIndex,
        selectedElementId: null,
      };
    });
    get().saveToLocalStorage();
  },

  reorderSlides: (fromIndex, toIndex) => {
    set((state) => {
      const slides = [...state.deck.slides];
      const [moved] = slides.splice(fromIndex, 1);
      slides.splice(toIndex, 0, moved);
      
      return {
        deck: {
          ...state.deck,
          slides,
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
        currentSlideIndex: toIndex,
      };
    });
    get().saveToLocalStorage();
  },

  setCurrentSlide: (index) => {
    set({ currentSlideIndex: index, selectedElementId: null });
  },

  updateSlide: (slideId, updates) => {
    set((state) => ({
      deck: {
        ...state.deck,
        slides: state.deck.slides.map((slide) =>
          slide.id === slideId ? { ...slide, ...updates } : slide
        ),
        metadata: {
          ...state.deck.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    get().saveToLocalStorage();
  },

  updateSlideBackground: (slideId, background) => {
    get().updateSlide(slideId, { background });
  },

  updateSlideNotes: (slideId, notes) => {
    get().updateSlide(slideId, { notes });
  },

  addElement: (slideId, element) => {
    set((state) => {
      const slide = state.deck.slides.find((s) => s.id === slideId);
      if (!slide) return state;
      
      const maxZ = slide.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
      const newElement: SlideElement = {
        ...element,
        id: generateId(),
        zIndex: maxZ + 1,
      };
      
      return {
        deck: {
          ...state.deck,
          slides: state.deck.slides.map((s) =>
            s.id === slideId
              ? { ...s, elements: [...s.elements, newElement] }
              : s
          ),
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
        selectedElementId: newElement.id,
      };
    });
    get().saveToLocalStorage();
  },

  updateElement: (slideId, elementId, updates) => {
    set((state) => ({
      deck: {
        ...state.deck,
        slides: state.deck.slides.map((slide) =>
          slide.id === slideId
            ? {
                ...slide,
                elements: slide.elements.map((el) =>
                  el.id === elementId ? { ...el, ...updates } : el
                ),
              }
            : slide
        ),
        metadata: {
          ...state.deck.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    get().saveToLocalStorage();
  },

  deleteElement: (slideId, elementId) => {
    set((state) => ({
      deck: {
        ...state.deck,
        slides: state.deck.slides.map((slide) =>
          slide.id === slideId
            ? {
                ...slide,
                elements: slide.elements.filter((el) => el.id !== elementId),
              }
            : slide
        ),
        metadata: {
          ...state.deck.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
      selectedElementId:
        state.selectedElementId === elementId ? null : state.selectedElementId,
    }));
    get().saveToLocalStorage();
  },

  selectElement: (elementId) => {
    set({ selectedElementId: elementId });
  },

  bringElementForward: (slideId, elementId) => {
    set((state) => {
      const slide = state.deck.slides.find((s) => s.id === slideId);
      if (!slide) return state;
      
      const element = slide.elements.find((el) => el.id === elementId);
      if (!element) return state;
      
      const maxZ = slide.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
      if (element.zIndex >= maxZ) return state;
      
      return {
        deck: {
          ...state.deck,
          slides: state.deck.slides.map((s) =>
            s.id === slideId
              ? {
                  ...s,
                  elements: s.elements.map((el) =>
                    el.id === elementId
                      ? { ...el, zIndex: el.zIndex + 1 }
                      : el.zIndex === element.zIndex + 1
                      ? { ...el, zIndex: el.zIndex - 1 }
                      : el
                  ),
                }
              : s
          ),
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
    get().saveToLocalStorage();
  },

  sendElementBackward: (slideId, elementId) => {
    set((state) => {
      const slide = state.deck.slides.find((s) => s.id === slideId);
      if (!slide) return state;
      
      const element = slide.elements.find((el) => el.id === elementId);
      if (!element || element.zIndex <= 1) return state;
      
      return {
        deck: {
          ...state.deck,
          slides: state.deck.slides.map((s) =>
            s.id === slideId
              ? {
                  ...s,
                  elements: s.elements.map((el) =>
                    el.id === elementId
                      ? { ...el, zIndex: el.zIndex - 1 }
                      : el.zIndex === element.zIndex - 1
                      ? { ...el, zIndex: el.zIndex + 1 }
                      : el
                  ),
                }
              : s
          ),
          metadata: {
            ...state.deck.metadata,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
    get().saveToLocalStorage();
  },

  setSnapToGrid: (snap) => {
    set({ snapToGrid: snap });
  },

  setPreviewMode: (preview) => {
    set({ previewMode: preview });
  },

  saveToLocalStorage: () => {
    try {
      const { deck } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  loadFromLocalStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const deck = JSON.parse(stored);
        set({ deck, currentSlideIndex: 0, selectedElementId: null });
        return true;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return false;
  },

  exportToJSON: () => {
    const { deck } = get();
    return JSON.stringify(deck, null, 2);
  },

  importFromJSON: (json) => {
    try {
      const deck = JSON.parse(json);
      // Basic validation
      if (!deck.metadata || !deck.settings || !Array.isArray(deck.slides)) {
        throw new Error('Invalid deck format');
      }
      set({ 
        deck,
        currentSlideIndex: 0,
        selectedElementId: null,
      });
      get().saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Failed to import JSON:', error);
      return false;
    }
  },
}));
