import "./App.css";

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
  );
}

export default App;
