// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 공통 레이아웃을 적용할 라우트 그룹 */}
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} /> {/* ✅ 메뉴 페이지 연결 */}
        </Route>
      </Routes>
    </Router>
  );
}
