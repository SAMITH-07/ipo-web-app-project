# 🔐 Environment Variables Reference

## 📋 Copy Your Values From Local .env Files

### Backend Environment Variables (for Render)

Copy these values from your `backend/.env` file:

```
MONGODB_URI=copy_from_your_local_backend_env_file
JWT_SECRET=copy_from_your_local_backend_env_file
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://ipo-web-app-project.vercel.app
```

### Frontend Environment Variables (for Vercel)

After backend is deployed, add this to Vercel:

```
REACT_APP_API_URL=https://samith-07-ipo-backend.onrender.com
```

## 🚀 Quick Deployment Steps

1. **Open Render:** https://render.com (browser opened above)
2. **Login with GitHub:** Use your `SAMITH-07` account
3. **Create Web Service:** Connect `SAMITH-07/ipo-web-app-project`
4. **Set Root Directory:** `backend`
5. **Add Environment Variables:** Copy from your local `.env` file
6. **Deploy:** Click create and wait 2-3 minutes

## 📱 After Deployment

Your full-stack app will be live at:
- **Frontend:** https://ipo-web-app-project.vercel.app ✅
- **Backend:** https://samith-07-ipo-backend.onrender.com (after setup)

## 🔧 What I've Prepared

- ✅ Render configuration ready
- ✅ Browser opened to render.com
- ✅ Step-by-step guide created
- ✅ Environment reference created

**Just follow the steps in the browser and your app will be fully deployed! 🎉**
