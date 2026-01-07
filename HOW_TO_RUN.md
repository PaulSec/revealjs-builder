# 🏃 How to Run - Reveal.js Builder

Complete step-by-step instructions to get the application running.

## Prerequisites Check

Before starting, verify you have:

### 1. Node.js (Required)
```bash
node --version
```
**Expected**: v16.0.0 or higher

**If not installed**: Download from https://nodejs.org/ (LTS version recommended)

### 2. npm (Included with Node.js)
```bash
npm --version
```
**Expected**: v7.0.0 or higher

### 3. Modern Browser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 4. Text Editor (Optional, for code viewing)
- VS Code (recommended)
- Sublime Text
- Any code editor

### 5. Terminal/Command Line Access
- Windows: PowerShell, CMD, or WSL
- Mac: Terminal
- Linux: Terminal

## Step-by-Step Setup

### Step 1: Navigate to Project Directory

Open your terminal and navigate to the project folder:

**Windows (PowerShell)**:
```powershell
cd C:\Users\F373268\Desktop\projets\revealjs-builder
```

**Windows (CMD)**:
```cmd
cd C:\Users\F373268\Desktop\projets\revealjs-builder
```

**Mac/Linux**:
```bash
cd ~/path/to/revealjs-builder
```

**Verify you're in the right place**:
```bash
ls  # or 'dir' on Windows
```
You should see: package.json, README.md, src/, etc.

### Step 2: Install Dependencies

This downloads and installs all required npm packages:

```bash
npm install
```

**What this does**:
- Downloads React, TypeScript, Vite, and all dependencies
- Creates `node_modules/` folder
- Creates `package-lock.json` file
- Takes 1-3 minutes depending on internet speed

**Expected output**:
```
added 234 packages in 45s
```

**If errors occur**: See TROUBLESHOOTING.md

### Step 3: Start Development Server

Launch the local development server:

```bash
npm run dev
```

**What this does**:
- Starts Vite development server
- Compiles TypeScript to JavaScript
- Enables hot module replacement (HMR)
- Opens browser automatically

**Expected output**:
```
  VITE v5.0.8  ready in 347 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Browser should open automatically** to http://localhost:3000

**If browser doesn't open**: Manually navigate to http://localhost:3000

### Step 4: Verify Application is Running

You should see:
- **Top bar**: "📽️ Reveal.js Builder" title
- **Left sidebar**: Slide thumbnails (1 default slide)
- **Center**: Canvas with sample content
- **Right sidebar**: Properties panel
- **No errors**: Check browser console (F12)

**If something is wrong**: See TROUBLESHOOTING.md

## Using the Application

### First Steps

1. **Explore the default presentation**:
   - You'll see a welcome slide with sample text
   - Click elements to select them
   - View properties in the right panel

2. **Try editing**:
   - Select the heading text
   - Change the content in properties panel
   - See changes instantly on canvas

3. **Test preview**:
   - Click 👁️ "Preview" button in top bar
   - See your presentation with Reveal.js
   - Use arrow keys to navigate
   - Click "Edit" to return

4. **Try adding a slide**:
   - Click ➕ in the slide list
   - New blank slide is created
   - Click "Add Text" to add content

5. **Test export**:
   - Click "Export HTML" in top bar
   - A file downloads
   - Open it in browser - it works!

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Runs on http://localhost:3000
- Hot reload enabled
- Keep terminal open while developing

### Build for Production
```bash
npm run build
```
- Creates optimized build in `dist/` folder
- Minifies code
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Test before deploying
- Runs on http://localhost:4173

### Run Linter
```bash
npm run lint
```
- Checks code for errors
- Enforces code style
- Use before committing code

## Terminal Management

### Keep Server Running
- **Don't close the terminal** while using the app
- Server must stay running for development
- You'll see logs of HMR updates

### Stop Server
- Press `Ctrl+C` in the terminal
- Or close the terminal window
- Browser tab will show connection error

### Restart Server
If you need to restart:
1. Press `Ctrl+C` to stop
2. Run `npm run dev` again
3. Wait for server to start
4. Refresh browser

## Port Configuration

Default port is 3000. To change:

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Change to any available port
    open: true
  }
})
```

Then restart the server.

## Network Access

To access from other devices on your network:

```bash
npm run dev -- --host
```

You'll see:
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

Use the Network URL from other devices.

## Working with Multiple Projects

If you have multiple Node.js projects:

1. **Each project needs its own terminal**
2. **Each project needs different port** (if running simultaneously)
3. **Navigate to correct directory** before running commands

## File Watching

Vite watches for file changes automatically:
- Save any source file
- Changes compile automatically
- Browser updates instantly (HMR)
- No need to restart server

**If changes don't appear**:
- Save the file again
- Check terminal for errors
- Hard refresh browser (Ctrl+Shift+R)

## Production Deployment

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. **Build**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service

3. **Configure**: Most hosts auto-detect Vite/React apps

### Option 2: Manual Server

1. **Build**:
   ```bash
   npm run build
   ```

2. **Copy `dist/` folder** to your web server

3. **Serve** with any static file server (nginx, Apache, etc.)

### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
```

Build and run:
```bash
docker build -t revealjs-builder .
docker run -p 80:80 revealjs-builder
```

## Environment Variables

Currently no environment variables needed. All configuration in source code.

To add environment variables:
1. Create `.env` file
2. Prefix with `VITE_` (e.g., `VITE_API_URL`)
3. Access with `import.meta.env.VITE_API_URL`

## System Requirements

### Minimum
- Node.js 16+
- 2GB RAM
- Modern browser
- Internet connection (for initial install and CDN assets)

### Recommended
- Node.js 18+
- 4GB RAM
- Fast internet
- Modern browser with GPU acceleration

## Common Workflows

### Daily Development
```bash
cd revealjs-builder
npm run dev
# Make changes
# Test in browser
# Ctrl+C when done
```

### Testing Before Deploy
```bash
npm run build
npm run preview
# Test thoroughly
# Check all features
```

### Updating Dependencies
```bash
npm update
npm audit fix
npm run build  # Verify still works
```

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

## Verifying Installation Success

Run this checklist:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server
- [ ] Browser opens to localhost:3000
- [ ] App interface loads completely
- [ ] No errors in browser console (F12)
- [ ] Can click elements and see properties
- [ ] Preview mode works
- [ ] Export HTML works
- [ ] Downloaded HTML opens and works

If all checked, installation is successful! ✅

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Getting Help

If anything fails:
1. Check TROUBLESHOOTING.md
2. Verify prerequisites
3. Check browser console for errors
4. Try in different browser
5. Clean install (delete node_modules, reinstall)

## Success Indicators

You know it's working when:
- ✅ Terminal shows "ready in XXX ms"
- ✅ Browser shows the app interface
- ✅ No red errors in browser console
- ✅ Can interact with UI elements
- ✅ Changes save and persist on refresh
- ✅ Preview mode works
- ✅ Export downloads files

## Next Steps

Once running successfully:
1. Read QUICKSTART.md for usage guide
2. Explore the default presentation
3. Try creating your own slides
4. Test all features
5. Read README.md for comprehensive documentation

---

**Happy building!** 🚀

If you successfully followed these steps, you now have a fully functional Reveal.js Builder running locally!
