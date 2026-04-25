import React, { useState, useRef, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import ChatDefaultScreen from "./ChatDefaultScreen";

const ChatSection = () => {
  const { users, chats, activeUserId, sendMessage } = useContext(ChatContext);
  const activeUser = users.find((user) => user.id === activeUserId);
  const messagesEnd = useRef(null);

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setTyping(true);

    clearTimeout(window.typingTimeout);

    window.typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 500);
  };

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats.find((chat) => chat.id === activeUserId), typing]);

  return (
    <>
      {activeUserId === 0 ? (
        <ChatDefaultScreen />
      ) : (
        <section className="w-[65%] h-screen chat-bg">
          <header className="sticky top-0 shadow flex items-center justify-between bg-white text-black px-4 py-3">
            <div className="flex items-center gap-3">
              <div>
                <img
                  src={activeUser?.profileImage}
                  alt=""
                  className="rounded-full w-10 h-10"
                />
              </div>
              <div>{activeUser?.name}</div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center rounded-full border-gray-300 gap-2 border px-4 py-2">
                <div className="text-sm">
                  <VideoIcon />
                </div>
                <div className="text-sm font-semibold">Call</div>
                <div>
                  <DownArrow />
                </div>
              </div>
              <div className="rounded-full p-2 hover:bg-gray-300/30">
                <SearchIcon />
              </div>
              <div className="rounded-full p-2 hover:bg-gray-300/30">
                <TripleDot />
              </div>
            </div>
          </header>
          {/* Messages */}
          <div className="flex flex-col overflow-y-scroll h-[595px] gap-2 py-2 px-12">
            {chats.map((chat, index) => {
              if (chat.id === activeUser.id) {
                return chat.messages.map((msg, index) => {
                  if (msg.recieved) {
                    return (
                      <div key={index} className="w-full flex">
                        {/* Recieved Message  */}
                        <div className="flex gap-1 relative bg-white rounded-md rounded-tl-none px-2 py-1 max-w-[50%] w-fit min-w-[16%]">
                          <div className="w-2 h-2 absolute -left-1.5 top-0  rotate-90 bg-gradient-to-br from-white from-50% to-transparent to-50%"></div>
                          <div className="w-fit text-sm">{msg.message}</div>
                          <div className="flex gap-0.5 items-end text-xs text-iconcolor">
                            <div className="whitespace-nowrap">
                              {msg.time.split(",")[0]}
                            </div>
                            <div className="pb-0.5">
                              <DoubleTick />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="w-full flex justify-end ">
                        {/* Sent Message  */}
                        <div className="flex gap-1 relative max-w-[50%] min-w-[5%] bg-elementBg rounded-md rounded-tr-none py-1 px-2 text-sm">
                          <div className="w-2 h-2 absolute -right-1.5 top-0  rotate-0 bg-gradient-to-br from-elementBg from-50% to-transparent to-50%"></div>
                          <div className="w-fit  text-sm">{msg.message}</div>
                          <div className="flex gap-0.5 items-end text-xs text-iconcolor">
                            <div className="whitespace-nowrap">
                              {msg.time.split(",")[0]}
                            </div>
                            <div className="pb-0.5">
                              <DoubleTick />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                });
              }
            })}
            {typing && (
              <div className="w-full flex justify-end">
                <div className="flex gap-1 relative max-w-[50%] min-w-[5%] bg-elementBg rounded-md rounded-tr-none py-1 px-2 text-sm">
                  <div className="w-2 h-2 absolute -right-1.5 top-0  rotate-0 bg-gradient-to-br from-elementBg from-50% to-transparent to-50%"></div>
                  <div className="w-fit text-iconcolor text-sm">Typing...</div>
                </div>
              </div>
            )}
            <div ref={messagesEnd}></div>
          </div>
          <footer className="bottom-0 w-full p-2">
            <div className="relative flex">
              <div className="absolute flex top-2 left-2">
                <div className="rounded-full p-1.5 hover:bg-iconcolor/10 transition-all duration-200">
                  <AddIcon />
                </div>
                <div className="rounded-full p-1.5 hover:bg-iconcolor/10 transition-all duration-200">
                  <EmojiIcon />
                </div>
              </div>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => handleTyping(e)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-white flex w-full text-sm rounded-full p-4 pl-24 items-center focus:outline-none"
              />
              <div className="absolute right-2 top-1.5">
                {message.length === 0 ? (
                  <div className="rounded-full p-2 hover:bg-primary hover:text-white transition-all duration-200">
                    <MicIcon />
                  </div>
                ) : (
                  <div
                    onClick={handleSend}
                    className="rounded-full p-2 bg-primary text-white transition-all duration-200"
                  >
                    <SendIcon />
                  </div>
                )}
              </div>
            </div>
          </footer>
        </section>
      )}
    </>
  );
};

const TripleDot = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="currentColor"
    >
      <title>ic-more-vert</title>
      <path
        d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="currentColor"
    >
      <title>ic-search</title>
      <path
        d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const VideoIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      className="x14ug900 x1qx5ct2 xw4jnvo"
      fill="currentColor"
    >
      <title>ic-videocam</title>
      <path
        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const DownArrow = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      className="x14ug900 x1qx5ct2 xw4jnvo"
      fill="currentColor"
    >
      <title>ic-arrow-drop-down</title>
      <path
        d="M11.475 14.475L7.85001 10.85C7.80001 10.8 7.76251 10.7458 7.73751 10.6875C7.71251 10.6292 7.70001 10.5667 7.70001 10.5C7.70001 10.3667 7.74585 10.25 7.83751 10.15C7.92918 10.05 8.05001 10 8.20001 10H15.8C15.95 10 16.0708 10.05 16.1625 10.15C16.2542 10.25 16.3 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4417 14.5583 12.3583 14.6167 12.275 14.65C12.1917 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6417 14.6167 11.5583 14.5583 11.475 14.475Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const DoubleTick = () => {
  return (
    <svg
      viewBox="0 0 16 11"
      height="9"
      width="13"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="none"
    >
      <title>msg-dblcheck</title>
      <path
        d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const AddIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="none"
    >
      <title>Attach</title>
      <path
        d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const EmojiIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="currentColor"
    >
      <title>emoji</title>
      <path
        d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z"
        fill="currentColor"
      ></path>
      <path
        d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const MicIcon = () => {
  return (
    <span
      data-testid="mic-outlined"
      aria-hidden="true"
      data-icon="mic-outlined"
      className="xxk0z11 xvy4d1p"
    >
      <svg
        viewBox="0 0 24 24"
        height="24"
        width="24"
        preserveAspectRatio="xMidYMid meet"
        className=""
      >
        <title>mic</title>
        <path
          d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"
          fill="currentColor"
        ></path>
      </svg>
    </span>
  );
};

const SendIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      fill="none"
    >
      <title>send</title>
      <path
        d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default ChatSection;
