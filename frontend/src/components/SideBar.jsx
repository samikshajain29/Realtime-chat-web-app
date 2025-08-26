import React, { useState } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function SideBar() {
  let { userData } = useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center px-[20px]">
        <h1 className="text-white font-bold text-[25px]">Chatify</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px]">
            Hii, {userData.name}
          </h1>
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg">
            <img src={userData.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>
        {!search && (
          <div
            className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center mt-[10px] bg-white items-center shadow-gray-500 shadow-lg"
            onClick={() => setSearch(true)}
          >
            <IoIosSearch className="w-[25px] h-[25px]" />
          </div>
        )}

        {search && (
          <form className="w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] cursor-pointer">
            <IoIosSearch className="w-[25px] h-[25px]" />
            <input
              type="text"
              placeholder="search users..."
              className="w-full h-full p-[10px] text-[17px] outline-0 border-0"
            />
            <RxCross2
              className="w-[25px] h-[25px] cursor-pointer"
              onClick={() => setSearch(false)}
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default SideBar;
