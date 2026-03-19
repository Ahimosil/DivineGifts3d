# 🚀 DivineGifts3D Deployment Guide

Complete guide to hosting your DivineGifts3D website on a custom domain.

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Platform Options](#platform-options)
3. [Vercel Deployment](#vercel-deployment-recommended)
4. [Netlify Deployment](#netlify-deployment)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

Your website is already configured and ready to deploy! The project includes:
- ✅ Build configuration (`vite.config.ts`)
- ✅ Deployment configs for Vercel and Netlify
- ✅ React Router redirects configured
- ✅ Production-ready build setup

---

## 🌐 Platform Options

### **Best Options for React Apps:**

| Platform | Free Tier | Custom Domain | Best For |
|----------|-----------|---------------|----------|
| **Vercel** | ✅ Unlimited | ✅ Free | Fastest deployment, best DX |
| **Netlify** | ✅ 100GB/month | ✅ Free | Great features, easy setup |
| **GitHub Pages** | ✅ Unlimited | ✅ Free | Simple hosting |
| **Cloudflare Pages** | ✅ Unlimited | ✅ Free | Fast global CDN |

**Recommended: Vercel** (optimized for React/Vite apps)

---

## 🔥 Vercel Deployment (RECOMMENDED)

### **Step 1: Prepare Your Code**
```bash
# Make sure you're in your project directory
# Your code is already configured for Vercel!
```

### **Step 2: Deploy to Vercel**

#### **Option A: Deploy via Vercel Website (Easiest)**

1. **Go to [Vercel.com](https://vercel.com)**
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Your Project**
   - Click "Add New Project"
   - If using Git: Import your repository
   - If no Git: Use "Deploy from Template" or drag & drop

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 30-60 seconds ✨
   - Your site is live at: `https://your-project.vercel.app`

#### **Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? divinegifts3d
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### **Step 3: Add Custom Domain**

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain: `www.divinegifts3d.com`

2. **Configure DNS** (at your domain registrar)
   
   **For root domain (`divinegifts3d.com`):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain (`www.divinegifts3d.com`):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5 min - 48 hours)
   - Vercel auto-issues SSL certificate
   - Your site will be live at your domain! 🎉

---

## 🎨 Netlify Deployment

### **Step 1: Deploy to Netlify**

#### **Option A: Netlify Website (Drag & Drop)**

1. **Build your project locally**
   ```bash
   npm run build
   # This creates a 'dist' folder
   ```

2. **Go to [Netlify.com](https://netlify.com)**
   - Sign up for free account

3. **Deploy**
   - Go to "Sites" → "Add new site" → "Deploy manually"
   - Drag and drop your `dist` folder
   - Your site is live at: `https://random-name.netlify.app`

#### **Option B: Netlify via Git (Continuous Deployment)**

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import to Netlify**
   - Click "Add new site" → "Import an existing project"
   - Connect to Git provider
   - Select your repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy**
   - Click "Deploy site"
   - Auto-deploys on every Git push! 🚀

#### **Option C: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### **Step 2: Add Custom Domain**

1. **In Netlify Dashboard**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `www.divinegifts3d.com`

2. **Configure DNS**
   
   **For Netlify DNS (Recommended):**
   - Use Netlify's nameservers at your registrar
   - Netlify manages everything automatically

   **For External DNS:**
   ```
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   
   Type: A (for root domain)
   Name: @
   Value: 75.2.60.5
   ```

3. **Enable HTTPS**
   - Netlify auto-provisions SSL certificate
   - Done! ✅

---

## 🌍 GitHub Pages Deployment

### **Step 1: Prepare Configuration**

Add to `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repository-name/', // Your GitHub repo name
  plugins: [react(), tailwindcss()],
  // ... rest of config
})
```

### **Step 2: Deploy**

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add scripts to package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

### **Step 3: Configure GitHub**
1. Go to repository Settings → Pages
2. Source: Deploy from branch → `gh-pages`
3. Save

### **Step 4: Custom Domain**
1. Add `CNAME` file to `/public/` folder:
   ```
   www.divinegifts3d.com
   ```

2. Configure DNS at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

---

## 🔗 Custom Domain Setup

### **Where to Buy Domains**

Popular registrars:
- **Namecheap** - Great pricing, easy to use
- **Google Domains** (now Squarespace)
- **GoDaddy** - Popular choice
- **Cloudflare** - Cheapest pricing
- **Porkbun** - Developer-friendly

### **DNS Configuration Examples**

#### **For Vercel:**
```dns
# Root domain
Type: A
Name: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### **For Netlify:**
```dns
# Root domain
Type: A
Name: @
Value: 75.2.60.5

# WWW subdomain
Type: CNAME
Name: www
Value: [your-site].netlify.app
```

### **DNS Propagation Check**
- Use [dnschecker.org](https://dnschecker.org) to verify
- Usually takes 5-60 minutes
- Can take up to 48 hours globally

---

## 🔐 Environment Variables

If you add Supabase or other APIs later:

### **Vercel:**
1. Dashboard → Project → Settings → Environment Variables
2. Add variables:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```

### **Netlify:**
1. Site settings → Environment variables
2. Add variables with same format

### **Local Development:**
Create `.env` file:
```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

---

## 🐛 Troubleshooting

### **Issue: 404 on page refresh**
**Solution:** Redirects configured! Files included:
- `/vercel.json` - For Vercel
- `/netlify.toml` - For Netlify  
- `/public/_redirects` - For Netlify fallback

### **Issue: Build fails**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### **Issue: Images not loading**
- Check image paths use relative imports
- Ensure images are in `/public` or imported properly
- For Figma assets, verify `figma:asset` paths

### **Issue: Admin login doesn't work**
- localStorage works in production
- Default admin credentials:
  - Email: `admin@divinegifts3d.com`
  - Password: `admin123`

### **Issue: Products not showing**
- Click the reset button in Admin Dashboard
- This syncs localStorage with latest products

### **Issue: Domain not working**
1. Check DNS propagation: [dnschecker.org](https://dnschecker.org)
2. Verify DNS records at registrar
3. Wait 24-48 hours for full propagation
4. Clear browser cache (Ctrl+Shift+Delete)

---

## ✅ Deployment Checklist

Before going live:

- [ ] Test all pages locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Admin login works
- [ ] All 14 products display correctly
- [ ] Shopping cart functions properly
- [ ] Checkout flow works
- [ ] Mobile responsive design verified
- [ ] Images load correctly
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Domain purchased
- [ ] DNS configured
- [ ] SSL certificate active (auto via platform)
- [ ] Test on multiple browsers

---

## 🎉 You're Ready to Go Live!

### **Recommended Steps:**

1. **Deploy to Vercel** (5 minutes)
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Buy Domain** (10 minutes)
   - Go to Namecheap or preferred registrar
   - Search for `divinegifts3d.com`
   - Purchase domain (~$10-15/year)

3. **Connect Domain** (5 minutes)
   - Add domain in Vercel dashboard
   - Update DNS records at registrar
   - Wait for SSL certificate

4. **Share Your Site!** 🚀
   - `https://www.divinegifts3d.com`

---

## 💡 Pro Tips

1. **Enable Analytics**
   - Vercel Analytics (free)
   - Google Analytics
   - Plausible (privacy-friendly)

2. **Performance Optimization**
   - Already optimized with Vite
   - Vercel Edge Network = super fast
   - Images lazy-loaded

3. **SEO**
   - Add meta tags to `index.html`
   - Create `sitemap.xml`
   - Submit to Google Search Console

4. **Monitoring**
   - Vercel provides automatic monitoring
   - Set up error tracking (Sentry)
   - Monitor uptime (UptimeRobot - free)

5. **Backups**
   - localStorage data lives in browser
   - Export products data periodically
   - Use Git for code backups

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)
- **React Router:** [reactrouter.com](https://reactrouter.com)

---

## 🎊 Congratulations!

Your DivineGifts3D e-commerce website is production-ready!

**What you've built:**
- ✨ Full e-commerce website
- 🛒 Shopping cart & checkout
- 👤 User authentication
- 🔐 Admin dashboard
- 📱 Fully responsive
- 💝 Valentine's themed
- 🎁 14 products (2 figurines + 12 keychains)
- 🔄 Product management system
- 💳 Payment flow
- 📦 Order success pages

**Time to launch:** ~20 minutes total! 🚀

---

*Made with ❤️ for DivineGifts3D - Valentine's Day 2026*
