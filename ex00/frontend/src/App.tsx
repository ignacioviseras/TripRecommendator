import { useState, useRef, useEffect } from 'react'
import MapComponent from './MapComponent';
import './App.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";

type mock = {
  sender: "user" | "backend";
  message: string;
  places?: any[];
};

function App() {
  const [messages, messagesVal] = useState<mock[]>([]);
  const [input, inputval] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const addUserMessage = (text: string) => {
    messagesVal((prev) => [
      ...prev,
      {
        sender: "user",
        message: text,
      }
    ]);
  };

  const addBackendMessage = (data: any) => {
    let format = "";
    let places = "";
    if (data?.sender && data?.data?.places){
      places = data.data.places;
      format = data.data.places.map((p: any) => {
        return `
          <span class="fi fi-${p.countryFlag.toLowerCase()}"></span> 
          <strong>
            ${p.name}
          </strong>
          <br/>
          ${p.description}
          <br/>
        `
      }).join("<br/>");
    }

    messagesVal((prev) => [
      ...prev,
      {
        sender: data.sender,
        message: format,
        places: data.data.places
      }
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <div className="max-w-[75%] p-3 rounded-xl bg-gray-800 break-words text-left">
                <div
                  dangerouslySetInnerHTML={{ __html: msg.message}}
                  />
                {msg.places && (
                  <>
                    <div id={`map-container-${index}`} />
                   
                    <MapComponent
                      places={msg.places}
                      />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 flex gap-3 items-center">
        <input
          type="text"
          value={input}
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
//  <MapComponent
//                       places={msg.places}
//                       mapId={`map-${index}`}/>
<style scoped>
  
</style>

export default App
