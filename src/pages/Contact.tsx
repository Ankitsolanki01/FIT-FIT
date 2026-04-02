import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.');
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Have questions about our courses or need support? 
            We're here to help you on your fitness journey.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-white/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email Us</div>
                  <div className="text-lg font-bold">support@digitalfitness.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Call Us</div>
                  <div className="text-lg font-bold">+91 99829 38638</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Location</div>
                  <div className="text-lg font-bold">Jaipur, Rajasthan, India</div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-primary">Live Support</h3>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Our team is available Monday to Saturday, 10 AM to 6 PM IST.
              </p>
              <button className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary-dark transition-all">
                Chat with Us
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl border border-white/5"
            >
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-surface-light border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-surface-light border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-surface-light border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-surface-light border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
