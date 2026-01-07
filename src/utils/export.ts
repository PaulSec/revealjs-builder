import { Deck } from '../types';
import { generateRevealHTML } from './revealGenerator';
import JSZip from 'jszip';

export const exportDeckToHTML = async (deck: Deck): Promise<string> => {
  return generateRevealHTML(deck, false);
};

export const exportDeckToZIP = async (deck: Deck): Promise<Blob> => {
  const zip = new JSZip();
  
  // Generate HTML
  const html = await exportDeckToHTML(deck);
  zip.file('index.html', html);
  
  // Add README
  const readme = `# ${deck.metadata.title}

Created with Reveal.js Builder
Author: ${deck.metadata.author}
Created: ${new Date(deck.metadata.createdAt).toLocaleDateString()}

## Usage

1. Open index.html in a web browser
2. Use arrow keys or click controls to navigate
3. Press 'S' for speaker notes (if enabled)
4. Press 'F' for fullscreen
5. Press '?' for help

## Requirements

This presentation requires an internet connection to load Reveal.js assets from CDN.
`;
  
  zip.file('README.md', readme);
  
  // Generate the zip
  return await zip.generateAsync({ type: 'blob' });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportDeckToZIPAndDownload = async (deck: Deck) => {
  const zip = await exportDeckToZIP(deck);
  const filename = `${deck.metadata.title.replace(/\s+/g, '-')}.zip`;
  downloadBlob(zip, filename);
};
