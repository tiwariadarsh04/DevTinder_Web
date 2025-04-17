import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store?.user?.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log("Response is :", chat);

      const chatMessages = chat?.data?.message.map((msg) => {
        const { senderId, text } = msg;
        return { senderId, text };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.log("Error in fetching the user chat message :", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecived", ({ senderId, text }) => {
      // console.log(firstName + " : " + text);
      // setMessages((msg) => msg.push({ firstName, text }));
      setMessages((msg) => [...msg, { senderId, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div className="w-[90%] mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className="flex-1 overflow-scroll p-5">
          {messages?.map((msg, index) => {
            console.log("msg.senderId is :", msg.senderId);
            return (
              <div
                key={index}
                className={
                  "chat " +
                  (userId === msg.senderId ? "chat-end" : "chat-start")
                }
              >
                {/* secondary */}
                {/* chat-bubble-primary */}
                <div
                  className={
                    "chat-bubble " +
                    (userId === msg.senderId
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary")
                  }
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={sendMessage} className="btn btn-success">
            Send
          </button>

          {/* <button className="btn">Button</button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
