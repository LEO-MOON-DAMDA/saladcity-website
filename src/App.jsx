// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<SaladcityHome />} />
        <Route path="/menu" element={<MenuPage />} /> {/* ✅ 이거 꼭 필요 */}
        </Route>
      </Routes>
    </Router>
  );
}

