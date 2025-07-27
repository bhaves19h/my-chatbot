
import { useState } from "react";
import "./styles.css";


function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse("❌ Error: " + data.error);
      }
    } catch (err) {
      setResponse("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="app">
      <link rel="shortcut icon" href="./public/favicon.ico" type ="image/x-icon"></link>
      
      <h1 className="title">🧠AI Assistant</h1>

      <div className="chat-box">
        <textarea
          className="input-area"
          placeholder="Ask something like: What's the capital of France?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      <div className="response-area">
        <strong>Response:</strong>
        <p>{response || "No response yet."}</p>
      </div>
    </div>
  );
}

export default App;
