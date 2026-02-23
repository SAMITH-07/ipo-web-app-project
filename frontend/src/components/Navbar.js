import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{backgroundColor: '#FFFFFF'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl mr-2 font-bold" style={{color: '#DC2626'}}>IPO</div>
              <span className="text-xl font-bold" style={{color: '#DC2626'}}>WEB APP</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? '' : ''
              }`}
              style={{color: isActive('/') ? '#DC2626' : '#1C1C1C'}}
            >
              Home
            </Link>
            
            <Link
              to="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/login') ? '' : ''
              }`}
              style={{color: isActive('/login') ? '#DC2626' : '#1C1C1C'}}
            >
              Login
            </Link>
            
            <Link
              to="/register"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/register') ? '' : ''
              }`}
              style={{color: isActive('/register') ? '#DC2626' : '#1C1C1C'}}
            >
              Register
            </Link>
            
            <div className="dropdown-container relative">
              <button 
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                style={{color: '#1C1C1C'}}
                onClick={toggleDropdown}
              >
                IPO Listings
                <svg className="ml-1 h-4 w-4 transition-transform" style={{transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50" style={{backgroundColor: '#FFFFFF'}}>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                      style={{color: '#1C1C1C'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      All IPOs
                    </Link>
                    <Link
                      to="/dashboard?status=open"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                      style={{color: '#1C1C1C'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Live IPOs
                    </Link>
                    <Link
                      to="/dashboard?status=upcoming"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                      style={{color: '#1C1C1C'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Upcoming IPOs
                    </Link>
                    <Link
                      to="/dashboard?status=listed"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                      style={{color: '#1C1C1C'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Listed IPOs
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{color: '#1C1C1C'}}
                >
                  Dashboard
                </Link>
                <Link
                  to="/watchlist"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{color: '#1C1C1C'}}
                >
                  Watchlist
                </Link>
                <Link
                  to="/analytics"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{color: '#1C1C1C'}}
                >
                  Analytics
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{color: '#1C1C1C'}}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm" style={{color: '#6B7280'}}>Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{backgroundColor: '#DC2626', color: '#FFFFFF'}}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{backgroundColor: '#DC2626', color: '#FFFFFF'}}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{border: `2px solid #DC2626`, color: '#DC2626'}}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md"
              style={{color: '#1C1C1C'}}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t" style={{borderColor: '#E5E7EB', backgroundColor: '#FFFFFF'}}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? '' : ''
                }`}
                style={{color: isActive('/') ? '#DC2626' : '#1C1C1C'}}
              >
                Home
              </Link>
              
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/login') ? '' : ''
                }`}
                style={{color: isActive('/login') ? '#DC2626' : '#1C1C1C'}}
              >
                Login
              </Link>
              
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/register') ? '' : ''
                }`}
                style={{color: isActive('/register') ? '#DC2626' : '#1C1C1C'}}
              >
                Register
              </Link>
              
              {/* Mobile IPO Listings */}
              <div className="border-t pt-2" style={{borderColor: '#E5E7EB'}}>
                <div className="px-3 py-2 text-sm font-medium" style={{color: '#6B7280'}}>IPO Listings</div>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base rounded-md"
                  style={{color: '#1C1C1C'}}
                >
                  All IPOs
                </Link>
                <Link
                  to="/dashboard?status=open"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base rounded-md"
                  style={{color: '#1C1C1C'}}
                >
                  Live IPOs
                </Link>
                <Link
                  to="/dashboard?status=upcoming"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base rounded-md"
                  style={{color: '#1C1C1C'}}
                >
                  Upcoming IPOs
                </Link>
                <Link
                  to="/dashboard?status=listed"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base rounded-md"
                  style={{color: '#1C1C1C'}}
                >
                  Listed IPOs
                </Link>
              </div>

              {user && (
                <>
                  <div className="border-t pt-2" style={{borderColor: '#E5E7EB'}}>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base rounded-md"
                      style={{color: '#1C1C1C'}}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/watchlist"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base rounded-md"
                      style={{color: '#1C1C1C'}}
                    >
                      Watchlist
                    </Link>
                    <Link
                      to="/analytics"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base rounded-md"
                      style={{color: '#1C1C1C'}}
                    >
                      Analytics
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-base rounded-md"
                        style={{color: '#1C1C1C'}}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                  
                  <div className="border-t pt-2" style={{borderColor: '#E5E7EB'}}>
                    <div className="px-3 py-2 text-sm" style={{color: '#6B7280'}}>Welcome, {user.name}</div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base rounded-md font-medium"
                      style={{color: '#DC2626'}}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
