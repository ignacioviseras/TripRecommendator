import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [resBack, resVal] = useState("");
  const [user, userVal] = useState("");
  const [input, inputval] = useState("");

  const sendData = async () => {
  const body = {
    name: "Juan",
    message: input
  };
  userVal(input);

  const res = await fetch("http://localhost:5555/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(body)
  });

  const data = await res.json();
  resVal(data.message);
  console.log("Respuesta backend:", data.message);
};


  return (
    <>
      <div>

      <div className="card flex flex-col p-4">
        <div className='ia-message ml-auto'>
          <h2>mensaje front</h2>
          <p>
            {user}
          </p>
        </div>

        <div className='user-message mr-auto'>
          <h2>Respuesta back</h2>
          <p>
            {resBack}
          </p>
        </div>
      </div>
      <div className="card flex flex-col p-4">
        <div className='ia-message ml-auto'>
          <h2>mensaje front</h2>
          <p>
            {user}
          </p>
        </div>

        <div className='user-message mr-auto'>
          <h2>Respuesta back</h2>
          <p>
            {resBack}
          </p>
        </div>
      </div>
      
      </div>
      <div className='text-area'>
        <input
            type="text"
            id="input-text"
            onChange={(e) => inputval(e.target.value)}
            />
        <button onClick={sendData}>Enviar datos</button>
      </div>
    </>
  )
}

<style scoped>
  
</style>

export default App
