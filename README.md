# IPO Web Application

A modern web application for IPO management with React frontend and Node.js backend, featuring JWT authentication and role-based access control.

## Project Structure

```
ipo-web-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Backend utilities
│   └── package.json
└── package.json            # Root package.json for monorepo

### 🎯 Core Functionality
- **📊 Real-time IPO Tracking** - Live subscription status and pricing
- **📈 Investment Analytics** - Comprehensive portfolio performance tracking
- **🔐 Secure Authentication** - JWT-based user authentication
- **📱 Responsive Design** - Mobile-first, professional UI/UX
- **🗄️ MongoDB Atlas** - Cloud database with 27 real IPOs

### 📋 IPO Data (Live from MongoDB Atlas)
- **5 Live IPOs** - Currently open for investment
- **18 Upcoming IPOs** - Scheduled to open soon
- **3 Listed IPOs** - With performance tracking
- **Real Companies** - Reliance Retail, Tata Digital, Dr. Reddy's, etc.

### 🎨 Professional Interface
- **Landing Page** - Modern design with real IPO data
- **Investor Dashboard** - Tabbed navigation with analytics
- **Admin Panel** - Complete IPO management system
- **Live IPO Cards** - Rich, interactive IPO information

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern, component-based UI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Professional styling
- **Lucide React** - Modern icons
- **React Router** - SPA navigation

### Backend
- **Node.js** - Server-side runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens

### Database
- **MongoDB Atlas** - Cloud-hosted database
- **27 IPOs** - Real company data
- **Real-time Updates** - Live subscription tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SAMITH-07/ipo-web-app-project.git
   cd ipo-web-app-project
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # backend/.env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/ipo_db
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database**
   ```bash
   cd backend
   node enhancedSeedIPOs.js
   node addMoreIPOs.js
   node createTestUserAtlas.js
   ```

5. **Start the application**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm start

   # Frontend (Terminal 2)
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Live Demo: https://ipo-web-app-project.vercel.app

## 📱 Usage

### For Investors
1. **Sign Up** - Create your investor account
2. **Browse IPOs** - View live and upcoming IPOs
3. **Apply for IPOs** - Invest in opportunities
4. **Track Performance** - Monitor your investments
5. **Analytics** - View detailed portfolio insights

### For Admins
1. **Login** - Access admin dashboard
2. **Manage IPOs** - Add, edit, remove IPOs
3. **Update Data** - Real-time subscription updates
4. **View Statistics** - Platform analytics
5. **User Management** - Manage investor accounts

## 🌐 Deployment

### Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key

### Other Platforms
- **Netlify** - Frontend hosting
- **Railway** - Backend hosting
- **Heroku** - Full-stack deployment

📖 **Detailed Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Live IPO Data

### Currently Open IPOs
- **Reliance Retail Ltd** - ₹945-950, 7.8x subscription
- **Tata Digital Services** - ₹1,250-1,280, 6.3x subscription
- **Infosys BPM Ltd** - ₹1,350-1,375, 5.5x subscription
- **Bajaj Finance Digital** - ₹1,865-1,890, 7.5x subscription
- **Larsen & Toubro Infotech** - ₹875-895, 4.9x subscription

### Upcoming IPOs
- **Dr. Reddy's Laboratories** - ₹2,450-2,480
- **Sun Pharmaceutical Industries** - ₹680-695
- **Asian Paints Ltd** - ₹3,450-3,500
- **Maruti Suzuki India Ltd** - ₹950-965
- **And 14 more...**

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/create` - Create user (admin/manager only)

### IPOs
- `GET /api/ipos` - Get all IPOs
- `POST /api/ipos` - Create new IPO (admin only)

## Authentication Flow

1. User logs in via `/login` page
2. JWT token is stored in localStorage
3. Token is automatically included in API requests
4. Protected routes verify token validity
5. Users are redirected based on their role

**Note:** Google Sign-In requires proper Google OAuth 2.0 setup. See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed configuration instructions.

## User Roles

- **Admin**: Full access to all features
- **Manager**: Limited administrative access
- **Investor**: Basic user access

## Technologies Used

### Frontend
- React 18
- TypeScript
- React Router
- Tailwind CSS
- Axios
- JWT Decode
- Lucide React (icons)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT
- bcryptjs
- CORS

## Development Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build:frontend` - Build frontend for production
- `npm run install:all` - Install all dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
