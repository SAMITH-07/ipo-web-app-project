# 🚀 IPO Web App Deployment Guide

## 📋 Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Vercel account (for deployment)
- GitHub account

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/ipo_db
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=production
```

### Frontend
No additional environment variables needed.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `MONGODB_URI` and `JWT_SECRET`

### Option 2: Netlify
1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Upload `frontend/build` folder
   - Set redirect rules for API calls

### Option 3: Railway/Heroku
1. **Deploy Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   npm run build
   ```

## 🗄️ Database Setup

### MongoDB Atlas
1. Create MongoDB Atlas account
2. Create new cluster
3. Create database user
4. Get connection string
5. Add to environment variables

### Seed Database
```bash
cd backend
node enhancedSeedIPOs.js
node addMoreIPOs.js
node createTestUserAtlas.js
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 Live URL
After deployment, your app will be available at:
- **Vercel**: `https://ipo-web-app.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard

## 🔍 Testing Live Deployment
1. Check frontend loads properly
2. Test API endpoints
3. Verify MongoDB connection
4. Test user registration/login
5. Check IPO data display

## 🐛 Troubleshooting

### Common Issues
- **CORS Errors**: Update backend CORS settings
- **Database Connection**: Check MongoDB URI
- **Build Failures**: Verify Node.js version
- **API Routes**: Ensure proper routing

### Debug Commands
```bash
# Check backend logs
vercel logs

# Test API endpoints
curl https://your-app.vercel.app/api/health

# Check database connection
curl https://your-app.vercel.app/api/ipos/stats
```

## 📊 Monitoring
- **Vercel Analytics**: Track performance
- **MongoDB Atlas**: Monitor database
- **GitHub Actions**: CI/CD pipeline status

## 🔐 Security
- Use environment variables for secrets
- Enable HTTPS
- Implement rate limiting
- Regular security updates

## 📞 Support
For deployment issues:
1. Check Vercel logs
2. Verify environment variables
3. Test API endpoints
4. Check MongoDB connection
