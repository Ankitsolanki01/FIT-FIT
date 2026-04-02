import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { COURSES } from '../constants';
import { CheckCircle, ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const course = COURSES.find(c => c.id === id);

  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  const isPurchased = profile?.purchasedCourses.includes(course.id);

  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5 mb-8">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">What You Will Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.learnings.map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 bg-surface rounded-xl border border-white/5">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Course Benefits</h2>
                <ul className="space-y-4">
                  {course.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {[
                    { name: "Rahul S.", rating: 5, text: "Amazing results! Gained 5kg in 2 months following the plan strictly." },
                    { name: "Priya M.", rating: 5, text: "The nutrition guide is so easy to follow. Highly recommend!" }
                  ].map((review, i) => (
                    <div key={i} className="bg-surface p-6 rounded-2xl border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{review.name}</span>
                        <div className="flex text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Purchase Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32"
          >
            <div className="glass p-8 rounded-3xl shadow-2xl border border-primary/10">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-gray-400 text-sm">(120+ Reviews)</span>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                {course.fullDescription}
              </p>

              <div className="bg-surface-light p-6 rounded-2xl mb-8">
                <div className="text-sm text-gray-400 mb-1">One-time payment</div>
                <div className="text-4xl font-bold text-primary">₹{course.price}</div>
              </div>

              {isPurchased ? (
                <Link 
                  to="/dashboard"
                  className="w-full py-4 rounded-xl bg-primary text-black font-bold text-center block hover:bg-primary-dark transition-all"
                >
                  View in Dashboard
                </Link>
              ) : (
                <Link 
                  to={user ? `/payment/${course.id}` : "/login"}
                  className="w-full py-4 rounded-xl bg-primary text-black font-bold text-center block hover:bg-primary-dark transition-all flex items-center justify-center group"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now
                </Link>
              )}

              <div className="mt-8 space-y-4">
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Instant Access to PDF
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Lifetime Updates
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Mobile Friendly Format
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
