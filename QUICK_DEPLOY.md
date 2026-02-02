# 🚀 Quick Deploy to Vercel - Make Your IPO App Live!

## 📋 Step-by-Step Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
- Choose your login method (GitHub recommended)
- Authorize Vercel

### 3. Deploy from Project Directory
```bash
cd "c:\Users\dhana\OneDrive\Desktop\IPO Web App"
vercel --prod
```

### 4. Set Environment Variables
Go to your Vercel Dashboard → Project Settings → Environment Variables:

**Required Variables:**
```
MONGODB_URI = mongodb+srv://cse22042_db_user:T%40nooj111@cluster0.0mwympu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = your_jwt_secret_key_here_please_change_in_production
```

### 5. Deploy Again (After Setting Variables)
```bash
vercel --prod
```

## 🌐 Your Live App Will Be Available At:
- **Primary URL**: `https://ipo-web-app-project.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard if needed

## 🧪 Test Your Live App

1. **Frontend**: Visit your Vercel URL
2. **API Test**: `https://your-url.vercel.app/api/health`
3. **IPO Data**: `https://your-url.vercel.app/api/ipos/live`
4. **User Registration**: Test signup functionality

## 🔧 If You Face Issues:

### Common Problems & Solutions:

1. **Build Failures**
   - Check Node.js version (16+)
   - Verify package.json scripts
   - Check for TypeScript errors

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Environment Variables**
   - Make sure variables are set in Vercel dashboard
   - Variable names should match exactly
   - No trailing spaces in values

4. **API Routes Not Working**
   - Check vercel.json configuration
   - Verify route patterns
   - Check serverless function logs

## 📊 Verify Live Data

After deployment, check:
- ✅ Landing page shows real IPOs from MongoDB
- ✅ User registration works
- ✅ Login functionality works
- ✅ Investor dashboard loads with data
- ✅ API endpoints respond correctly

## 🎉 Success!

Your IPO Web App is now live! 🚀

**Share your live app**: https://ipo-web-app-project.vercel.app

## 📞 Need Help?

- Check Vercel logs: `vercel logs`
- Verify environment variables
- Test API endpoints individually
- Check MongoDB Atlas connection

---

**Your professional IPO investment platform is now live for the world to see!** 🌟
