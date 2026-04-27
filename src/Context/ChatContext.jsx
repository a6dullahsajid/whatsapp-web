import { createContext, useState, useEffect } from "react";
import { userList } from "../data/users";
import Userlist from "../Components/Sidebar/Userlist";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const storedUsers = localStorage.getItem("Users");
  const storedusers = localStorage.getItem("users");

  const [activeUserId, setActiveUserId] = useState(0);
  const [users, setUsers] = useState(
    storedUsers ? JSON.parse(storedUsers) : userList,
  );

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      message: text,
      recieved: false,
      time: `${new Date()
        .toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()}, ${new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
    };

    setUsers((prevusers) =>
      prevusers.map((chat) =>
        chat.id === activeUserId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <ChatContext.Provider
      value={{
        users,
        activeUserId,
        sendMessage,
        setActiveUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
