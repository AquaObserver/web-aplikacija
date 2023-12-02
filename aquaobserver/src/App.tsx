import { useState } from "react";
import AppRouter from "./AppRouter";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
