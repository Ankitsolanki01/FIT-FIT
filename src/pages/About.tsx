import { motion } from 'motion/react';
import { Dumbbell, Target, Shield, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6"
          >
            About <span className="text-primary">Digital Fitness</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We are dedicated to providing science-backed fitness education 
            that empowers you to transform your body and life.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Digital Fitness, we believe that fitness should be accessible, 
              understandable, and based on real science. Our mission is to cut 
              through the noise of the fitness industry and provide you with 
              clear, actionable plans that deliver results.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you're looking to gain muscle, lose fat, or simply 
              improve your overall health, our digital courses provide the 
              roadmap you need to succeed.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          >
            <img 
              src="https://picsum.photos/seed/fitness_about/800/600" 
              alt="Fitness Mission"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-primary" />,
              title: "Goal Oriented",
              desc: "Every course is designed with a specific outcome in mind, ensuring you stay focused on your goals."
            },
            {
              icon: <Shield className="w-8 h-8 text-primary" />,
              title: "Science Backed",
              desc: "We use the latest research in exercise physiology and nutrition to build our programs."
            },
            {
              icon: <Users className="w-8 h-8 text-primary" />,
              title: "Community Driven",
              desc: "Join thousands of others who have transformed their lives using our digital fitness programs."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-8 rounded-3xl border border-white/5 text-center"
            >
              <div className="flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
