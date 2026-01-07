# 📽️ Reveal.js Builder

A complete, production-ready visual slide deck builder for Reveal.js presentations. Create stunning HTML presentations with drag-and-drop editing, animations, and one-click export.

![Reveal.js Builder](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## ✨ Features

### Core Functionality
- **Visual Slide Editor**: Drag-and-drop interface for creating and arranging slide elements
- **Element Types**: Text and image elements with full customization
- **Live Preview**: Real-time Reveal.js preview of your presentation
- **Export Options**: Export to standalone HTML file or ZIP package
- **Auto-save**: Automatic saving to browser localStorage
- **Import/Export**: Save and load presentations as JSON files

### Element Editing
- **Text Elements**: Rich HTML content with full typography control
- **Image Elements**: Upload local images (converted to data URLs) or use external URLs
- **Drag & Resize**: Intuitive visual editing with react-rnd
- **Style Controls**: 
  - Font size, weight, family, color
  - Background color, opacity, rotation
  - Padding, borders, border radius, box shadow
  - Text alignment and more
- **Layer Management**: Bring forward/send backward z-index control

### Animations & Fragments
- **Fragment Support**: Reveal.js fragment animations for step-by-step reveals
- **Multiple Styles**: fade-in, fade-out, fade-up, fade-down, grow, shrink, highlights, strike
- **Custom Animations**: Add custom CSS classes for unique effects
- **Timing Control**: Configure duration, delay, easing, and fragment order
- **Fragment Index**: Control the sequence of element appearances

### Slide Management
- **Multiple Slides**: Add, duplicate, delete, and reorder slides
- **Slide Backgrounds**: Color, image, or gradient backgrounds per slide
- **Speaker Notes**: Add presenter notes to each slide
- **Thumbnails**: Visual slide list with drag-to-reorder
- **Snap to Grid**: Optional grid snapping for precise alignment

### Global Settings
- **11 Themes**: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon
- **Transitions**: none, fade, slide, convex, concave, zoom
- **Controls**: Configure navigation, progress bar, slide numbers
- **Display Size**: Custom presentation dimensions
- **Navigation Options**: Loop, RTL, shuffle, keyboard controls, and more

### User Experience
- **Emoji Picker**: Easy emoji insertion with searchable picker
- **Image Upload**: Drag-and-drop or browse for local images
- **Dark Theme**: Beautiful dark UI optimized for long editing sessions
- **Responsive**: Works on various screen sizes

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Installation

1. **Clone or extract the project**:
   ```bash
   cd revealjs-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   The app will automatically open at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory. You can serve them with:

```bash
npm run preview
```

## 📖 How to Use

### Creating Your First Presentation

1. **Start with the Default Deck**: The app loads with a sample presentation
2. **Edit Deck Settings**: Click the ⚙️ Settings icon to customize metadata and global options
3. **Add Slides**: Use the ➕ button in the slide list to add new slides
4. **Add Elements**: Click "Add Text" or "Add Image" in the canvas toolbar
5. **Edit Elements**: Click an element to select it, then use the properties panel to customize
6. **Preview**: Click the 👁️ Preview button to see your presentation in action
7. **Export**: Click "Export HTML" to download a standalone presentation file

### Working with Slides

#### Adding Slides
- Click the ➕ button in the slide list
- New slides are added after the current slide

#### Reordering Slides
- Drag slides up or down in the slide list using the grip handle

#### Duplicating Slides
- Click the copy icon on any slide to create a duplicate

#### Deleting Slides
- Click the trash icon (requires at least 2 slides in deck)

#### Slide Properties
- **Background**: Choose color, image URL, or CSS gradient
- **Title**: Optional title for organization (not displayed on slide)
- **Speaker Notes**: Add notes visible in presenter mode

### Working with Elements

#### Adding Text Elements
1. Click "Add Text" in the canvas toolbar
2. Select the new element
3. Edit content in the properties panel (supports HTML)
4. Customize typography, colors, and layout

#### Adding Images
1. Click "Add Image" in the canvas toolbar
2. Choose upload (drag-drop or browse) or paste a URL
3. Images are converted to data URLs for portability
4. Resize and position as needed

#### Moving & Resizing
- **Move**: Click and drag any element
- **Resize**: Select an element and drag the corner handles
- **Snap to Grid**: Enable in toolbar for aligned positioning

#### Layer Order
- **Bring Forward**: Move element up one layer
- **Send Backward**: Move element down one layer
- Elements with higher z-index appear on top

#### Styling Elements
All style properties are in the right properties panel:
- Position (X, Y) and size (Width, Height)
- Font properties (size, weight, family, alignment)
- Colors (text, background)
- Visual effects (opacity, rotation, borders, shadows)

### Animations & Fragments

Reveal.js fragments allow elements to appear step-by-step during presentation:

1. **Enable Animation**: Check "Enable Fragment Animation"
2. **Choose Style**: Select from preset animation types
3. **Set Index**: Lower numbers appear first (0, 1, 2...)
4. **Timing**: Configure duration, delay, and easing
5. **Custom**: Use "custom" style and add CSS class name

**Common Patterns**:
- Set all elements to index 0 for simultaneous reveal
- Increment indices for sequential reveals
- Use same index for grouped reveals

### Using the Emoji Picker

1. Click "😀 Add Emoji" button (appears for text elements)
2. Search or browse emojis
3. Click to insert at end of content
4. Emojis work in any HTML content

### Importing & Exporting

#### Export to HTML
1. Click "Export HTML" in the top bar
2. Saves a single `.html` file
3. File includes all content as data URLs (fully portable)
4. Open directly in any browser

#### Export to JSON
1. Click "JSON" export button
2. Saves deck data structure
3. Use for backup or version control

#### Import JSON
1. Click "Import" button
2. Select a previously exported JSON file
3. Deck will be loaded (replaces current deck)

### Preview Mode

- Click "Preview" to enter presentation mode
- Uses Reveal.js with your configured settings
- Navigate with arrow keys or controls
- Press 'S' for speaker notes (if enabled)
- Press 'F' for fullscreen
- Press '?' for Reveal.js help
- Click "Edit" to return to editor

### Keyboard Shortcuts (in Preview)

- **Arrow Keys**: Navigate slides
- **Space**: Next slide
- **Shift + Space**: Previous slide
- **Home/End**: First/last slide
- **Esc**: Overview mode
- **S**: Speaker notes window
- **F**: Fullscreen
- **B**: Blackout
- **?**: Help overlay

## 🏗️ Project Structure

```
revealjs-builder/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Canvas/      # Slide editing canvas with drag-and-drop
│   │   ├── Layout/      # Main application layout
│   │   ├── Modals/      # Modal dialogs (settings, images, emoji)
│   │   ├── Preview/     # Reveal.js preview component
│   │   ├── PropertiesPanel/  # Element and slide property editors
│   │   ├── SlideList/   # Slide thumbnail list and management
│   │   └── TopBar/      # Top navigation and actions
│   ├── store/
│   │   └── deckStore.ts # Zustand state management
│   ├── types/
│   │   └── index.ts     # TypeScript type definitions
│   ├── utils/
│   │   ├── export.ts    # Export functionality (HTML, ZIP)
│   │   └── revealGenerator.ts  # Reveal.js HTML generation
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🎨 Architecture & Technology

### Tech Stack
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Zustand**: Lightweight state management
- **react-rnd**: Drag and resize functionality
- **JSZip**: ZIP file generation
- **emoji-picker-react**: Emoji selector
- **Lucide React**: Icon library
- **Reveal.js**: Presentation framework (via CDN)

### Key Design Decisions

1. **Data URLs for Images**: Uploaded images are converted to data URLs and stored in the deck JSON. This ensures exported presentations are fully self-contained.

2. **CDN for Reveal.js**: The exported HTML uses Reveal.js from CDN (jsDelivr) for simplicity and smaller file sizes. An internet connection is required to view exports.

3. **LocalStorage Auto-save**: Deck state is automatically saved to browser localStorage after every change, preventing data loss.

4. **Iframe Preview**: Preview uses an iframe to isolate Reveal.js from the editor, preventing style conflicts and enabling clean reinitialization.

5. **Absolute Positioning**: Elements use absolute positioning within a fixed-size canvas (960x700 by default) to ensure consistent layout across devices.

6. **Fragment System**: Animations use Reveal.js's built-in fragment system for maximum compatibility and performance.

### State Management

The app uses Zustand for centralized state management with the following structure:

- **deck**: Complete presentation data (metadata, settings, slides, elements)
- **currentSlideIndex**: Active slide in editor
- **selectedElementId**: Currently selected element
- **UI state**: Preview mode, snap to grid, etc.

All state changes trigger localStorage persistence automatically.

## 🔧 Customization

### Adding Custom Themes

1. Reveal.js themes are loaded from CDN
2. To add a custom theme, modify `src/types/index.ts` to add theme name
3. Update theme selector in `SettingsModal.tsx`
4. Ensure theme exists on Reveal.js CDN or host locally

### Adding Custom Fragment Animations

1. Add animation style to `FragmentStyle` type in `src/types/index.ts`
2. Update fragment style selector in `AnimationProperties.tsx`
3. Add CSS for animation in `revealGenerator.ts` template

### Extending Element Types

1. Add new type to `ElementType` in `src/types/index.ts`
2. Update element rendering in `Canvas.tsx`
3. Add properties UI in `ElementProperties.tsx`
4. Update HTML generation in `revealGenerator.ts`

## 📋 Export Details

### HTML Export Format

The exported HTML file includes:
- Complete Reveal.js presentation structure
- CDN links for Reveal.js CSS and JS
- All slides with elements positioned absolutely
- Fragment animations with data attributes
- Custom CSS for additional fragment styles
- Speaker notes (if any)
- Configured Reveal.js initialization

### File Size Considerations

- **Text-only presentations**: Very small (< 50 KB)
- **With images (data URLs)**: Size depends on image count and quality
- **Recommendation**: Optimize images before upload or use external URLs for very large images

### Browser Compatibility

Exported presentations work in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires JavaScript and internet connection (for CDN resources).

## 🐛 Known Limitations & Future Improvements

### Current Limitations

1. **CDN Dependency**: Exported presentations require internet connection
2. **No Offline Mode**: Editor requires initial load with internet
3. **Single Level Slides**: No vertical slide stacks (Reveal.js supports this)
4. **Basic Text Editor**: HTML content must be written manually, no WYSIWYG
5. **No Collaboration**: Single-user, no real-time collaboration
6. **localStorage Only**: No cloud storage or sync across devices

### Planned Improvements

1. **Bundle Assets Option**: Include Reveal.js in export for offline use
2. **Rich Text Editor**: WYSIWYG editor for text elements (e.g., TipTap, Quill)
3. **Vertical Slides**: Support for Reveal.js vertical slide navigation
4. **More Element Types**: Video, audio, code blocks, charts
5. **Templates**: Pre-built slide templates and layouts
6. **Theme Editor**: Visual theme customization
7. **Cloud Storage**: Optional cloud save and sync
8. **Collaboration**: Real-time multi-user editing
9. **Version History**: Undo/redo and version management
10. **Export to PDF**: Direct PDF export (via Reveal.js print mode)
11. **Presentation Mode**: Built-in presenter view with notes and timer
12. **Asset Library**: Reusable images, icons, and media

## 🤝 Contributing

This is a self-contained project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is provided as-is for educational and personal use. Reveal.js is licensed under the MIT License.

## 🙏 Acknowledgments

- **Reveal.js**: Hakim El Hattab and contributors for the amazing presentation framework
- **React Team**: For the excellent UI library
- **Vite Team**: For the blazing-fast build tool
- **Open Source Community**: For all the fantastic libraries used

## 📞 Support

For issues or questions:

1. Check this README thoroughly
2. Review the code comments
3. Test in a fresh browser profile (to rule out extensions)
4. Check browser console for errors

## 🎯 Quick Tips

- **Use Snap to Grid**: Enable for aligned, professional-looking layouts
- **Test in Preview Often**: Catch layout issues early
- **Optimize Images**: Compress before upload to keep file size down
- **Use Fragments Wisely**: Don't overuse animations; keep it simple
- **Speaker Notes**: Add notes for every slide if presenting
- **Backup Your Work**: Export JSON regularly as backup
- **Keyboard Navigation**: Learn Reveal.js keyboard shortcuts for smooth presenting
- **Test Export**: Always test exported HTML before presenting

---

**Built with ❤️ using React, TypeScript, and Reveal.js**

*Start creating amazing presentations today!*
