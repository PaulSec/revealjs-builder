import { Deck, Slide, SlideElement } from '../types';

const REVEAL_CDN_VERSION = '4.6.0';

const getRevealCDNLinks = (theme: string) => {
  return {
    css: `https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_CDN_VERSION}/dist/reveal.css`,
    themeCss: `https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_CDN_VERSION}/dist/theme/${theme}.css`,
    js: `https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_CDN_VERSION}/dist/reveal.js`,
    notesJs: `https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_CDN_VERSION}/plugin/notes/notes.js`,
  };
};

const generateElementHTML = (element: SlideElement): string => {
  const style = {
    position: 'absolute',
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    fontSize: element.style.fontSize,
    fontWeight: element.style.fontWeight,
    fontFamily: element.style.fontFamily,
    color: element.style.color,
    backgroundColor: element.style.backgroundColor,
    textAlign: element.style.textAlign,
    padding: element.style.padding,
    border: element.style.border,
    borderRadius: element.style.borderRadius,
    boxShadow: element.style.boxShadow,
    opacity: element.style.opacity,
    transform: `rotate(${element.style.rotation || 0}deg)`,
    zIndex: element.zIndex,
    overflow: element.type === 'text' ? 'auto' : 'hidden',
  };

  const styleString = Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');

  const fragmentClass = element.animation.enabled
    ? `fragment ${element.animation.fragmentStyle === 'custom' 
        ? element.animation.customClass || '' 
        : element.animation.fragmentStyle}`
    : '';

  const fragmentIndex = element.animation.enabled && element.animation.fragmentIndex !== undefined
    ? `data-fragment-index="${element.animation.fragmentIndex}"`
    : '';

  const animationStyle = element.animation.enabled
    ? `transition: all ${element.animation.duration || 400}ms ${element.animation.easing || 'ease'} ${element.animation.delay || 0}ms;`
    : '';

  if (element.type === 'text') {
    return `<div class="${fragmentClass}" ${fragmentIndex} style="${styleString} ${animationStyle}">${element.content}</div>`;
  } else {
    return `<div class="${fragmentClass}" ${fragmentIndex} style="${styleString} ${animationStyle}"><img src="${element.content}" alt="Slide image" style="width: 100%; height: 100%; object-fit: contain;" /></div>`;
  }
};

const generateSlideHTML = (slide: Slide): string => {
  const background =
    slide.background.type === 'color'
      ? `data-background-color="${slide.background.value}"`
      : slide.background.type === 'image'
      ? `data-background-image="${slide.background.value}" data-background-size="cover"`
      : `data-background-gradient="${slide.background.value}"`;

  const notes = slide.notes
    ? `<aside class="notes">${slide.notes}</aside>`
    : '';

  const elements = slide.elements
    .sort((a, b) => a.zIndex - b.zIndex)
    .map(generateElementHTML)
    .join('\n');

  return `
    <section ${background}>
      <div style="position: relative; width: 100%; height: 100%;">
        ${elements}
      </div>
      ${notes}
    </section>
  `;
};

export const generateRevealHTML = (deck: Deck, isPreview: boolean = false): string => {
  const cdn = getRevealCDNLinks(deck.settings.theme);
  const slides = deck.slides.map(generateSlideHTML).join('\n');

  const config = {
    width: deck.settings.width,
    height: deck.settings.height,
    transition: deck.settings.transition,
    transitionSpeed: deck.settings.transitionSpeed,
    backgroundTransition: deck.settings.backgroundTransition,
    controls: deck.settings.controls,
    progress: deck.settings.progress,
    slideNumber: deck.settings.slideNumber,
    history: deck.settings.history,
    keyboard: deck.settings.keyboard,
    overview: deck.settings.overview,
    center: deck.settings.center,
    touch: deck.settings.touch,
    loop: deck.settings.loop,
    rtl: deck.settings.rtl,
    shuffle: deck.settings.shuffle,
    fragments: deck.settings.fragments,
    fragmentInURL: deck.settings.fragmentInURL,
    embedded: isPreview || deck.settings.embedded,
    help: deck.settings.help,
    showNotes: deck.settings.showNotes,
    autoPlayMedia: deck.settings.autoPlayMedia,
    preloadIframes: deck.settings.preloadIframes,
    autoSlide: deck.settings.autoSlide,
    autoSlideStoppable: deck.settings.autoSlideStoppable,
    mouseWheel: deck.settings.mouseWheel,
    hideInactiveCursor: deck.settings.hideInactiveCursor,
    hideCursorTime: deck.settings.hideCursorTime,
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${deck.metadata.title}</title>
  <meta name="author" content="${deck.metadata.author}">
  
  <link rel="stylesheet" href="${cdn.css}">
  <link rel="stylesheet" href="${cdn.themeCss}">
  
  <style>
    .reveal .slides {
      text-align: left;
    }
    
    /* Custom fragment styles */
    .reveal .fragment.fade-up {
      opacity: 0;
      transform: translateY(20px);
    }
    .reveal .fragment.fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .reveal .fragment.fade-down {
      opacity: 0;
      transform: translateY(-20px);
    }
    .reveal .fragment.fade-down.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .reveal .fragment.highlight-red.visible {
      color: #ff2c2d;
    }
    
    .reveal .fragment.highlight-blue.visible {
      color: #1b91ff;
    }
    
    .reveal .fragment.highlight-green.visible {
      color: #17ff2e;
    }
    
    .reveal .fragment.semi-fade-out.visible {
      opacity: 0.5;
    }
    
    .reveal .fragment.strike.visible {
      text-decoration: line-through;
    }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      ${slides}
    </div>
  </div>

  <script src="${cdn.js}"></script>
  <script src="${cdn.notesJs}"></script>
  
  <script>
    Reveal.initialize(${JSON.stringify(config, null, 2)});
  </script>
</body>
</html>`;
};
