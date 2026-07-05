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
    <div className="w-full h-screen bg-slate-50 flex flex-col justify-center items-center gap-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blob-teal filter blur-[100px] opacity-80 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blob-sky filter blur-[100px] opacity-80 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div
        className="fixed top-6 left-6 cursor-pointer z-50 glass-card p-2.5 rounded-full hover:bg-slate-100/80 transition-colors shadow-sm"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="w-8 h-8 text-slate-700" />
      </div>

      <div className="z-10 w-full max-w-[440px] glass-card rounded-3xl p-8 flex flex-col items-center border border-white/60 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h1>
        
        <div
          className="relative group cursor-pointer mb-8"
          onClick={() => image.current.click()}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center border-4 border-teal-500 shadow-lg shadow-teal-500/10 bg-slate-100 transition-transform duration-300 group-hover:scale-105">
            <img src={frontendImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-teal-600 text-white flex justify-center items-center shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-teal-500">
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
            <span className="text-xs font-semibold text-teal-600 absolute -top-2 left-3 bg-white px-2 rounded">Display Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full h-[52px] outline-none border border-slate-200 bg-white/90 px-5 rounded-2xl text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          
          <div className="w-full relative mt-2 opacity-80">
            <span className="text-xs font-semibold text-slate-400 absolute -top-2 left-3 bg-white px-2 rounded">Username</span>
            <input
              type="text"
              readOnly
              className="w-full h-[52px] outline-none border border-slate-200 bg-slate-50 px-5 rounded-2xl text-slate-500 cursor-not-allowed shadow-sm"
              value={userData?.userName}
            />
          </div>
          
          <div className="w-full relative mt-2 opacity-80">
            <span className="text-xs font-semibold text-slate-400 absolute -top-2 left-3 bg-white px-2 rounded">Email Address</span>
            <input
              type="email"
              readOnly
              className="w-full h-[52px] outline-none border border-slate-200 bg-slate-50 px-5 rounded-2xl text-slate-500 cursor-not-allowed shadow-sm"
              value={userData?.email}
            />
          </div>
          
          <button
            className="w-full h-[52px] bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 rounded-2xl text-white font-semibold text-base mt-6 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal-600/10"
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
