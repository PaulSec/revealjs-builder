# 🔧 Troubleshooting Guide - Reveal.js Builder

## Installation Issues

### npm install fails

**Problem**: Dependency installation errors

**Solutions**:
1. **Clear npm cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be 16.x or higher
   ```
   If outdated, download from https://nodejs.org/

3. **Use npm instead of yarn**:
   This project is configured for npm. Avoid mixing package managers.

4. **Check internet connection**:
   npm needs internet to download packages from registry.

### Port 3000 already in use

**Problem**: `npm run dev` fails with "port already in use"

**Solutions**:
1. **Kill process on port 3000**:
   - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
   - Linux/Mac: `lsof -ti:3000 | xargs kill -9`

2. **Use different port**:
   Edit `vite.config.ts`:
   ```typescript
   server: {
     port: 3001,  // Change port
   }
   ```

## Runtime Issues

### Preview not working / blank screen

**Symptoms**: Preview mode shows blank or broken content

**Solutions**:
1. **Check internet connection**: Reveal.js loads from CDN
2. **Check browser console**: Look for errors (F12)
3. **Verify deck has slides**: Need at least one slide
4. **Try different browser**: Test in Chrome/Firefox
5. **Disable browser extensions**: Some extensions block iframes
6. **Check CSP settings**: Content Security Policy might block CDN

### Elements not appearing on canvas

**Symptoms**: Added elements are invisible

**Solutions**:
1. **Check z-index**: Element might be behind others
   - Select element in properties panel
   - Click "Bring Forward" multiple times
2. **Check opacity**: Make sure opacity is not 0
3. **Check position**: Element might be off-canvas
   - Check X/Y values in properties
   - Move back to visible area (0-960 width, 0-700 height)
4. **Check element list**: Verify element was actually added
   - Look at slide's element count in sidebar

### Drag and drop not working

**Symptoms**: Cannot move or resize elements

**Solutions**:
1. **Click to select first**: Element must be selected (blue border)
2. **Check if element is actually selected**: Look for blue outline
3. **Try clicking element again**: Sometimes needs double-click
4. **Refresh page**: Reload to reset state
5. **Check browser compatibility**: Use modern browser

### Images not loading

**Symptoms**: Image elements show broken image icon

**Solutions**:
1. **Check image URL**: Verify URL is accessible
2. **Check CORS**: Some image hosts block cross-origin requests
3. **Use data URLs**: Upload image instead of URL
4. **Check file format**: Use JPG, PNG, GIF, WebP
5. **Test URL in browser**: Open URL directly to verify it works

### Export fails / no download

**Symptoms**: Export buttons don't download files

**Solutions**:
1. **Check browser download settings**: Allow downloads
2. **Disable popup blocker**: May block download
3. **Check disk space**: Ensure enough space for export
4. **Try different browser**: Test in another browser
5. **Check browser console**: Look for JavaScript errors

### Exported HTML doesn't work

**Symptoms**: Downloaded HTML file doesn't display correctly

**Solutions**:
1. **Check internet connection**: Reveal.js loads from CDN
2. **Open in modern browser**: Use Chrome, Firefox, Safari, Edge
3. **Allow JavaScript**: Must be enabled
4. **Check file integrity**: Re-export if corrupted
5. **Test in different location**: Move to different folder

## Data & Storage Issues

### Lost presentation data

**Symptoms**: Work disappeared after closing browser

**Solutions**:
1. **Check localStorage**:
   - Open browser DevTools (F12)
   - Go to Application → Local Storage
   - Look for 'revealjs-builder-deck' key
2. **Try different browser profile**: Work might be in other profile
3. **Check if browser cleared data**: Some security software does this
4. **Restore from JSON export**: If you exported earlier

**Prevention**:
- Export JSON regularly
- Don't use private/incognito mode
- Don't clear browser data while working

### Import JSON fails

**Symptoms**: "Failed to import" message when loading JSON

**Solutions**:
1. **Verify JSON format**:
   - Open JSON in text editor
   - Check for syntax errors
   - Ensure it has metadata, settings, slides
2. **Check file encoding**: Must be UTF-8
3. **Try re-exporting**: Original export might be corrupted
4. **Validate JSON**: Use https://jsonlint.com/
5. **Check file size**: Very large files might fail

### Auto-save not working

**Symptoms**: Changes not persisting after refresh

**Solutions**:
1. **Check localStorage quota**: Browser might be full
   - Clear some localStorage data
   - Use smaller images
2. **Check browser settings**: localStorage might be disabled
3. **Try private browsing**: To test if extensions interfere
4. **Export JSON manually**: As backup

## UI/UX Issues

### UI elements overlapping or misaligned

**Symptoms**: Interface looks broken

**Solutions**:
1. **Check browser zoom**: Reset to 100% (Ctrl+0)
2. **Resize browser window**: Try different window sizes
3. **Clear browser cache**: Ctrl+Shift+Delete
4. **Hard refresh**: Ctrl+Shift+R
5. **Check CSS**: Ensure no custom user stylesheets

### Slow performance

**Symptoms**: App is laggy or unresponsive

**Solutions**:
1. **Reduce slide count**: Try fewer slides
2. **Optimize images**: Compress before uploading
3. **Use fewer elements**: Keep slides simple
4. **Close other tabs**: Free up memory
5. **Restart browser**: Clear memory leaks
6. **Check browser resources**: Task manager to see memory usage

### Emoji picker not working

**Symptoms**: Emoji modal doesn't open or show emojis

**Solutions**:
1. **Check internet connection**: Emoji data might load from CDN
2. **Wait for load**: First open might be slow
3. **Try different emoji**: Search for something simple like "smile"
4. **Check browser console**: Look for errors
5. **Refresh page**: Reload to reinitialize

## Preview Mode Issues

### Fragments not animating

**Symptoms**: Elements appear all at once instead of step-by-step

**Solutions**:
1. **Check fragments enabled**: Settings → Enable Fragments (checked)
2. **Verify animation settings**: Element must have "Enable Fragment Animation" checked
3. **Check fragment indices**: Must be 0 or higher
4. **Press space/arrow**: Fragments reveal on navigation
5. **Test in exported HTML**: Preview might have timing issues

### Transitions not working

**Symptoms**: Slides don't transition smoothly

**Solutions**:
1. **Check transition setting**: Settings → Transition (not "none")
2. **Check browser performance**: Slow system might skip transitions
3. **Try different transition**: Some work better than others
4. **Test in fullscreen**: F key in preview
5. **Check exported HTML**: Compare behavior

### Controls not showing

**Symptoms**: Navigation arrows missing in preview

**Solutions**:
1. **Check controls setting**: Settings → Show Controls (checked)
2. **Move mouse**: Controls might auto-hide
3. **Check embedded mode**: Embedded hides some controls
4. **Try different theme**: Some themes style controls differently

## Build/Deploy Issues

### npm run build fails

**Symptoms**: Production build errors

**Solutions**:
1. **Fix TypeScript errors**: Check for type issues
2. **Run npm run lint**: Fix linting errors first
3. **Clear dist folder**: `rm -rf dist` then rebuild
4. **Check Node version**: Ensure 16.x or higher
5. **Reinstall dependencies**: Delete node_modules and reinstall

### Build size too large

**Symptoms**: dist/ folder is huge

**Solutions**:
1. **Remove data URL images**: Use external URLs for large images
2. **Optimize images**: Compress before adding
3. **Check for duplicate dependencies**: Ensure clean install
4. **Use CDN for assets**: Already done for Reveal.js

## Common Error Messages

### "Cannot read property 'elements' of undefined"

**Cause**: Trying to access slide that doesn't exist

**Fix**: 
- Reload page
- Check if deck has slides
- Import valid JSON

### "Failed to save to localStorage"

**Cause**: localStorage quota exceeded or disabled

**Fix**:
- Clear other site data
- Use smaller images
- Enable localStorage in browser settings

### "CORS policy blocked"

**Cause**: Image URL doesn't allow cross-origin access

**Fix**:
- Upload image instead of using URL
- Use different image host
- Use data URLs

### "Reveal is not defined"

**Cause**: Reveal.js CDN not loaded

**Fix**:
- Check internet connection
- Try different CDN
- Wait for full page load

## Browser-Specific Issues

### Safari Issues
- **WebP images**: Older Safari doesn't support WebP
- **localStorage limits**: Safari has strict limits
- **Private mode**: localStorage doesn't persist

### Firefox Issues
- **iframe security**: Strict iframe policies
- **localStorage**: Check about:config settings

### Chrome Issues
- **Memory**: Chrome uses lots of memory
- **Extensions**: Disable extensions if issues occur

### Edge Issues
- **Compatibility**: Use Edge 90+ for full support
- **Legacy mode**: Don't use IE mode

## Getting More Help

If none of these solutions work:

1. **Check browser console**:
   - Press F12
   - Look at Console tab
   - Copy any error messages

2. **Test in clean environment**:
   - New browser profile
   - Disable all extensions
   - Clear all cache/data

3. **Gather information**:
   - Browser version
   - Operating system
   - Steps to reproduce
   - Error messages
   - Screenshots

4. **Check README.md**:
   - Review feature documentation
   - Verify you're using features correctly

5. **Inspect code**:
   - All source code is available
   - Check comments for usage notes
   - Look at type definitions

## Prevention Tips

✅ **Best Practices**:
- Export JSON after major changes
- Test export regularly
- Keep browser updated
- Don't use private/incognito for long sessions
- Optimize images before upload
- Keep presentations under 50 slides
- Keep elements count per slide under 20
- Test in target browser before presenting

❌ **Avoid**:
- Very large images (> 1MB)
- Too many slides (> 100)
- Complex HTML in text elements
- Mixing many different fonts
- Deep nesting of elements
- Excessive animations

## Debug Mode

To enable detailed logging:

1. Open browser console (F12)
2. Run: `localStorage.setItem('debug', 'true')`
3. Reload page
4. Check console for detailed logs

To disable:
```javascript
localStorage.removeItem('debug')
```

---

**Still having issues?** Check the code - all source is available and commented!
