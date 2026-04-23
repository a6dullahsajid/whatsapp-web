import React from "react";
import { userList } from "../../data/userList";

const Userlist = () => {
  return (
    <ul className="overflow-y-scroll flex gap-1 px-2 flex-col text-black h-[71%]">
      {userList.map((user, index) => {
        return (
          <li
            key={user.id}
            className="w-full flex justify-between items-center  rounded-xl p-4 hover:bg-gray-300/30"
          >
            <div className="flex gap-4">
              <img
                src={user.profileImage}
                alt={user.name}
                className="rounded-full h-12 w-12"
              />
              <div>
                <h3 className="text-lg">{user.name}</h3>
                <p className="text-sm">{user.lastMessage}</p>
              </div>
            </div>
            <div>
              <p>{user.time}</p>
              <p>↓</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Userlist;
