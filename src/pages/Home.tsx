import { motion } from 'motion/react';
import { Dumbbell, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth-context';

export default function Home() {
  const { user } = useAuth();
  const activeCourses = COURSES.filter(c => !c.isComingSoon);
  const comingSoonCourses = COURSES.filter(c => c.isComingSoon);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/fitness_hero/1920/1080?blur=4" 
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
              Transform Your Body Digitally
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              Master Your <br />
              <span className="text-primary">Fitness Goals</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Premium science-based courses for weight gain and weight loss. 
              Join 10,000+ successful students today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#courses"
                className="px-10 py-5 rounded-2xl bg-primary text-black font-bold text-xl hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center group shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Start Training
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto"
          >
            {[
              { label: 'Happy Clients', value: '10k+' },
              { label: 'Success Rate', value: '98%' },
              { label: 'Expert Trainers', value: '15+' },
              { label: 'Course Hours', value: '500+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Courses</h2>
            <p className="text-gray-400">Choose the program that fits your goals and start your transformation today.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {activeCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="course-card group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{course.title}</h3>
                    <div className="text-xl font-bold text-primary">₹{course.price}</div>
                  </div>
                  <p className="text-gray-400 mb-6 line-clamp-2">{course.description}</p>
                  <Link 
                    to={user ? `/payment/${course.id}` : "/login"}
                    className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary-dark transition-all flex items-center justify-center group/btn shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  >
                    Buy Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to={`/course/${course.id}`}
                    className="block text-center mt-4 text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    View Course Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Other Courses Section</h2>
            <p className="text-gray-400">Exciting new programs coming your way very soon.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoonCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface/30 border border-white/5 rounded-2xl p-4 opacity-50 grayscale hover:grayscale-0 transition-all text-center"
              >
                <div className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Dumbbell className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="text-sm font-bold mb-1">{course.title}</h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Coming Soon</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-primary" />,
                title: "Science-Based",
                desc: "All our programs are built on proven scientific principles of nutrition and exercise."
              },
              {
                icon: <Star className="w-8 h-8 text-primary" />,
                title: "Expert Guidance",
                desc: "Get insights and tips from professional fitness experts with years of experience."
              },
              {
                icon: <Dumbbell className="w-8 h-8 text-primary" />,
                title: "Flexible Learning",
                desc: "Access your PDF courses anytime, anywhere, and follow them at your own pace."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
