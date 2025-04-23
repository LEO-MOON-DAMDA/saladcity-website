import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
import Reviews from "./pages/Reviews";
import MissionPage from "./pages/MissionPage";
import SocialPage from "./pages/SocialPage";
import LocationsPage from "./pages/LocationsPage";
import MarketPage from "./pages/MarketPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import DashboardReviews from "./pages/DashboardReviews";
import AddGoods from "./pages/AddGoods"; // ✅ 관리자 굿즈 등록 페이지

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🧱 Layout 안에 들어가는 메인 페이지들 */}
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/market" element={<MarketPage />} />
        </Route>

        {/* ✅ 감성 단독 페이지들 */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/dashboard/reviews" element={<DashboardReviews />} />

        {/* ✅ 관리자 굿즈 등록 페이지 (단독 페이지!) */}
        <Route path="/admin/add-goods" element={<AddGoods />} />
      </Routes>
    </Router>
  );
}
