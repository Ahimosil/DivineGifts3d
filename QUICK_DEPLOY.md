# ⚡ Quick Deploy Guide - DivineGifts3D

## 🚀 Deploy in 5 Minutes (Vercel - Recommended)

### **Method 1: No Code Upload (Easiest)**

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign up with GitHub (free)

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - OR: Drag & drop project folder

3. **Configure (Auto-detected)**
   ```
   Framework: Vite ✅
   Build Command: npm run build ✅
   Output Directory: dist ✅
   ```

4. **Click Deploy** 
   - Wait 60 seconds
   - Done! ✅

5. **Your Live URL:**
   ```
   https://your-project-name.vercel.app
   ```

---

## 🌐 Add Custom Domain (5 Minutes)

### **Step 1: Buy Domain**
- Go to [Namecheap.com](https://namecheap.com)
- Search: `divinegifts3d.com`
- Buy domain (~$10-15/year)

### **Step 2: Connect to Vercel**

1. **In Vercel Dashboard:**
   - Project → Settings → Domains
   - Click "Add Domain"
   - Enter: `divinegifts3d.com` and `www.divinegifts3d.com`

2. **In Namecheap (or your registrar):**
   - Go to Domain List → Manage → Advanced DNS
   - Add these records:

   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   
   Type: CNAME Record  
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. **Save & Wait**
   - DNS propagates in 5-30 minutes
   - SSL auto-enabled by Vercel
   - Check: [dnschecker.org](https://dnschecker.org)

### **Step 3: Visit Your Live Site!**
```
https://divinegifts3d.com
https://www.divinegifts3d.com
```

---

## 📱 Deploy via CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Done! Your URL will be shown
```

---

## ✅ Deployment Checklist

Before going live:
- [ ] Test locally: `npm run dev`
- [ ] Build succeeds: `npm run build`  
- [ ] Admin access works (admin@divinegifts3d.com / admin123)
- [ ] All 14 products showing
- [ ] Shopping cart works
- [ ] Mobile-friendly
- [ ] Domain purchased
- [ ] DNS configured
- [ ] SSL enabled (auto)

---

## 🎯 Default Admin Login

```
Email: admin@divinegifts3d.com
Password: admin123
```

**⚠️ Change this after deployment!**

---

## 🔥 Alternative Platforms

### **Netlify** (Also Great)
1. Visit [netlify.com](https://netlify.com)
2. Drag & drop `dist` folder
3. Add custom domain
4. Done!

### **GitHub Pages** (Free Forever)
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

---

## 🐛 Common Issues

**Issue:** Page refreshes show 404
- ✅ Fixed! Redirects already configured

**Issue:** Images not loading
- Check `figma:asset` imports
- Verify images in `/public` folder

**Issue:** Products not showing
- Go to Admin Dashboard
- Click reset button (refresh icon)
- Reloads 14 default products

**Issue:** Domain not working
- Wait 24-48 hours for DNS
- Check [dnschecker.org](https://dnschecker.org)
- Clear browser cache

---

## 💡 Pro Tips

1. **Free Hosting Forever**
   - Vercel free tier = unlimited
   - No credit card needed
   - Custom domain supported

2. **Auto-Deploy**
   - Push to GitHub
   - Vercel auto-deploys
   - No manual updates needed

3. **Performance**
   - Global CDN included
   - Lightning fast
   - Free SSL certificate

4. **Monitoring**
   - Free analytics in Vercel
   - Uptime monitoring included
   - Error logging available

---

## 📞 Quick Links

- 📖 Full Guide: See `DEPLOYMENT_GUIDE.md`
- 🌐 Vercel: [vercel.com](https://vercel.com)
- 🌐 Netlify: [netlify.com](https://netlify.com)
- 🔍 DNS Checker: [dnschecker.org](https://dnschecker.org)
- 💎 Domain: [namecheap.com](https://namecheap.com)

---

## 🎉 You're Live!

**Deployment Time:** ~5 minutes
**Domain Setup:** ~10 minutes  
**Total:** ~15 minutes to fully live website! 🚀

**Your website is now:**
- ✅ Live on the internet
- ✅ SSL secured (HTTPS)
- ✅ Globally distributed (CDN)
- ✅ Auto-scaling
- ✅ Free forever

**Share your website:**
```
🎁 DivineGifts3D
�� https://www.divinegifts3d.com
💝 Valentine's Special - 15% OFF with code LOVE2026
```

---

*Happy Valentine's Day 2026! 💕*
