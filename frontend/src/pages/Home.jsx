import React from "react";
import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import getMessages from "../customHooks/getMessages";

function Home() {
  let { selectedUser } = useSelector((state) => state.user);
  getMessages();
  return (
    <div className="w-full h-screen flex overflow-hidden bg-slate-900 text-slate-200">
      <SideBar />
      <MessageArea />
    </div>
  );
}

export default Home;
