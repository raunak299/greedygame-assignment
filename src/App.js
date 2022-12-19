import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/analytics" />} />
      <Route path="/analytics" element={<Home />} />
      <Route path="*" element={<Navigate to="/analytics" />} />
    </Routes>
  );
}

export default App;
