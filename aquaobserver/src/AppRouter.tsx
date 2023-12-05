import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import History from "./pages/History";

interface Props {
  children: React.ReactNode;
}

const AppRouter = (props: Props) => {
  return (
    <>
      <Router>
        <div>{props.children}</div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
