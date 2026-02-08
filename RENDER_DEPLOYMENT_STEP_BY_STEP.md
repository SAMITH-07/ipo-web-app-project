# 🚀 Render Backend Deployment - Step by Step

## 📋 Quick Setup Guide

### Step 1: Go to Render
**Open:** https://render.com

### Step 2: Sign Up/Login
- Use your GitHub account (`SAMITH-07`)
- Click "Sign up with GitHub"

### Step 3: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### Step 4: Connect Repository
1. Click **"Connect a repository"**
2. Search for: `SAMITH-07/ipo-web-app-project`
3. Click **"Connect"**

### Step 5: Configure Service
Fill in these exact settings:

#### Basic Settings
- **Name:** `samith-07-ipo-backend`
- **Region:** Default (or closest to you)
- **Branch:** `main`

#### Build Settings
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

#### Instance Type
- **Instance Type:** `Free`

### Step 6: Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_long_secure_secret_key_here_minimum_32_characters
FRONTEND_URL=https://ipo-web-app-project.vercel.app
```

**Important:**
- Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB URI
- Replace `your_long_secure_secret_key_here_minimum_32_characters` with a secure JWT secret

### Step 7: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Your backend will be live at: `https://samith-07-ipo-backend.onrender.com`

## 🔍 Verify Deployment

### Test Health Check
Open in browser: `https://samith-07-ipo-backend.onrender.com/api/health`

Should return: `{"status":"Backend API is running ✅"}`

### Test API Endpoints
- `https://samith-07-ipo-backend.onrender.com/api/ipos` - Get all IPOs
- `https://samith-07-ipo-backend.onrender.com/api/users/register` - Register user

## 🔄 Update Frontend API URL

After backend is deployed, update your Vercel environment variable:

1. Go to [vercel.com](https://vercel.com)
2. Open your project: `ipo-web-app-project`
3. Go to **Settings** → **Environment Variables**
4. Add: `REACT_APP_API_URL` = `https://samith-07-ipo-backend.onrender.com`
5. Redeploy frontend

## 🎯 Final URLs After Complete Deployment

- **Frontend:** https://ipo-web-app-project.vercel.app
- **Backend:** https://samith-07-ipo-backend.onrender.com
- **API Health:** https://samith-07-ipo-backend.onrender.com/api/health

## 🚨 Troubleshooting

### If Build Fails
1. Check `package.json` has correct scripts
2. Verify `server.js` exists in backend
3. Check environment variables are correct

### If API Doesn't Work
1. Check MongoDB connection string
2. Verify PORT is set to 10000
3. Check Render logs for errors

### If CORS Issues
1. Ensure `FRONTEND_URL` matches your Vercel URL exactly
2. Check backend CORS configuration

## 📞 Need Help?

If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Ensure MongoDB is accessible
4. Check this guide for common issues

**Your full-stack app will be live after these steps! 🎉**
