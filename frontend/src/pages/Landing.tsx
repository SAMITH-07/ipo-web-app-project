import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ipoService, IPO } from '../services/ipo';
import { 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  Star,
  ArrowRight,
  CheckCircle,
  Briefcase,
  DollarSign,
  Eye,
  Menu,
  X
} from 'lucide-react';

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveIPOs, setLiveIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveIPOs();
  }, []);

  const fetchLiveIPOs = async () => {
    try {
      const ipos = await ipoService.getLiveIPOs();
      setLiveIPOs(ipos.slice(0, 3)); // Show only first 3 on landing page
    } catch (error) {
      console.error('Failed to fetch live IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Live IPO Tracking",
      description: "Real-time updates on live IPOs with subscription status and pricing information"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Investment Analytics",
      description: "Track your total investment and returns with detailed performance metrics"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Bank-level security with JWT authentication and encrypted data transmission"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Management",
      description: "Admin panel for complete IPO management with real-time statistics"
    }
  ];

  const stats = [
    { label: "IPOs Listed", value: "500+", prefix: "" },
    { label: "Investors", value: "50K+", prefix: "" },
    { label: "Total Investment", value: "₹500Cr+", prefix: "" },
    { label: "Success Rate", value: "95%", prefix: "" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">IPO Web APP</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How it Works</a>
              <a href="#live-ipos" className="text-gray-600 hover:text-gray-900 transition">Live IPOs</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#live-ipos" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Live IPOs</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</a>
              <Link to="/signup" className="block px-3 py-2 bg-blue-600 text-white rounded-lg">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Invest in <span className="text-blue-600">IPOs</span> with Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track live IPOs, manage investments, and monitor returns with India's most comprehensive IPO investment platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center text-lg font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a 
              href="#pricing" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center text-lg font-medium"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {stat.prefix}{stat.value}
                </div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for IPO Investing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for both investors and administrators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to start investing in IPOs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes with email or Google OAuth</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse IPOs</h3>
              <p className="text-gray-600">Explore live and upcoming IPOs with detailed analysis</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Invest & Track</h3>
              <p className="text-gray-600">Apply for IPOs and monitor your investment performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live IPOs Section */}
      <section id="live-ipos" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Live IPOs - Apply Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Currently open IPOs with real-time subscription status
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              ))
            ) : (
              liveIPOs.map((ipo) => (
                <div key={ipo._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{ipo.company}</h3>
                      <p className="text-sm text-gray-500">{ipo.symbol}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Open
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price Band:</span>
                      <span className="font-medium">
                        {ipo.priceBand ? `₹${ipo.priceBand.min} - ₹${ipo.priceBand.max}` : `₹${ipo.issuePrice}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subscription:</span>
                      <span className="font-medium text-green-600">{ipo.totalSubscription || 0}x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Closes:</span>
                      <span className="font-medium">
                        {ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </div>
                  <Link 
                    to="/signup"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-center block"
                  >
                    Apply Now
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Investment Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing plans for every type of investor
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                Free
                <span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Track up to 5 IPOs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Current Plan
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Professional</h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Popular
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ₹299
                <span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Track unlimited IPOs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">API access</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Upgrade Now
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ₹999
                <span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">White-label platform</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
              </ul>
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your IPO Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investors who trust IPO Web APP for their investment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center text-lg font-medium"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              to="/login" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center text-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">IPO Web APP</span>
              </div>
              <p className="text-gray-400">
                India's leading IPO investment platform with real-time tracking and comprehensive analytics.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Risk Disclosure</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IPO Web APP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
