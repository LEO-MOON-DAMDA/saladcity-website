import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; // ✅ 추가

import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

// ✅ lazy 로딩으로 변경
const Reviews = lazy(() => import("./pages/Reviews"));
const MissionPage = lazy(() => import("./pages/MissionPage"));
const SocialPage = lazy(() => import("./pages/SocialPage"));
const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const MarketPage = lazy(() => import("./pages/MarketPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const CancelPage = lazy(() => import("./pages/CancelPage"));
const DashboardReviews = lazy(() => import("./pages/DashboardReviews"));
const AddGoods = lazy(() => import("./pages/AddGoods"));
const MarketGoodsAdmin = lazy(() => import("./pages/MarketGoodsAdmin"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));

export default function App() {
  return (
    <Router>
      {/* ✅ Suspense로 감싸기 */}
      <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="/shop" element={<Shop />} /> {/* ✅ 사용자 쇼핑 페이지 */}
            <Route path="/cart" element={<Cart />} /> {/* ✅ 장바구니 */}
          </Route>

          {/* ✅ 감성 단독 페이지들 */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/dashboard/reviews" element={<DashboardReviews />} />

          {/* ✅ 관리자 페이지들 (Layout 없이 단독으로) */}
          <Route path="/admin/add-goods" element={<AddGoods />} />
          <Route path="/admin/market-goods" element={<MarketGoodsAdmin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
