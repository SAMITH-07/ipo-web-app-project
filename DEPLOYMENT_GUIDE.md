# 🚀 Deployment Guide: Vercel & Render

This guide will help you deploy your IPO Web App with frontend on Vercel and backend on Render.

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (free)
- Render account (free tier available)
- MongoDB Atlas account (free tier available)

---

## 🎯 Step 1: Deploy Backend to Render

### 1.1 Push Code to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 1.2 Deploy on Render
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ipo-web-app-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 1.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secure_secret_key
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 1.4 Health Check
Add health check path: `/api/health`

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 2.2 Deploy Frontend
```bash
cd frontend
vercel --prod
```

### 2.3 Set Environment Variables
In Vercel dashboard, add:
```
REACT_APP_API_URL=https://your-render-app.onrender.com
```

---

## 🔧 Configuration Files Created

### `frontend/vercel.json`
```json
{
  "version": 2,
  "name": "ipo-web-app-frontend",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "@api_url"
  }
}
```

### `render.yaml`
```yaml
services:
  - type: web
    name: ipo-web-app-backend
    env: node
    repo: https://github.com/SAMITH-07/ipo-web-app-project.git
    rootDir: backend
    buildCommand: "npm install"
    startCommand: "npm start"
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
    healthCheckPath: /api/health
    autoDeploy: true
```

---

## 🔐 Environment Setup

### Backend Environment Variables
Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ipo_db
JWT_SECRET=your_very_long_and_secure_secret_key_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend Environment Variables
Create `frontend/.env`:
```env
REACT_APP_API_URL=https://your-render-app.onrender.com
```

---

## 🌐 Access URLs

After deployment:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-app-name.onrender.com`
- **API Health Check**: `https://your-app-name.onrender.com/api/health`

---

## 🔄 Auto-Deploy Configuration

### Vercel (Frontend)
- Automatically deploys on push to main branch
- Preview deployments for pull requests

### Render (Backend)
- Auto-deploy enabled in `render.yaml`
- Deploys on push to main branch

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. CORS Errors
```javascript
// In backend server.js, ensure CORS is configured:
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

#### 2. MongoDB Connection
- Verify MongoDB Atlas IP whitelist includes Render's IP ranges
- Check connection string format
- Ensure database user has proper permissions

#### 3. Environment Variables
- Double-check variable names match exactly
- Ensure no trailing spaces in values
- Verify Render and Vercel dashboards show correct values

#### 4. Build Failures
- Check `package.json` scripts are correct
- Verify all dependencies are installed
- Check for TypeScript errors in frontend

### Debug Commands

#### Backend Health Check
```bash
curl https://your-app.onrender.com/api/health
```

#### Frontend Build Test
```bash
cd frontend
npm run build
```

---

## 📊 Monitoring

### Vercel
- View deployment logs in Vercel dashboard
- Monitor performance with Vercel Analytics

### Render
- Check service logs in Render dashboard
- Monitor resource usage
- Set up alerting for downtime

---

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use long, random strings
3. **MongoDB**: Use strong passwords and IP whitelisting
4. **HTTPS**: Both platforms provide automatic SSL
5. **CORS**: Restrict to your frontend domain only

---

## 💡 Pro Tips

1. **Database Optimization**: Use MongoDB Atlas M0 free tier for development
2. **Performance**: Enable gzip compression in Express
3. **Logging**: Add Winston or similar for production logging
4. **Error Handling**: Implement proper error boundaries in React
5. **Caching**: Consider Redis for frequently accessed data

---

## 📞 Support

If you encounter issues:
1. Check platform status pages (Vercel, Render, MongoDB Atlas)
2. Review deployment logs
3. Test locally with production environment variables
4. Check this guide's troubleshooting section

---

**Happy Deploying! 🎉**
