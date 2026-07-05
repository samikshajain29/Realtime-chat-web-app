import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";

function Login() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-[450px] glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10 border border-slate-700/50">
        <div className="w-full py-10 flex flex-col items-center justify-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 mt-2">Login to your <span className="text-indigo-400 font-semibold">Chatify</span> account</p>
        </div>
        
        <form
          className="w-full px-8 pb-10 flex flex-col gap-5 items-center"
          onSubmit={handleLogin}
        >
          <div className="w-full relative group">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[52px] outline-none border border-slate-600 bg-slate-800/50 px-5 rounded-xl text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          
          <div className="w-full relative group">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Password"
              className="w-full h-[52px] outline-none border border-slate-600 bg-slate-800/50 px-5 pr-12 rounded-xl text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 right-4 text-sm text-indigo-400 font-medium cursor-pointer hover:text-indigo-300 transition-colors select-none"
              onClick={() => setShow((prev) => !prev)}
            >
              {`${show ? "Hide" : "Show"}`}
            </span>
          </div>

          {err && <p className="text-rose-400 text-sm font-medium w-full text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{err}</p>}
          
          <button
            className="w-full h-[52px] bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold text-lg mt-2 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : "Sign in"}
          </button>
          
          <p className="text-slate-400 mt-4 text-sm">
            Don't have an account?{" "}
            <span 
              className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 transition-colors" 
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
