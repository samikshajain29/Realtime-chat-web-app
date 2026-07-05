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
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-700 mt-auto">
        <img src={selectedUser.image || dp} alt="" className="w-full h-full object-cover" />
      </div>
      <div
        ref={scroll}
        className="w-fit max-w-[75%] md:max-w-[65%] bg-slate-800 px-4 py-3 text-slate-200 text-sm md:text-base rounded-2xl rounded-bl-sm shadow-md flex flex-col gap-2 relative border border-slate-700/50"
      >
        {image && (
          <div className="rounded-lg overflow-hidden border border-slate-700">
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
