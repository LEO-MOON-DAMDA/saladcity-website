import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner"; // ✅ 원래 로딩 스피너

import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";

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
      <Suspense fallback={<LoadingSpinner />}> {/* ✅ 딱 여기! */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SaladcityHome />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/dashboard/reviews" element={<DashboardReviews />} />

          <Route path="/admin/add-goods" element={<AddGoods />} />
          <Route path="/admin/market-goods" element={<MarketGoodsAdmin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
