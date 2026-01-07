// Type definitions for the slide deck builder

export type ElementType = 'text' | 'image';

export type FragmentStyle = 
  | 'fade-in'
  | 'fade-out'
  | 'fade-up'
  | 'fade-down'
  | 'grow'
  | 'shrink'
  | 'highlight-red'
  | 'highlight-blue'
  | 'highlight-green'
  | 'semi-fade-out'
  | 'strike'
  | 'custom';

export interface AnimationSettings {
  enabled: boolean;
  fragmentIndex?: number;
  fragmentStyle: FragmentStyle;
  customClass?: string;
  delay?: number;
  duration?: number;
  easing?: string;
}

export interface ElementStyle {
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: number;
  transform?: string;
  rotation?: number;
}

export interface SlideElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string; // HTML for text, URL or data URL for image
  style: ElementStyle;
  animation: AnimationSettings;
  zIndex: number;
}

export interface SlideBackground {
  type: 'color' | 'image' | 'gradient';
  value: string;
}

export interface Slide {
  id: string;
  title?: string;
  background: SlideBackground;
  notes?: string;
  elements: SlideElement[];
}

export type RevealTheme = 
  | 'black'
  | 'white'
  | 'league'
  | 'beige'
  | 'sky'
  | 'night'
  | 'serif'
  | 'simple'
  | 'solarized'
  | 'blood'
  | 'moon';

export type RevealTransition = 
  | 'none'
  | 'fade'
  | 'slide'
  | 'convex'
  | 'concave'
  | 'zoom';

export interface GlobalSettings {
  theme: RevealTheme;
  transition: RevealTransition;
  transitionSpeed: 'default' | 'fast' | 'slow';
  backgroundTransition: RevealTransition;
  controls: boolean;
  progress: boolean;
  slideNumber: boolean | 'c/t' | 'c' | 'h.v' | 'h/v';
  history: boolean;
  keyboard: boolean;
  overview: boolean;
  center: boolean;
  touch: boolean;
  loop: boolean;
  rtl: boolean;
  shuffle: boolean;
  fragments: boolean;
  fragmentInURL: boolean;
  embedded: boolean;
  help: boolean;
  showNotes: boolean;
  autoPlayMedia: boolean | null;
  preloadIframes: boolean | null;
  autoSlide: number;
  autoSlideStoppable: boolean;
  mouseWheel: boolean;
  hideInactiveCursor: boolean;
  hideCursorTime: number;
  width: number;
  height: number;
}

export interface DeckMetadata {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deck {
  metadata: DeckMetadata;
  settings: GlobalSettings;
  slides: Slide[];
}

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  theme: 'black',
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  controls: true,
  progress: true,
  slideNumber: false,
  history: true,
  keyboard: true,
  overview: true,
  center: true,
  touch: true,
  loop: false,
  rtl: false,
  shuffle: false,
  fragments: true,
  fragmentInURL: false,
  embedded: false,
  help: true,
  showNotes: false,
  autoPlayMedia: null,
  preloadIframes: null,
  autoSlide: 0,
  autoSlideStoppable: true,
  mouseWheel: false,
  hideInactiveCursor: true,
  hideCursorTime: 5000,
  width: 960,
  height: 700,
};

export const DEFAULT_ELEMENT_STYLE: ElementStyle = {
  fontSize: '24px',
  fontWeight: 'normal',
  fontFamily: 'Arial, sans-serif',
  color: '#ffffff',
  backgroundColor: 'transparent',
  textAlign: 'left',
  padding: '10px',
  border: 'none',
  borderRadius: '0px',
  boxShadow: 'none',
  opacity: 1,
  rotation: 0,
};

export const DEFAULT_ANIMATION: AnimationSettings = {
  enabled: false,
  fragmentIndex: 0,
  fragmentStyle: 'fade-in',
  delay: 0,
  duration: 400,
  easing: 'ease',
};
