import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) string += "0123456789";
    if (char) string += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string[char];
    }
    setPassword(pass);
    // console.log(pass);
  }, [length, num, char]);

  useEffect(() => {
    passwordGenerator();
  }, [num, length, char, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1 style={{ color: "whitesmoke", position: "relative", left: "145px" }}>
        Password Generator
      </h1>
      <div
        className="container"
        style={{
          width: "600px",
          height: "100px",
          backgroundColor: "blueviolet",
        }}
      >
        <div className="row1">
          <input className="size1" ref={passRef} value={password} />
          <button onClick={copyToClipboard} className="size2">
            Copy
          </button>
        </div>
        <div className="row2">
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={8}
            max={12}
          />
          <span>Length({length})</span>
          <input type="checkbox" onChange={() => setNum((prev) => !prev)} />
          <span>Numbers</span>
          <input type="checkbox" onChange={() => setChar((prev) => !prev)} />
          <span>Characters</span>
        </div>
      </div>
    </>
  );
}

export default App;
