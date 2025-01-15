"use client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import "@/styles/teamChat.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function TeamChat() {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]); // Store tasks
  const [analysisResult, setAnalysisResult] = useState(null); // Store insights
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggle modal
  const [loading, setLoading] = useState(false); // Loading state
  const user = useRef(null);

  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");

  const socket = io("http://localhost:4000");

  const genAI = new GoogleGenerativeAI("AIzaSyC4Gaf5lLcHrpTacOol8xnD4JcRSInQEYM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "project-id": roomId,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [roomId]);

  // Socket setup
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join_room", roomId);

    socket.on("recieve_message", (msg) => {
      if (!user.current) return;
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) =>
        data.typing
          ? [...new Set([...prev, data.user])]
          : prev.filter((u) => u !== data.user)
      );
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

  const analyzeMeetingNotes = async () => {
    const notes = chat.map((message) => message.content).join("\n");
    const taskDescriptions = tasks.map((task) => task.description).join("\n");
    const combinedInput = `Chat Notes (only relevant discussions):\n${notes}\n\nExisting Tasks:\n${taskDescriptions}\n\nPlease provide only actionable insights, excluding any unrelated or off-topic conversations.`;

    setLoading(true);

    try {
      const result = await model.generateContent(combinedInput);
      const response = await result.response;
      setAnalysisResult(response.text()); // Store API response
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error analyzing meeting notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnalysisResult(null);
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Team Meeting</h1>
        {roomId && <p className="text-sm mt-1">Room ID: {roomId}</p>}
      </header>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : user.current ? (
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
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            onClick={analyzeMeetingNotes}
          >
            Analyze Meeting Notes
          </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-md shadow-md w-11/12 max-w-2xl h-auto max-h-[80%] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Actionable Insights</h2>
            <ul>
              {analysisResult
                ? analysisResult.split("\n").map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))
                : "No insights available"}
            </ul>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}



