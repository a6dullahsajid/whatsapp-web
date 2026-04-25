import React from "react";
import { userList } from "../../data/userList";

import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";

const Userlist = () => {
  const { users, activeUserId, setActiveUserId } = useContext(ChatContext);
  const messageFormat = (text) => {
    if (text.length <= 25) return text;
    return text.slice(0, 22) + "...";
  };
  return (
    <ul className="overflow-y-scroll flex gap-1 px-2 flex-col text-black h-4/5 md:h-[70%]">
      {users.map((user, index) => {
        return (
          <li
            onClick={() => setActiveUserId(user.id)}
            key={user.id}
            className={`w-full flex justify-between items-center group rounded-xl px-4 py-3 cursor-pointer 
${activeUserId === user.id ? "bg-iconcolor/5" : ""} 
hover:bg-iconcolor/5 transition-all duration-200`}
          >
            <div className="flex gap-4">
              <img
                src={user.profileImage}
                alt={user.name}
                className="rounded-full h-12 w-12"
              />
              <div>
                <h3 className="text-md">{user.name}</h3>
                <p className="text-sm text-iconcolor whitespace-pre-line">
                  {messageFormat(user.lastMessage)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start gap-2 h-full">
              <p className="text-xs text-iconcolor whitespace-nowrap">
                {user.time}
              </p>
              <p className="opacity-0 text-iconcolor group-hover:opacity-100 transition-all duration-200">
                <DownArrow />
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const DownArrow = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="currentColor"
    >
      <title>ic-expand-more</title>
      <path
        d="M12 14.95C11.8667 14.95 11.7417 14.9292 11.625 14.8875C11.5083 14.8459 11.4 14.775 11.3 14.675L6.7 10.075C6.51667 9.89169 6.425 9.65836 6.425 9.37502C6.425 9.09169 6.51667 8.85836 6.7 8.67502C6.88334 8.49169 7.11667 8.40002 7.4 8.40002C7.68334 8.40002 7.91667 8.49169 8.1 8.67502L12 12.575L15.9 8.67502C16.0833 8.49169 16.3167 8.40002 16.6 8.40002C16.8833 8.40002 17.1167 8.49169 17.3 8.67502C17.4833 8.85836 17.575 9.09169 17.575 9.37502C17.575 9.65836 17.4833 9.89169 17.3 10.075L12.7 14.675C12.6 14.775 12.4917 14.8459 12.375 14.8875C12.2583 14.9292 12.1333 14.95 12 14.95Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default Userlist;
