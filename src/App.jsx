// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 공통 레이아웃을 사용하는 페이지들 */}
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />     {/* 홈 */}
          <Route path="/menu" element={<MenuPage />} />      {/* 메뉴 페이지 */}
        </Route>

        {/* 추후 404 페이지 만들 경우 대비 (선택) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
