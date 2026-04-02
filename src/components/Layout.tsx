import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Dumbbell, User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { useAuth } from '../lib/auth-context';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: ReactNode }) {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight">Digital Fitness</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link to="/#courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to={isAdmin ? "/admin" : "/dashboard"} 
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-surface-light hover:bg-surface transition-colors"
                  >
                    {isAdmin ? <LayoutDashboard className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    <span className="text-sm font-medium">{isAdmin ? "Admin" : "Dashboard"}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="px-6 py-2 rounded-full bg-primary text-black font-bold hover:bg-primary-dark transition-all transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-surface border-b border-white/5 px-4 pt-2 pb-6 space-y-4"
          >
            <Link to="/" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/#courses" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Courses</Link>
            <Link to="/about" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to={isAdmin ? "/admin" : "/dashboard"} className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  {isAdmin ? "Admin Panel" : "My Dashboard"}
                </Link>
                <button onClick={handleLogout} className="block text-lg font-medium text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block w-full text-center py-3 rounded-xl bg-primary text-black font-bold" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-surface border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Digital Fitness</span>
          </div>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Transform your body with our science-based digital fitness courses. 
            Expert guidance, anytime, anywhere.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <Link to="/about" className="text-sm text-gray-400 hover:text-primary">About Us</Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-primary">Contact</Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary">Privacy Policy</Link>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Digital Fitness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
