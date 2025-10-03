import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function MessageArea() {
  let { selectedUser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <div
      className={`lg:w-[70%] ${
        selectedUser ? "flex" : "hidden"
      } lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}
    >
      {selectedUser && (
        <div className="w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[20px] gap-[20px]">
          <div
            className=" cursor-pointer"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
          </div>
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg cursor-pointer">
            <img src={selectedUser?.image || dp} alt="" className="h-[100%]" />
          </div>
          <h1 className="text-white font-semibold text-[20px]">
            {selectedUser?.name || "user"}
          </h1>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px] ">
            Welcome to Chatify
          </h1>
          <span className="text-gray-700 font-semibold text-[30px] ">
            Chat Friendly !
          </span>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
