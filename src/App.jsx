import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
import ReviewsPage from "./pages/Reviews";
import MissionPage from "./pages/MissionPage";
import SocialPage from "./pages/SocialPage"; // ✅ 추가

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SaladcityHome />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/social" element={<SocialPage />} /> {/* ✅ 추가 */}
        </Route>
      </Routes>
    </Router>
  );
}

