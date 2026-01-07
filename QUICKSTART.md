# 🚀 Quick Start Guide - Reveal.js Builder

Get up and running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
cd revealjs-builder
npm install
```

This will install all required packages:
- React & React DOM
- TypeScript & Vite
- Zustand (state management)
- react-rnd (drag & resize)
- JSZip (export)
- emoji-picker-react
- lucide-react (icons)

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## Step 3: Explore the Interface (2 minutes)

### Left Sidebar - Slides
- View all slides as thumbnails
- Click a slide to edit it
- Drag slides to reorder
- Use + button to add new slides
- Duplicate or delete slides with icons

### Center Canvas - Visual Editor
- Add text or image elements with toolbar buttons
- Click elements to select them
- Drag elements to move them
- Drag corner handles to resize
- Enable "Snap to Grid" for aligned positioning

### Right Sidebar - Properties
When nothing is selected:
- Edit slide background (color, image, gradient)
- Add speaker notes

When an element is selected:
- Edit content (HTML for text, URL for images)
- Customize style (colors, fonts, borders, etc.)
- Configure animations (Reveal.js fragments)

### Top Bar - Actions
- ⚙️ Settings: Configure global presentation options
- 📤 Import: Load a saved JSON deck
- 💾 JSON: Export deck as JSON
- 📥 Export HTML: Download standalone presentation
- 👁️ Preview: See your presentation with Reveal.js

## Step 4: Create Your First Slide (1.5 minutes)

1. **Add a text element**:
   - Click "Add Text" in the canvas toolbar
   - In the properties panel, change content to: `<h1>My First Slide</h1>`
   - Adjust font size to 48px
   - Set text align to center
   - Move it to the center of the canvas

2. **Add an image**:
   - Click "Add Image"
   - Choose "URL" tab
   - Paste: `https://picsum.photos/400/300`
   - Click "Add Image"
   - Position it below your heading

3. **Add animation**:
   - Select your image
   - Scroll to "Animation & Fragments" section
   - Check "Enable Fragment Animation"
   - Choose "fade-up" style
   - Set fragment index to 0

## Step 5: Preview & Export (30 seconds)

1. **Preview**:
   - Click 👁️ "Preview" button
   - Use arrow keys to navigate
   - Press space to reveal fragments
   - Click "Edit" to return

2. **Export**:
   - Click "Export HTML"
   - A file will download
   - Open it in any browser - it works offline!

## 🎉 You're Done!

You now have a working Reveal.js presentation builder.

## Next Steps

- **Add more slides**: Build a complete presentation
- **Try different themes**: Settings → Theme
- **Add speaker notes**: Useful for presenting
- **Explore animations**: Make your slides dynamic
- **Save your work**: Export JSON for backup

## Common Tasks

### Change Theme
1. Click ⚙️ Settings
2. Choose theme from dropdown
3. Click Done
4. Preview to see changes

### Add Emojis
1. Select a text element
2. Click "😀 Add Emoji"
3. Search or browse
4. Click to insert

### Upload Local Image
1. Click "Add Image"
2. Choose "Upload" tab
3. Drag & drop or browse
4. Image is converted to data URL (portable)

### Configure Transitions
1. Click ⚙️ Settings
2. Choose transition style (slide, fade, zoom, etc.)
3. Set transition speed
4. Preview to test

### Duplicate a Slide
1. Find slide in left sidebar
2. Click copy icon
3. Edit the duplicate

### Layer Elements
1. Select an element
2. Use ⬆️ (bring forward) or ⬇️ (send backward)
3. Control what appears on top

## Keyboard Shortcuts (in Preview)

- **Arrow Keys**: Navigate slides
- **Space**: Next slide/fragment
- **Esc**: Overview mode
- **S**: Speaker notes
- **F**: Fullscreen
- **?**: Help

## Tips for Best Results

✅ **DO**:
- Keep text concise and readable
- Use high-contrast colors
- Test your presentation in preview mode
- Add speaker notes for important points
- Save JSON backups regularly
- Optimize images before uploading

❌ **DON'T**:
- Overcrowd slides with too many elements
- Use too many different fonts
- Make text too small (< 20px)
- Overuse animations
- Forget to test exported HTML

## Troubleshooting

**Preview not working?**
- Make sure you have internet connection (Reveal.js loads from CDN)
- Try clicking Preview again

**Element not appearing?**
- Check if it's behind another element (use layer controls)
- Verify opacity is not set to 0

**Export not downloading?**
- Check browser download settings
- Make sure popups are not blocked

**Lost your work?**
- Check localStorage (work is auto-saved)
- Export JSON frequently as backup

## Resources

- **Reveal.js Docs**: https://revealjs.com/
- **Emoji Cheat Sheet**: https://www.webfx.com/tools/emoji-cheat-sheet/
- **Color Picker**: https://htmlcolorcodes.com/

Happy presenting! 🎤✨
