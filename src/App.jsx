import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
import Reviews from "./pages/Reviews";
import MissionPage from "./pages/MissionPage";
import SocialPage from "./pages/SocialPage";
import LocationsPage from "./pages/LocationsPage";
import MarketPage from "./pages/MarketPage"; // 마켓 페이지
import SuccessPage from "./pages/SuccessPage"; // ✅ 결제 성공 페이지
import CancelPage from "./pages/CancelPage";   // ✅ 결제 취소 페이지
import DashboardReviews from "./pages/DashboardReviews"; // ✅ 내부 리뷰 분석 페이지
import AddGoods from "./pages/AddGoods"; // ✅ 굿즈 등록 관리자 페이지 추가

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/market" element={<MarketPage />} />
        </Route>

        {/* ✅ 결제 완료 / 취소 → 단독 감성 페이지 */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/* ✅ 내부용 리뷰 통계 페이지 */}
        <Route path="/dashboard/reviews" element={<DashboardReviews />} />

        {/* ✅ 굿즈 등록 관리자 페이지 */}
        <Route path="/admin/add-goods" element={<AddGoods />} />
      </Routes>
    </Router>
  );
}
