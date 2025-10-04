import React from "react";
import dp from "../assets/dp.webp";

function SenderMessage() {
  return (
    <div className="w-fit max-w-[500px] bg-[rgb(23,151,194)] px-[20px] py-[10px] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-[10px] flex flex-col">
      <img src={dp} alt="" className="w-[150px] rounded-lg" />
      <span>Hii</span>
    </div>
  );
}

export default SenderMessage;
