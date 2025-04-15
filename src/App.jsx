// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
// import NotFound from "./components/NotFound"; // (선택) 추후 생성 시 사용

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 공통 레이아웃이 적용되는 페이지 그룹 */}
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* 향후 /mission, /market, /catering 등도 여기에 추가 */}
        </Route>

        {/* 선택: 없는 경로 처리 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
