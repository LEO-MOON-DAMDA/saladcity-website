import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./components/MenuPage";
import SaladcityHome from "./SaladcityHome"; // 기존 홈화면 컴포넌트

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SaladcityHome />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}
