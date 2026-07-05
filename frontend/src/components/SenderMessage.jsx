import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function SenderMessage({ image, message }) {
  let scroll = useRef();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-end justify-end gap-3 w-full group">
      <div
        ref={scroll}
        className="w-fit max-w-[75%] md:max-w-[65%] bg-gradient-to-r from-teal-600 to-sky-600 px-4 py-3 text-white text-sm md:text-base rounded-2xl rounded-br-sm shadow-md flex flex-col gap-2 relative"
      >
        {image && (
          <div className="rounded-xl overflow-hidden border border-teal-500/30">
            <img
              src={image}
              alt="Sent content"
              className="w-full max-w-[250px] object-cover"
              onLoad={handleImageScroll}
            />
          </div>
        )}
        {message && <span className="leading-relaxed whitespace-pre-wrap">{message}</span>}
      </div>
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-200 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <img src={userData?.image || dp} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default SenderMessage;
