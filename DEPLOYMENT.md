# GitHub Pages Deployment Guide

## Prerequisites
- Install [Node.js](https://nodejs.org/)

## Quick Deploy

```bash
# Navigate to project
cd c:\Users\maha\PycharmProjects\CineFila

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm install gh-pages --save-dev
npx gh-pages -d dist
```

## Troubleshooting

If build fails:
```bash
npm audit fix --force
```

## Configuration

Ensure `vite.config.ts` has the correct base path:

```ts
export default defineConfig({
  base: '/your-repo-name/',  // Required for GitHub Pages
  // ...
});
```

## GitHub Settings

1. Go to repo → **Settings** → **Pages**
2. Set Source: `Deploy from branch: gh-pages / (root)`
3. Wait ~1 minute for deployment

## Common Issues

**Blank page or 404 errors on assets:**
- Check that `base` in `vite.config.ts` matches your repo name
- Rebuild and redeploy after changes

## Local Development

```bash
npm run dev
```
