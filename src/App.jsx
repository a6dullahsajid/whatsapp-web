import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import ChatSection from "./Components/ChatWindow/ChatSection.jsx";

const App = () => {

  return (
    <main className="w-full flex">
      <Sidebar />
      <ChatSection />
    </main>
  );
};

export default App;
