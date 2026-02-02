# Google OAuth 2.0 Setup Guide

This guide will help you set up Google OAuth 2.0 for the IPO Web Application.

## Prerequisites

- Google Cloud Console account
- Domain name (for production) or localhost for development

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or People API) for your project

## Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
3. Select **Web application** as the application type
4. Configure the following:

### For Development:
- **Authorized JavaScript origins**: `http://localhost:3000`
- **Authorized redirect URIs**: `http://localhost:3000`

### For Production:
- **Authorized JavaScript origins**: `https://yourdomain.com`
- **Authorized redirect URIs**: `https://yourdomain.com`

5. Click **Create** and copy the **Client ID**

## Step 3: Update Frontend Configuration

1. Open `frontend/src/components/GoogleOAuth.tsx`
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:

```typescript
client_id: 'your-actual-google-client-id.apps.googleusercontent.com',
```

## Step 4: Update Backend Configuration

1. Install Google Auth Library:
```bash
cd backend
npm install google-auth-library
```

2. Update `.env` file:
```env
GOOGLE_CLIENT_ID=your-actual-google-client-id.apps.googleusercontent.com
```

3. Uncomment and update the Google verification code in `backend/controllers/authController.js`:

```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ticket = await client.verifyIdToken({
  idToken: token,
  audience: process.env.GOOGLE_CLIENT_ID,
});
const payload = ticket.getPayload();
```

## Step 5: Test the Integration

1. Restart both frontend and backend servers
2. Go to http://localhost:3000
3. Click "Continue with Google"
4. Select your Google account when prompted
5. Grant permissions to the application

## Features

✅ **Real Google Account Selection** - Users can choose from their Google accounts
✅ **Secure Token Verification** - Google ID tokens are verified on the backend
✅ **Profile Picture Support** - User's Google profile picture is imported
✅ **Account Linking** - Existing accounts can be linked to Google
✅ **Error Handling** - Proper error messages for failed attempts

## Security Notes

- Always verify Google ID tokens on the backend
- Never store Google ID tokens in localStorage long-term
- Use HTTPS in production
- Regularly rotate your client secrets
- Implement proper session management

## Troubleshooting

### "Google OAuth is still loading"
- Check your internet connection
- Verify the Google script is loading in browser console
- Ensure your Client ID is correctly set

### "Invalid client" error
- Verify your Client ID is correct
- Check that your domain is in the authorized origins
- Ensure you're using the correct environment (dev vs prod)

### "Popup blocked by browser"
- Allow popups for localhost in your browser settings
- Try using the redirect flow instead of popup

## Production Deployment

1. Update your authorized origins and redirect URIs to your production domain
2. Use HTTPS for all requests
3. Set up proper domain verification in Google Console
4. Configure CSP headers to allow Google OAuth scripts
5. Monitor your Google Cloud Console for API usage

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Verify your Google Cloud Console configuration
3. Ensure your backend environment variables are set correctly
4. Check the network tab for failed requests
