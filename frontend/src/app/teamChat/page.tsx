"use client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import "@/styles/teamChat.css";

export default function TeamChat() {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");
  const user = useRef(null);

  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");

  const socket = io("http://localhost:4000");

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join_room", roomId);

    socket.on("recieve_message", (msg) => {
      if (!user.current) return;
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server" },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("send_message", input, roomId);
      setInput("");
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Team Meeting</h1>
        {roomId && <p className="text-sm mt-1">Room ID: {roomId}</p>}
      </header>
      {user.current ? (
        <div className="flex flex-col flex-grow mt-6 rounded-md bg-white shadow-md p-4">
          <Chat user={user.current} chat={chat} typing={typing} />
          <Inputs
            setChat={setChat}
            user={user.current}
            socket={socket}
            sendMessage={sendMessage}
            input={input}
            setInput={setInput}
            roomId={roomId}
          />
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <SignUp
              user={user}
              socket={socket}
              input={input}
              setInput={setInput}
              roomId={roomId}
            />
          </div>
        </div>
      )}
    </main>
  );
}
