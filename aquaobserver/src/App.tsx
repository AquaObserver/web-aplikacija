import { useState } from "react";
import AppRouter from "./AppRouter";
import "./index.css";
import TitleBar from "./components/TitleBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRouter>
        <TitleBar></TitleBar>
      </AppRouter>
    </>
  );
}

export default App;
