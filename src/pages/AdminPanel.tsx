import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, query, onSnapshot, doc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { PaymentProof, UserProfile } from '../types';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import { 
  Users, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function AdminPanel() {
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'paymentProofs'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const proofData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaymentProof));
      setProofs(proofData.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'paymentProofs');
    });

    const fetchUsers = async () => {
      try {
        const userSnap = await getDocs(collection(db, 'users'));
        setUsers(userSnap.docs.map(doc => doc.data() as UserProfile));
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'users');
      }
    };
    fetchUsers();

    return () => unsubscribe();
  }, []);

  const handleVerify = async (proof: PaymentProof) => {
    try {
      // 1. Update proof status
      await updateDoc(doc(db, 'paymentProofs', proof.id), {
        status: 'verified'
      });

      // 2. Unlock course for user
      await updateDoc(doc(db, 'users', proof.userId), {
        purchasedCourses: arrayUnion(proof.courseId)
      });

      toast.success('Payment verified and course unlocked!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `paymentProofs/${proof.id} or users/${proof.userId}`);
    }
  };

  const handleReject = async (proofId: string) => {
    try {
      await updateDoc(doc(db, 'paymentProofs', proofId), {
        status: 'rejected'
      });
      toast.success('Payment proof rejected');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `paymentProofs/${proofId}`);
    }
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Total Purchases', value: users.reduce((acc, u) => acc + u.purchasedCourses.length, 0), icon: <CreditCard className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Pending Proofs', value: proofs.filter(p => p.status === 'pending').length, icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Verified Proofs', value: proofs.filter(p => p.status === 'verified').length, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-primary' },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <ShieldCheck className="w-10 h-10 text-primary mr-4" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage users, verify payments, and monitor activity.</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-surface rounded-full border border-white/5">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">System Live</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-6 rounded-3xl border border-white/5"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white", stat.color)}>
                {stat.icon}
              </div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Payment Proofs Table */}
        <section className="bg-surface rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Payment Proof Submissions</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-full">
                {proofs.filter(p => p.status === 'pending').length} Pending
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-8 py-4 font-medium">User</th>
                  <th className="px-8 py-4 font-medium">Course</th>
                  <th className="px-8 py-4 font-medium">UTR ID</th>
                  <th className="px-8 py-4 font-medium">Status</th>
                  <th className="px-8 py-4 font-medium">Date</th>
                  <th className="px-8 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {proofs.map((proof) => (
                  <tr key={proof.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-sm">{proof.userEmail}</div>
                      <div className="text-xs text-gray-500">ID: {proof.userId.slice(0, 8)}...</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium">{proof.courseId}</span>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-xs bg-surface-light px-2 py-1 rounded text-primary">{proof.utrId}</code>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        proof.status === 'pending' ? "bg-yellow-500/10 text-yellow-500" :
                        proof.status === 'verified' ? "bg-primary/10 text-primary" :
                        "bg-red-500/10 text-red-500"
                      )}>
                        {proof.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      {new Date(proof.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {proof.status === 'pending' && (
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleVerify(proof)}
                            className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-black rounded-lg transition-all"
                            title="Verify"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleReject(proof.id)}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {proofs.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No payment proofs submitted yet.
              </div>
            )}
          </div>
        </section>

        {/* User List Section */}
        <section className="mt-12 bg-surface rounded-3xl border border-white/5 p-8">
          <h2 className="text-2xl font-bold mb-6">User List</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, i) => (
              <div key={i} className="bg-surface-light p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold">{user.displayName}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-primary font-bold uppercase">{user.role}</div>
                  <div className="text-xs text-gray-500">{user.purchasedCourses.length} Courses</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
