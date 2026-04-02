import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/auth-context';
import { toast } from 'react-hot-toast';
import { FileCheck, Send, ArrowLeft } from 'lucide-react';

export default function PaymentProofForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [utrId, setUtrId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'paymentProofs'), {
        userId: user.uid,
        userEmail: user.email,
        utrId,
        courseId,
        status: 'pending',
        submittedAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error: any) {
      handleFirestoreError(error, OperationType.CREATE, 'paymentProofs');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileCheck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-400 mb-8">
            Your payment is under verification. We will unlock your course shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary-dark transition-all"
          >
            OK
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 min-h-[90vh] flex items-center">
      <div className="max-w-xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit Payment Proof</h1>
            <p className="text-gray-400">Fill in the details to verify your purchase</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">UTR ID / Transaction ID</label>
              <input 
                type="text" 
                required
                value={utrId}
                onChange={(e) => setUtrId(e.target.value)}
                className="w-full bg-surface-light border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary/50 transition-colors text-lg"
                placeholder="Enter your 12-digit UTR Number"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can find this in your payment confirmation message or app.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Submit Proof
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
