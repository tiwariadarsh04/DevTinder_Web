import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import checkValidData from "../utils/validation";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [warnning, setWarnning] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = { firstName, lastName, emailId: email, password };
      const checkEmailPassword = checkValidData(email, password);
      
      if (checkEmailPassword) {
        setError(checkEmailPassword);
        setWarnning(true);
        setTimeout(() => setWarnning(false), 3000);
        return;
      }

      await axios.post(BASE_URL + "/signup", data, { withCredentials: true });
      setShowOtpField(true);
    } catch (error) {
      const backendError = 
        error.response?.data?.error?.message || 
        error.response?.data?.message || 
        "Signup failed. Please check details.";
      setError(backendError);
      setWarnning(true);
      setTimeout(() => setWarnning(false), 4000);
    }
  };

  const handleLogin = async () => {
    try {
      const url = BASE_URL + "/login";
      const data = { emailId: email, password };
      const res = await axios.post(url, data, { withCredentials: true });

      if (res.status === 200) {
        setShowOtpField(true);
      }
    } catch (error) {
      setError(error.response?.data || "Invalid Credentials");
      setWarnning(true);
      setTimeout(() => setWarnning(false), 3000);
    }
  };

  const handleOtp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/verify-otp",
        { emailId: email, otp },
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.data || res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || "Invalid OTP");
      setWarnning(true);
      setTimeout(() => setWarnning(false), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] w-full px-4">
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl w-full max-w-md p-8 shadow-2xl backdrop-blur-xl relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? "Welcome Back" : "Join DevTinder"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {isLogin ? "Sign in to connect with top developers" : "Create an account to showcase your tech profile"}
          </p>
        </div>

        {warnning && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold p-3 rounded-xl mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {!isLogin && !showOtpField && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Adarsh"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Tiwari"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>
        )}

        {!showOtpField && (
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>
        )}

        {showOtpField && (
          <div className="mt-4">
            <label className="text-xs font-medium text-slate-400 mb-1 block">Enter OTP</label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="123456"
              className="w-full bg-slate-950/60 border border-sky-500/40 rounded-xl px-4 py-3 text-white text-center text-lg font-bold tracking-widest focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        )}

        {!showOtpField ? (
          <div className="mt-6">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="w-full text-center mt-4 text-xs font-medium text-slate-400 hover:text-sky-400 transition-colors"
            >
              {isLogin ? "New to DevTinder? Create an account" : "Already have an account? Sign In"}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={handleOtp}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              Verify OTP & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;