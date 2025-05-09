import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import SaladcityHome from "./SaladcityHome";
import MenuPage from "./components/MenuPage";
import ScrollToTop from "./components/ScrollToTop"; // ✅ 추가
import { useState, useEffect } from "react";
import { supabaseMenu } from './utils/supabaseMenuClient';
import { supabaseOutpost } from './utils/supabaseOutpostClient';
import ReviewTools from "./pages/admin/ReviewTools_v5"; // 👉 수집/업로드 도구
import DashboardReviews from "./pages/admin/DashboardReviews";
import ReviewStatsPage from "./pages/admin/ReviewStatsPage"; // 👉 통계 페이지
import MissingResponsePage from "./pages/admin/MissingResponsePage"; // 👉 답변 없는 리뷰 전용
import AdminRoutes from "./routes/AdminRoutes"; // 🔼 상단 import 추가
import OutpostGroupSummary from "./pages/OutpostGroupSummary";
import OutpostQuestionnaire_QA from "./pages/OutpostQuestionnaire_QA";
import OutpostGroupFlow_QA from "./pages/OutpostGroupFlow_QA";

const Reviews = lazy(() => import("./pages/Reviews"));
const MissionPage = lazy(() => import("./pages/MissionPage"));
const SocialPage = lazy(() => import("./pages/SocialPage"));
const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const MarketPage = lazy(() => import("./pages/MarketPage"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const CancelPage = lazy(() => import("./pages/CancelPage"));
const AddGoods = lazy(() => import("./pages/AddGoods"));
const MarketGoodsAdmin = lazy(() => import("./pages/MarketGoodsAdmin"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const OutpostStart = lazy(() => import("./pages/OutpostStart"));
const OutpostSingleFlow = lazy(() => import("./pages/OutpostSingleFlow"));
const OutpostGroupFlow = lazy(() => import("./pages/OutpostGroupFlow"));
const OutpostJoin = lazy(() => import("./pages/OutpostJoin"));
const OutpostSummary = lazy(() => import("./pages/OutpostSummary"));
const OutpostPayment = lazy(() => import("./pages/OutpostPayment"));
const OutpostComplete = lazy(() => import("./pages/OutpostComplete"));
const OutpostSuccessPage = lazy(() => import("./pages/OutpostSuccessPage"));
const OutpostQuestionnaire = lazy(() => import("./pages/OutpostQuestionnaire"));


const AdminHome = lazy(() => import("./pages/AdminHome"));
const AdminOutpostApplications = lazy(() => import("./pages/AdminOutpostApplications"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminStoresPage = lazy(() => import("./pages/AdminStoresPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabaseOutpost.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);
    };

    restoreSession();

    const { data: listener } = supabaseOutpost.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  
  return (
    <Router>
      <ScrollToTop /> {/* ✅ Router 바로 안에 삽입 */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
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

              <Route path="/outpost" element={<OutpostStart />} />
              <Route path="/outpost/start" element={<OutpostStart />} />
              <Route path="/outpost/single" element={<OutpostSingleFlow />} />
              <Route path="/outpost/group-flow" element={<OutpostGroupFlow />} />
              <Route path="/outpost/join" element={<OutpostJoin />} />
              <Route path="/outpost/summary" element={<OutpostSummary />} />
              <Route path="/outpost/payment" element={<OutpostPayment />} />
              <Route path="/outpost/complete" element={<OutpostComplete />} />
              <Route path="/outpost/success" element={<OutpostSuccessPage />} />
              <Route path="/outpost/questionnaire" element={<OutpostQuestionnaire />} />
  	  <Route path="/outpost/questionnaire-qa" element={<OutpostQuestionnaire_QA />} />
	  <Route path="/outpost/groupflow-qa" element={<OutpostGroupFlow_QA />} />	
	  <Route path="/outpost/group-summary" element={<OutpostGroupSummary />} />


	  <Route path="*" element={<NotFoundPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/dashboard/reviews" element={<DashboardReviews />} />
              
             <Route path="/admin/*" element={<AdminRoutes />} />  // 🔽 추가
	

   
        </Route> 

          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
