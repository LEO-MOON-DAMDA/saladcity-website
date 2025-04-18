import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
import ReviewsPage from "./pages/Reviews";
import MissionPage from "./pages/MissionPage";
import SocialPage from "./pages/SocialPage";
import LocationsPage from "./pages/LocationsPage"; // ✅ 추가

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/locations" element={<LocationsPage />} /> {/* ✅ 연결 */}
        </Route>
      </Routes>
    </Router>
  );
}
