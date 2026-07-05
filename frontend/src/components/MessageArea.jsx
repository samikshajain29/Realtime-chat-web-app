import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { setSelectedUser } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../main";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { setMessages } from "../redux/messageSlice";
import { getSocket } from "../socket/socketService";

function MessageArea() {
  let { selectedUser, userData, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let messagesEndRef = useRef(null);
  let { messages } = useSelector((state) => state.message);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage == null) {
      return null;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  // Real-time message listener using module ref (not Redux broken proxy)
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMsg) => {
      if (newMsg.sender === selectedUser?._id || newMsg.receiver === selectedUser?._id) {
        dispatch((_, getState) => {
          const currentMessages = getState().message.messages;
          dispatch(setMessages([...currentMessages, newMsg]));
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser, dispatch]);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div
      className={`lg:w-auto flex-1 relative ${
        selectedUser ? "flex" : "hidden"
      } lg:flex w-full h-full bg-slate-50 flex-col`}
    >
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="w-full h-[80px] bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center px-6 gap-4 z-10 shrink-0 shadow-sm">
            <div
              className="lg:hidden cursor-pointer p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <IoIosArrowRoundBack className="w-8 h-8" />
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center border border-slate-100 cursor-pointer">
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-800 font-bold text-lg leading-tight">
                {selectedUser?.name || "User"}
              </h1>
              {isOnline ? (
                <span className="text-teal-600 text-xs font-semibold">Online</span>
              ) : (
                <span className="text-slate-400 text-xs font-medium">Offline</span>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-full flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 relative scroll-smooth scrollbar-hide">
            {showPicker && (
              <div className="absolute bottom-4 left-4 z-50 shadow-xl rounded-2xl overflow-hidden border border-slate-100 bg-white">
                <EmojiPicker
                  width={300}
                  height={400}
                  theme="light"
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
            
            {messages &&
              messages.map((mess) =>
                mess.sender === userData._id ? (
                  <SenderMessage key={mess._id} image={mess.image} message={mess.message} />
                ) : (
                  <ReceiverMessage key={mess._id} image={mess.image} message={mess.message} />
                )
              )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="w-full min-h-[90px] bg-white border-t border-slate-100 flex items-center justify-center px-4 py-4 shrink-0 relative">
            {frontendImage && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <button 
                  type="button"
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition-colors"
                  onClick={() => { setFrontendImage(null); setBackendImage(null); }}
                >
                  <RxCross2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <form
              className="w-full max-w-4xl h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-4 gap-3 transition-all focus-within:border-teal-500/50 focus-within:ring-2 focus-within:ring-teal-500/10 focus-within:bg-white"
              onSubmit={handleSendMessage}
            >
              <div 
                className="p-2 rounded-full hover:bg-slate-200/50 cursor-pointer text-slate-500 hover:text-teal-600 transition-colors"
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <RiEmojiStickerLine className="w-6 h-6" />
              </div>
              
              <input
                type="file"
                accept="image/*"
                ref={image}
                hidden
                onChange={handleImage}
              />
              
              <input
                type="text"
                className="flex-1 h-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm md:text-base px-2"
                placeholder="Type a message..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              
              <div 
                className="p-2 rounded-full hover:bg-slate-200/50 cursor-pointer text-slate-500 hover:text-teal-600 transition-colors"
                onClick={() => image.current.click()}
              >
                <FaImages className="w-6 h-6" />
              </div>
              
              {(input.trim().length > 0 || backendImage != null) && (
                <button 
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 flex justify-center items-center text-white transition-all transform active:scale-95 ml-1 shadow-md shadow-teal-600/15"
                >
                  <RiSendPlane2Fill className="w-5 h-5 -ml-0.5" />
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 relative bg-slate-50">
          {/* Decorative background logo */}
          <div className="absolute w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-sky-500 rounded-3xl flex justify-center items-center shadow-lg shadow-teal-500/10 z-10 rotate-12">
            <RiEmojiStickerLine className="w-12 h-12 text-white -rotate-12" />
          </div>
          
          <div className="text-center z-10">
            <h1 className="text-slate-800 font-extrabold text-3xl tracking-tight mb-2">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Chatify</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-sm mx-auto font-medium">
              Select a conversation from the sidebar or search for a user to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
