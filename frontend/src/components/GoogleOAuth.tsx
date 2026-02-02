import React, { useState, useEffect } from 'react';
import { authService } from '../services/auth';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleOAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleOAuth: React.FC<GoogleOAuthProps> = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Google OAuth script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        initializeGoogleSignIn();
      };
      script.onerror = () => {
        console.error('Failed to load Google OAuth script');
        onError?.('Failed to load Google OAuth. Please try again later.');
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Cleanup script if needed
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [onError]);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE', // Replace with your actual Google Client ID
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    setIsLoading(true);
    
    try {
      // Send the Google ID token to your backend
      await authService.googleSignIn(response.credential);
      onSuccess?.();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      onError?.(error.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignInClick = () => {
    if (!isScriptLoaded) {
      onError?.('Google OAuth is still loading. Please wait a moment.');
      return;
    }

    if (window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          onError?.('Google sign-in was cancelled or not displayed.');
        }
      });
    } else {
      onError?.('Google OAuth is not available. Please refresh the page.');
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleSignInClick}
        disabled={isLoading || !isScriptLoaded}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
            Connecting to Google...
          </>
        ) : !isScriptLoaded ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
            Loading Google Sign-In...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>
      
      {isScriptLoaded && (
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            Select your Google account when prompted
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleOAuth;
