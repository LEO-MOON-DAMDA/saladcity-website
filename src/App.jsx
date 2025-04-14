// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SaladcityHome />} />
        <Route path="/menu" element={<MenuPage />} /> {/* ✅ 이거 꼭 필요 */}
      </Routes>
    </Router>
  );
}

