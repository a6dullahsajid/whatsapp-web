import { createContext, useState, useEffect } from "react";
import { userList } from "../data/userList";
import { chatList } from "../data/chatList";
import Userlist from "../Components/Sidebar/Userlist";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const storedUsers = localStorage.getItem("Users");
  const storedChats = localStorage.getItem("Chats");

  const [activeUserId, setActiveUserId] = useState(0);
  const [users, setUsers] = useState(
    storedUsers ? JSON.parse(storedUsers) : userList,
  );
  const [chats, setChats] = useState(
    storedChats ? JSON.parse(storedChats) : chatList,
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

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === activeUserId
          ? { ...user, lastMessage: text, time: newMessage.time.split(",")[0] }
          : user,
      ),
    );

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeUserId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(users));
    localStorage.setItem("Chats", JSON.stringify(chats));
  }, [users, chats]);

  return (
    <ChatContext.Provider
      value={{
        users,
        chats,
        activeUserId,
        sendMessage,
        setActiveUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
