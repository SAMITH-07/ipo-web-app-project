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
```

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin, Manager, and Investor roles
- **Modern UI**: Tailwind CSS with responsive design
- **Protected Routes**: Route-level authentication
- **API Integration**: Axios with interceptors for error handling
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for all packages:
   ```bash
   npm run install:all
   ```

### Environment Setup

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/ipo_db
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### Running the Application

1. Start both frontend and backend:
   ```bash
   npm run dev
   ```

2. Or start individually:
   ```bash
   # Frontend (React)
   npm run dev:frontend
   
   # Backend (Node.js)
   npm run dev:backend
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
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
