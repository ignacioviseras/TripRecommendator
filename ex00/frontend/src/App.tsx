import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactMarkdown from "react-markdown";
import flag from 'country-code-emoji';
import './App.css'

type mock = {
  sender: "user" | "backend";
  message: string;
};

function App() {
  // const [resBack, resVal] = useState("");
  // const [user, userVal] = useState("");
  const [messages, messagesVal] = useState<mock[]>([]);
  const [input, inputval] = useState("");

  const addUserMessage = (text: string) => {
    messagesVal((prev) => [
      ...prev,
      {
        sender: "user",
        message: text
      }
    ]);
  };

  // <em>Lat:</em> ${p.location.lat} — <em>Lng:</em> ${p.location.lng}
  const addBackendMessage = (data: any) => {
    let format = "";
    if (data?.sender && data?.data?.places){
      const emojiFlag = flag(p.countryCode || "");
      format = data.data.places.map((p: any) =>
        `
          <strong>
            ${p.countryFlag} - ${p.name}
          </strong>
          <br/>
          ${p.description}
          <br/>
        `
      ).join("<br/><br/>");
    }

    messagesVal((prev) => [
      ...prev,
      {
        sender: data.sender,
        message: format
      }
    ]);
  };

  const sendData = async () => {
    if (!input.trim())
      return
    const msg = input;
    inputval("");
    addUserMessage(msg);
    const body = {
      sender: "user",
      message: msg
    };

    console.log(body);
    const res = await fetch("http://localhost:5555/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(body)
    });

    const data = await res.json();
    addBackendMessage(data)
    console.log("Respuesta backend:", data);
  };

  return (
    <div className="w-full h-screen flex flex-col text-white pt-3">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            {msg.sender === "user" ? (
              <div className="max-w-[75%] p-3 rounded-xl bg-blue-600 break-words text-left">
                {msg.message}
              </div>
            ) : (
              // respuesta del back parseada a html con la funcion addBackendMessage
              <div
                dangerouslySetInnerHTML={{ __html: msg.message}}
                className="max-w-[75%] p-3 rounded-xl bg-gray-800 break-words text-left"
              />
            )}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-3 items-center">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
          placeholder="Escribe un sitio para viajar..."
          onChange={(e) => inputval(e.target.value)}
          onKeyDown={(e) =>{
            if (e.key === "Enter") {
              e.preventDefault();
              sendData();
            }
          }}
        />
        <button
          onClick={sendData}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full font-semibold"
        >
          🡱
        </button>
      </div>

    </div>
  );


}

<style scoped>
  
</style>

export default App
