import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import History from "./pages/History";
import ChangeDatePage from "./pages/ChosenDatePage";
import ChosenDatePage from "./pages/ChosenDatePage";
import Calibration from "./components/Calibration";

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
          <Route path="/chosen-date/:date" element={<ChosenDatePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
