import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function SideBar() {
  let { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);
  return (
    <div
      className={`lg:w-[350px] w-full h-full flex flex-col bg-slate-900 border-r border-slate-700/50 relative ${
        !selectedUser ? "block" : "hidden"
      } lg:flex flex-shrink-0 z-20`}
    >
      {/* Logout button */}
      <div
        className="w-12 h-12 rounded-full flex justify-center items-center cursor-pointer absolute bottom-6 left-6 z-50 bg-slate-800 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-lg border border-slate-700"
        onClick={handleLogout}
        title="Logout"
      >
        <BiLogOutCircle className="w-6 h-6" />
      </div>

      {/* Header Profile Section */}
      <div className="w-full h-auto min-h-[140px] bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 flex flex-col justify-end pb-4 px-6 relative shrink-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold text-2xl absolute top-5 left-6 tracking-tight">Chatify</h1>
        
        <div className="w-full flex justify-between items-end mt-12">
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm font-medium">Welcome back,</span>
            <h1 className="text-white font-bold text-xl leading-none mt-1 truncate max-w-[200px]">
              {userData.name || "User"}
            </h1>
          </div>
          <div
            className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center border-2 border-indigo-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Search / Online Users Row */}
      <div className="w-full px-4 py-4 border-b border-slate-800 shrink-0">
        {!search ? (
          <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div
              className="w-14 h-14 shrink-0 rounded-full flex justify-center items-center bg-slate-800 border border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors cursor-pointer"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className="w-6 h-6" />
            </div>

            {otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    key={user._id}
                    className="relative shrink-0 rounded-full cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => dispatch(setSelectedUser(user))}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-700">
                      <img src={user.image || dp} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full absolute bottom-0 right-0 bg-emerald-500 border-2 border-slate-900"></span>
                  </div>
                )
            )}
          </div>
        ) : (
          <form className="w-full h-12 bg-slate-800 border border-slate-700 flex items-center gap-2 rounded-xl px-4 relative transition-all">
            <IoIosSearch className="w-5 h-5 text-indigo-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full h-full bg-transparent text-white text-sm outline-none placeholder-slate-500"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              autoFocus
            />
            <RxCross2
              className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                setSearch(false);
                setInput("");
              }}
            />
          </form>
        )}
      </div>

      {/* Search Results Dropdown */}
      {input.length > 0 && searchData && (
        <div className="absolute top-[220px] left-4 right-4 max-h-[300px] overflow-y-auto bg-slate-800 border border-slate-700 rounded-xl z-50 shadow-2xl flex flex-col py-2">
          {searchData.length === 0 ? (
            <p className="text-slate-400 text-center py-4 text-sm">No users found.</p>
          ) : (
            searchData.map((user) => (
              <div
                key={user._id}
                className="w-full h-[60px] flex items-center gap-4 px-4 hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setInput("");
                  setSearch(false);
                }}
              >
                <div className="relative rounded-full">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={user.image || dp} alt="" className="w-full h-full object-cover" />
                  </div>
                  {onlineUsers?.includes(user._id) && (
                    <span className="w-2.5 h-2.5 rounded-full absolute bottom-0 right-0 bg-emerald-500 border-2 border-slate-800"></span>
                  )}
                </div>
                <h1 className="text-slate-200 font-medium text-sm">
                  {user.name || user.userName}
                </h1>
              </div>
            ))
          )}
        </div>
      )}

      {/* User List */}
      <div className="w-full flex-1 overflow-y-auto flex flex-col gap-1 p-3">
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            className={`w-full h-[72px] flex items-center gap-4 px-3 rounded-xl cursor-pointer transition-all ${
              selectedUser?._id === user._id ? "bg-indigo-600/20 border border-indigo-500/30" : "hover:bg-slate-800/60 border border-transparent"
            }`}
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative rounded-full">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700/50">
                <img src={user.image || dp} alt="" className="w-full h-full object-cover" />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="w-3 h-3 rounded-full absolute bottom-0 right-0 bg-emerald-500 border-2 border-slate-900"></span>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h1 className="text-slate-200 font-semibold text-base truncate">
                {user.name || user.userName}
              </h1>
              {onlineUsers?.includes(user._id) ? (
                <p className="text-emerald-400 text-xs font-medium">Online</p>
              ) : (
                <p className="text-slate-500 text-xs">Offline</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
