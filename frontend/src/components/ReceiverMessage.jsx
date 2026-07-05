import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function ReceiverMessage({ image, message }) {
  let scroll = useRef();
  let { selectedUser } = useSelector((state) => state.user);
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-end justify-start gap-3 w-full group">
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-200 mt-auto">
        <img src={selectedUser?.image || dp} alt="" className="w-full h-full object-cover" />
      </div>
      <div
        ref={scroll}
        className="w-fit max-w-[75%] md:max-w-[65%] bg-white px-4 py-3 text-slate-700 text-sm md:text-base rounded-2xl rounded-bl-none shadow-sm flex flex-col gap-2 relative border border-slate-200"
      >
        {image && (
          <div className="rounded-xl overflow-hidden border border-slate-100">
            <img
              src={image}
              alt="Received content"
              className="w-full max-w-[250px] object-cover"
              onLoad={handleImageScroll}
            />
          </div>
        )}
        {message && <span className="leading-relaxed whitespace-pre-wrap">{message}</span>}
      </div>
    </div>
  );
}

export default ReceiverMessage;
