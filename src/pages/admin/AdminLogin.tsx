import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

interface AdminLoginProps {
  onLogin: (passcode: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (data.success) {
        onLogin(passcode);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      alert('Gagal menghubungi server backend!');
    }
  };

  return (
    <div className="min-h-screen bg-peach-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-peach-100"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-peach-100 p-4 rounded-full">
            <Lock className="h-8 w-8 text-peach-700" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Login</h2>
        <p className="text-center text-gray-600 mb-8">Masukkan kode akses Anda untuk melanjutkan ke panel kontrol.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Kode Akses"
              className={`w-full px-4 py-3 rounded-xl border ${
                error ? 'border-red-500 bg-red-50' : 'border-peach-200'
              } focus:ring-2 focus:ring-peach-500 outline-none transition-all text-center text-lg tracking-widest`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2 font-medium">Kode akses salah!</p>
            )}
          </div>
          
          <Button
            type="submit"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            Masuk <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
