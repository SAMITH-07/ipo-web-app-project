# IPO Web App - Complete Architecture Documentation

## 🏗️ Project Structure

```
IPO Web App/
├── frontend/
│   ├── index.html              # Main entry point
│   ├── css/style.css           # Global styling
│   ├── js/
│   │   ├── api.js              # Mock API (fallback)
│   │   ├── api-rest.js         # Real REST API wrapper
│   │   ├── app.js              # Main app controller
│   │   ├── components/
│   │   │   ├── navbar.js       # Navigation bar
│   │   │   ├── sidebar.js      # Sidebar menu
│   │   │   └── footer.js       # Footer component
│   │   └── pages/
│   │       ├── dashboard.js    # Dashboard page
│   │       ├── live-ipos.js    # Live IPOs page
│   │       ├── upcoming-ipos.js# Upcoming IPOs page
│   │       ├── performance.js  # Performance page
│   │       ├── admin.js        # Admin dashboard
│   │       └── investor.js     # Investor profile
│   └── public/
│
└── backend/
    ├── server.js               # Express server
    ├── .env                    # Environment variables
    ├── seed.js                 # Database seeding script
    ├── models/
    │   ├── IPO.js             # IPO schema
    │   └── User.js            # User schema
    └── routes/
        ├── ipos.js            # IPO endpoints
        └── users.js           # User endpoints
```

---

## 🚀 How the REST APIs Work

### **Frontend → Backend Communication**

```
┌─────────────────┐                    ┌──────────────────┐
│   Frontend      │                    │    Backend       │
│  (Port 8000)    │ ───  HTTP  ───→    │   (Port 5000)    │
│                 │                    │                  │
│  api-rest.js    │ ←──  JSON  ───    │  Express Server  │
└─────────────────┘                    └──────────────────┘
                                              ↓
                                       ┌──────────────┐
                                       │  MongoDB     │
                                       │   Atlas      │
                                       └──────────────┘
```

### **API Endpoints**

#### **IPO Endpoints** (`/api/ipos`)

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/` | Get all IPOs | `localhost:5000/api/ipos` |
| GET | `/:id` | Get single IPO | `localhost:5000/api/ipos/65abc123...` |
| GET | `/status/:status` | Get by status (open/closed/upcoming) | `localhost:5000/api/ipos/status/open` |
| GET | `/sector/:sector` | Get by sector | `localhost:5000/api/ipos/sector/Technology` |
| GET | `/search/:query` | Search IPOs | `localhost:5000/api/ipos/search/TECHNO` |
| GET | `/stats/market/overview` | Get market statistics | `localhost:5000/api/ipos/stats/market/overview` |
| POST | `/` | Create new IPO (admin) | POST request with IPO data |
| PUT | `/:id` | Update IPO | PUT request with updated data |
| DELETE | `/:id` | Delete IPO | DELETE request |

#### **User Endpoints** (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/:id` | Get user profile |
| PUT | `/:id/portfolio` | Update portfolio |
| POST | `/:id/watchlist/:ipoId` | Add to watchlist |
| POST | `/:id/subscribe` | Subscribe to IPO |

---

## 📡 Frontend API Module (`js/api-rest.js`)

### **Async Methods Used**

```javascript
// Get all IPOs
await API.getAllIPOs()
// Returns: Array of IPO objects

// Get IPOs by status
await API.getIPOsByStatus('open')
// Returns: Filtered IPO array

// Get single IPO
await API.getIPOById(id)
// Returns: Single IPO object

// Get market stats
await API.getMarketStats()
// Returns: { totalIPOs, openIPOs, upcomingIPOs, totalMarketCap, avgReturn }

// Search IPOs
await API.searchIPOs('TechnoVision')
// Returns: Matching IPO array

// Get by sector
await API.getBySektor('Technology')
// Returns: Sector filtered IPO array

// Get risk analysis
await API.getRiskAnalysis(id)
// Returns: { level, factors: [...] }

// User authentication
await API.register({ name, email, password, role })
await API.login(email, password)

// User operations
await API.subscribeToIPO(userId, ipoId, amount)
await API.addToWatchlist(userId, ipoId)
```

---

## 🗂️ Data Models

### **IPO Schema**
```javascript
{
    _id: ObjectId,
    company: String,
    symbol: String (unique),
    sector: String (Technology|Finance|Healthcare|Energy|IT Services),
    status: String (open|closed|upcoming),
    description: String,
    
    // Pricing
    listingDate: Date,
    listingPrice: Number,
    currentPrice: Number,
    change: Number,
    changePercent: Number,
    highPrice52w: Number,
    lowPrice52w: Number,
    
    // Market Info
    volume: String,
    marketCap: String,
    minInvestment: Number,
    
    // Financial Metrics
    peRatio: Number,
    dividend: String,
    expectedReturn: String,
    
    // Governance
    boardStrength: String,
    promoterHolding: String,
    riskLevel: String (low|medium|high),
    
    // Other
    news: [String],
    subscriptions: Number,
    createdAt: Date,
    updatedAt: Date
}
```

### **User Schema**
```javascript
{
    _id: ObjectId,
    name: String,
    email: String (unique),
    password: String (hashed),
    role: String (investor|admin),
    
    portfolio: {
        totalInvested: Number,
        currentValue: Number,
        holdings: [
            {
                ipoId: ObjectId,
                quantity: Number,
                investmentAmount: Number,
                currentValue: Number
            }
        ]
    },
    
    watchlist: [ObjectId],
    
    subscriptions: [
        {
            ipoId: ObjectId,
            appliedAmount: Number,
            appliedDate: Date,
            status: String (pending|allotted|rejected),
            allottedQuantity: Number
        }
    ],
    
    createdAt: Date,
    updatedAt: Date
}
```

---

## 🔄 Request/Response Examples

### **Get All IPOs**
```
Request:
GET /api/ipos

Response:
[
    {
        _id: "65abc123...",
        company: "TechnoVision Solutions",
        symbol: "TECHNO",
        sector: "Technology",
        status: "open",
        currentPrice: 245,
        changePercent: 22.5,
        ...
    },
    ...
]
```

### **Login User**
```
Request:
POST /api/users/login
Content-Type: application/json

{
    "email": "investor@example.com",
    "password": "password123"
}

Response:
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "id": "65user123...",
        "name": "John Investor",
        "email": "investor@example.com",
        "role": "investor"
    }
}
```

### **Subscribe to IPO**
```
Request:
POST /api/users/65user123.../subscribe
Content-Type: application/json

{
    "ipoId": "65ipo456...",
    "appliedAmount": 100000
}

Response:
{
    "user": { ... },
    "subscriptions": [
        {
            "ipoId": "65ipo456...",
            "appliedAmount": 100000,
            "status": "pending",
            ...
        }
    ]
}
```

---

## ⚙️ Setup & Running

### **Backend Setup**
```bash
# Install dependencies
cd backend
npm install

# Create .env file with:
# MONGODB_URI=mongodb+srv://cse22042_db_user:jaE8KltfS0rKxvc9@cluster0.0mwympu.mongodb.net/ipo_db
# PORT=5000
# JWT_SECRET=your_secret_key

# Seed database with initial data
node seed.js

# Start backend server
npm start
# Server runs on http://localhost:5000
```

### **Frontend Setup**
```bash
# From project root
# Start Python HTTP server
python -m http.server 8000

# Or use Node.js if preferred
npm install -g http-server
http-server -p 8000
```

### **Database Status**
- **MongoDB Atlas Cluster**: cluster0.0mwympu.mongodb.net
- **Database**: ipo_db
- **Collections**: ipos, users
- **Initial Data**: 5 IPOs seeded

---

## 🔐 Security Features

✅ **Password Hashing**: Bcryptjs for secure password storage  
✅ **JWT Authentication**: Token-based user authentication  
✅ **CORS Enabled**: Cross-origin requests allowed  
✅ **Environment Variables**: Sensitive data in .env  
✅ **Input Validation**: Mongoose schema validation  
✅ **Error Handling**: Centralized error middleware  

---

## 📊 Current Database Contents

5 IPOs seeded:
1. **TechnoVision Solutions** (TECHNO) - Technology - Open
2. **GreenEnergy Corp** (GREEN) - Energy - Closed
3. **DataTech Systems** (DATA) - IT Services - Open
4. **FinServe Bank** (FSERVE) - Finance - Upcoming
5. **HealthPlus Pharma** (HPLUS) - Healthcare - Upcoming

---

## 🔗 API Health Check

```bash
# Check if API is running
curl http://localhost:5000/api/health

# Response:
# { "status": "Backend API is running ✅" }
```

---

## 📝 Frontend Data Flow

```
User Action (Frontend)
        ↓
Calls API method (api-rest.js)
        ↓
fetch() sends HTTP request
        ↓
Backend route processes request
        ↓
MongoDB returns data
        ↓
Response sent back as JSON
        ↓
Frontend updates UI
```

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Modular component architecture
- Async/await for API calls

**Backend:**
- Node.js & Express.js
- Mongoose ODM
- MongoDB Atlas (Cloud Database)
- JWT for authentication
- Bcryptjs for password hashing

**Database:**
- MongoDB Atlas (Cloud)
- Collections: ipos, users

---

## 📱 Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend && npm start
# Listening on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
python -m http.server 8000
# Serving on http://localhost:8000
```

Visit: **http://localhost:8000** in browser

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Backend won't connect to MongoDB | Check .env file has correct connection string |
| CORS errors in console | Backend CORS is enabled, check connection URL |
| 404 errors on API calls | Ensure backend is running on port 5000 |
| Database empty | Run `node seed.js` to populate |
| Port already in use | Change PORT in .env or kill process using port |

---

## 📈 Future Enhancements

- [ ] Real-time data updates (WebSockets)
- [ ] Email notifications for subscriptions
- [ ] Payment gateway integration
- [ ] Advanced analytics & charting
- [ ] User dashboard improvements
- [ ] Admin reporting features
- [ ] Mobile app (React Native/Flutter)
- [ ] Caching layer (Redis)
- [ ] Rate limiting for API
- [ ] Comprehensive testing (Jest, Mocha)

---

**Last Updated:** January 28, 2026  
**Version:** 1.0.0 with MongoDB Integration
