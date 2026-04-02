import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './lib/auth-context';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetail from './pages/CourseDetail';
import Payment from './pages/Payment';
import PaymentProofForm from './pages/PaymentProofForm';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
import Contact from './pages/Contact';
import { ReactNode } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              
              <Route path="/payment/:courseId" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              
              <Route path="/payment-proof/:courseId" element={
                <ProtectedRoute>
                  <PaymentProofForm />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminPanel />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px border-white/10'
            }
          }} />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
