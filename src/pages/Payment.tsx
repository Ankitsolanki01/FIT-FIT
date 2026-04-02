import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { COURSES } from '../constants';
import { Copy, Check, CreditCard, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);
  const [copied, setCopied] = useState(false);

  if (!course) return <div>Course not found</div>;

  const upiId = "9982938638@fam";
  const upiLink = `upi://pay?pa=${upiId}&pn=Digital%20Fitness&am=${course.price}&cu=INR`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20 pb-24 min-h-[90vh] flex items-center">
      <div className="max-w-xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6">
              <CreditCard className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3 tracking-tight">Payment</h1>
            <p className="text-gray-400">Unlock <span className="text-white font-bold">{course.title}</span></p>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl mb-10 text-center border border-white/5">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Total Amount</div>
            <div className="text-5xl font-bold text-primary">₹{course.price}</div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Pay to UPI ID</label>
              <div className="flex items-center space-x-3">
                <div className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-mono text-primary text-lg">
                  {upiId}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all active:scale-95"
                >
                  {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <a 
                href={upiLink}
                className="w-full py-5 rounded-2xl bg-primary text-black font-bold text-xl text-center hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Pay Now
              </a>
              
              <Link 
                to={`/payment-proof/${course.id}`}
                className="w-full py-5 rounded-2xl bg-white/5 text-white font-bold text-xl text-center border border-white/10 hover:bg-white/10 transition-all"
              >
                I Have Paid (Submit UTR)
              </Link>
            </div>
          </div>

          <div className="mt-10 p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-3xl">
            <p className="text-sm text-yellow-500/80 leading-relaxed text-center">
              <strong>Important:</strong> After payment, click "I Have Paid" and submit your UTR ID. 
              Verification takes 12-24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
