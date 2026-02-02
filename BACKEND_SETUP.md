# IPO Web App - Backend Setup Guide

## Backend Structure

```
backend/
├── server.js          # Express server
├── package.json       # Dependencies
├── .env              # Environment variables
├── models/
│   └── IPO.js        # MongoDB IPO schema
└── routes/
    └── ipos.js       # REST API endpoints
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB

Edit `backend/.env` and replace `<db_password>` with your actual MongoDB password:
```
MONGODB_URI=mongodb+srv://cse22042_db_user:<your_password>@cluster0.0mwympu.mongodb.net/ipo_db
PORT=5000
NODE_ENV=development
```

### 3. Start Backend Server
```bash
npm start
```

The backend will run on `http://localhost:5000`

## REST API Endpoints

### Get All IPOs
```
GET /api/ipos
```

### Get IPOs by Status
```
GET /api/ipos/status/:status
Parameters: open, closed, upcoming
```

### Get Single IPO
```
GET /api/ipos/id/:id
```

### Search IPOs
```
GET /api/ipos/search/:query
```

### Get IPOs by Sector
```
GET /api/ipos/sector/:sector
```

### Get Market Statistics
```
GET /api/ipos/stats/market
```

### Create IPO (Admin)
```
POST /api/ipos
Body: { company, symbol, sector, ... }
```

### Update IPO (Admin)
```
PUT /api/ipos/:id
Body: { ...fields to update }
```

### Delete IPO (Admin)
```
DELETE /api/ipos/:id
```

## Frontend Integration

### Option 1: Use Real API
Replace the script tag in `index.html`:
```html
<!-- Use this for real backend -->
<script src="js/api-real.js"></script>
```

### Option 2: Use Mock API
Keep existing setup:
```html
<!-- Use this for mock data -->
<script src="js/api.js"></script>
```

## Running Both Frontend & Backend

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```

### Terminal 2 - Start Frontend
```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000`

## Important Notes

⚠️ **Database Password**: Make sure to replace `<db_password>` in `.env` file before running the server.

✅ **CORS Enabled**: The backend allows requests from `http://localhost:8000`

✅ **Async/Await**: All API calls use modern async/await pattern

✅ **Error Handling**: Built-in error handling for network failures

## Sample Data to Add

To populate your database, you can POST to `/api/ipos`:

```javascript
{
    "company": "TechnoVision Solutions",
    "symbol": "TECHNO",
    "sector": "Technology",
    "status": "open",
    "description": "Leading AI and cloud solutions provider",
    "listingPrice": 200,
    "currentPrice": 245,
    "change": 45,
    "changePercent": 22.5,
    "marketCap": "₹12,000 Cr",
    "minInvestment": 10000,
    "highPrice52w": 280,
    "lowPrice52w": 180,
    "peRatio": 24.5,
    "dividend": "2.5%",
    "riskLevel": "medium",
    "boardStrength": "Strong",
    "promoterHolding": "65%",
    "news": ["Q3 Revenue up 35% YoY"]
}
```

## Testing Backend

Use Postman or curl to test endpoints:

```bash
# Get all IPOs
curl http://localhost:5000/api/ipos

# Get open IPOs
curl http://localhost:5000/api/ipos/status/open

# Search
curl "http://localhost:5000/api/ipos/search/Technology"

# Market stats
curl http://localhost:5000/api/ipos/stats/market
```

## Troubleshooting

### MongoDB Connection Error
- Check your password in `.env`
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify network connectivity

### CORS Error
- Backend is running on port 5000
- Frontend is on port 8000
- CORS is enabled in `server.js`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use different port: `python -m http.server 8001`
