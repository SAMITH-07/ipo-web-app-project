import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleOAuth = ({ onLoginSuccess, buttonText = "Sign in with Google" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleLoaded(true);
      // Initialize Google Sign-In
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'demo-client-id',
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_out: false,
        });
      }
    };
    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
      setError('Failed to load Google Sign-In');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if needed
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (!googleLoaded) {
      setError('Google Sign-In is still loading...');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use the One Tap prompt or render the button
      if (window.google && window.google.accounts.id) {
        // Try to show the One Tap prompt first
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap is not displayed, render the sign-in button
            renderGoogleSignInButton();
          }
        });
      } else {
        setError('Google Sign-In not available');
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      setError('Failed to initialize Google Sign-In');
      setIsLoading(false);
    }
  };

  const renderGoogleSignInButton = () => {
    if (!window.google || !window.google.accounts) {
      setError('Google Sign-In not available');
      setIsLoading(false);
      return;
    }

    // Create a container for the Google Sign-In button
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'google-signin-button';
    
    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      buttonContainer,
      {
        theme: 'outline',
        size: 'large',
        text: buttonText,
        width: 350,
        logo_alignment: 'left'
      }
    );

    // Add click handler to the button
    setTimeout(() => {
      const button = buttonContainer.querySelector('div[role="button"]');
      if (button) {
        button.addEventListener('click', () => {
          // Trigger the sign-in flow
          window.google.accounts.id.prompt();
        });
      }
    }, 100);
  };

  const handleGoogleResponse = async (response) => {
    try {
      if (response && response.credential) {
        const token = response.credential;
        
        // Send token to backend for verification
        const res = await axios.post('http://localhost:5000/api/auth/google', {
          token: token
        });

        // Store token and user data
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // Call success callback
        if (onLoginSuccess) {
          onLoginSuccess(res.data.user);
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="google-oauth">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!googleLoaded ? (
        <button
          disabled
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-gray-100 cursor-not-allowed"
        >
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8c0-2.92 2.56-5.29 5.86-5.86 3.3-3.29 5.86-5.86 5.86-5.86V8c0 3.92-2.56 5.86-5.86 5.86z"></path>
          </svg>
          Loading Google Sign-In...
        </button>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8c0-2.92 2.56-5.29 5.86-5.86 3.3-3.29 5.86-5.86 5.86-5.86V8c0 3.92-2.56 5.86-5.86 5.86z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{buttonText}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default GoogleOAuth;
