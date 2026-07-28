import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-sky-500/10 text-center relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto mb-4 text-2xl">
          🚀
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Connect with Developers</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          You are currently in <span className="text-sky-400 font-semibold">Guest Mode</span>. Sign in or create an account to send connection requests and chat in real-time!
        </p>

        <button 
          onClick={() => {
            onClose();
            navigate("/login");
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Sign In / Sign Up
        </button>

        <p className="text-xs text-slate-500 mt-4">Takes less than 10 seconds</p>
      </div>
    </div>
  );
};

export default AuthModal;