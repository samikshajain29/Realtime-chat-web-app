import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Signup() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/profile");
      setUserName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blob-teal filter blur-[100px] opacity-80 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blob-sky filter blur-[100px] opacity-80 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-[440px] glass-card rounded-3xl flex flex-col overflow-hidden relative z-10 p-8 border border-white/60">
        <div className="w-full pb-8 flex flex-col items-center justify-center relative">
          <div className="absolute top-[-32px] left-[-32px] right-[-32px] h-[5px] bg-gradient-to-r from-teal-400 to-sky-400"></div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Join <span className="text-teal-600 font-semibold">Chatify</span> today</p>
        </div>
        
        <form
          className="w-full flex flex-col gap-5 items-center"
          onSubmit={handleSignup}
        >
          <div className="w-full relative group">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[52px] outline-none border border-slate-200 bg-white/90 px-5 rounded-2xl text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 shadow-sm"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>

          <div className="w-full relative group">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[52px] outline-none border border-slate-200 bg-white/90 px-5 rounded-2xl text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 shadow-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          
          <div className="w-full relative group">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Password"
              className="w-full h-[52px] outline-none border border-slate-200 bg-white/90 px-5 pr-12 rounded-2xl text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 right-4 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer select-none"
              onClick={() => setShow((prev) => !prev)}
            >
              {`${show ? "Hide" : "Show"}`}
            </span>
          </div>

          {err && <p className="text-rose-600 text-xs font-medium w-full text-center bg-rose-50 py-2.5 rounded-2xl border border-rose-100">{err}</p>}
          
          <button
            className="w-full h-[52px] bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 rounded-2xl text-white font-semibold text-base mt-2 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal-600/10"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : "Sign up"}
          </button>
          
          <p className="text-slate-500 mt-4 text-sm">
            Already have an account?{" "}
            <span 
              className="text-teal-600 font-semibold cursor-pointer hover:text-teal-500 transition-colors" 
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
