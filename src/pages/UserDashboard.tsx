import { motion } from 'motion/react';
import { useAuth } from '../lib/auth-context';
import { COURSES } from '../constants';
import { ExternalLink, Lock, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function UserDashboard() {
  const { profile, user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      // Profile is already handled by AuthProvider, but we can listen here too if needed
      // or just use this to catch permission errors early
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    });

    return () => unsubscribe();
  }, [user]);

  if (!profile) return null;

  const purchasedCourses = COURSES.filter(c => profile.purchasedCourses.includes(c.id));
  const lockedCourses = COURSES.filter(c => !profile.purchasedCourses.includes(c.id) && !c.isComingSoon);

  const pdfLink = "https://drive.google.com/file/d/1VXb4q_gOJG-t1sso07KbsCHa7ovn38wS/view?usp=drive_link";

  return (
    <div className="pt-24 pb-24 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome, {profile.displayName}!</h1>
          <p className="text-gray-400">Track your progress and access your courses.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Purchased Courses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-2" />
                  Unlocked Courses
                </h2>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {purchasedCourses.length} Courses
                </span>
              </div>

              {purchasedCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {purchasedCourses.map((course) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="course-card"
                    >
                      <img src={course.image} alt={course.title} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                        <a 
                          href={pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-xl bg-primary text-black font-bold flex items-center justify-center hover:bg-primary-dark transition-all"
                        >
                          View Course PDF
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface p-12 rounded-3xl text-center border border-dashed border-white/10">
                  <p className="text-gray-500 mb-6">You haven't unlocked any courses yet.</p>
                  <Link to="/#courses" className="text-primary font-bold hover:underline">Browse Courses</Link>
                </div>
              )}
            </section>

            {/* Locked Courses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Lock className="w-6 h-6 text-gray-500 mr-2" />
                  Locked Courses
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {lockedCourses.map((course) => (
                  <div key={course.id} className="course-card opacity-70">
                    <div className="relative">
                      <img src={course.image} alt={course.title} className="w-full h-40 object-cover grayscale" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white/50" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                      <Link 
                        to={`/course/${course.id}`}
                        className="w-full py-3 rounded-xl bg-surface-light text-white font-bold flex items-center justify-center hover:bg-surface transition-all"
                      >
                        Unlock Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Total Courses</span>
                  <span className="font-bold">{purchasedCourses.length}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Member Since</span>
                  <span className="font-bold">{new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-primary font-bold">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-primary">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                If your course is not unlocked after 24 hours of payment, please contact our support team.
              </p>
              <Link to="/contact" className="text-sm font-bold text-white hover:text-primary transition-colors">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
