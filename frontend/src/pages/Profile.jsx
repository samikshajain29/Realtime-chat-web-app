import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [name, setName] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || dp);
  let [backendImage, setBackendImage] = useState(null);

  let image = useRef();
  let [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center gap-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div
        className="fixed top-6 left-6 cursor-pointer z-50 glass p-2 rounded-full hover:bg-white/10 transition-colors"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="w-8 h-8 text-white" />
      </div>

      <div className="z-10 w-full max-w-[450px] glass-panel rounded-3xl p-8 flex flex-col items-center border border-slate-700/50 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
        
        <div
          className="relative group cursor-pointer mb-8"
          onClick={() => image.current.click()}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center border-4 border-indigo-500 shadow-xl shadow-indigo-500/20 bg-slate-800 transition-transform duration-300 group-hover:scale-105">
            <img src={frontendImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex justify-center items-center shadow-lg border-2 border-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500">
            <IoCameraOutline className="w-5 h-5" />
          </div>
        </div>
        
        <form
          className="w-full flex flex-col gap-4 items-center"
          onSubmit={handleProfile}
        >
          <input
            type="file"
            accept="image/*"
            ref={image}
            hidden
            onChange={handleImage}
          />
          <div className="w-full relative">
            <span className="text-xs font-semibold text-indigo-400 absolute -top-2 left-3 bg-slate-800 px-2 rounded">Display Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full h-[52px] outline-none border border-slate-600 bg-slate-800/80 px-5 rounded-xl text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          
          <div className="w-full relative mt-2 opacity-70">
            <span className="text-xs font-semibold text-slate-400 absolute -top-2 left-3 bg-slate-800 px-2 rounded">Username</span>
            <input
              type="text"
              readOnly
              className="w-full h-[52px] outline-none border border-slate-700 bg-slate-800/50 px-5 rounded-xl text-slate-400 cursor-not-allowed"
              value={userData?.userName}
            />
          </div>
          
          <div className="w-full relative mt-2 opacity-70">
            <span className="text-xs font-semibold text-slate-400 absolute -top-2 left-3 bg-slate-800 px-2 rounded">Email Address</span>
            <input
              type="email"
              readOnly
              className="w-full h-[52px] outline-none border border-slate-700 bg-slate-800/50 px-5 rounded-xl text-slate-400 cursor-not-allowed"
              value={userData?.email}
            />
          </div>
          
          <button
            className="w-full h-[52px] bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold text-lg mt-6 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30"
            disabled={saving}
          >
            {saving ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
