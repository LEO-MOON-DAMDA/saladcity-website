// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import AdminLayout from "../components/AdminLayout";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminHome = lazy(() => import("../pages/AdminHome"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminOutpostApplications = lazy(() => import("../pages/AdminOutpostApplications"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const AdminStoresPage = lazy(() => import("../pages/AdminStoresPage"));
const AddGoods = lazy(() => import("../pages/AddGoods"));
const MarketGoodsAdmin = lazy(() => import("../pages/MarketGoodsAdmin"));
const ReviewTools = lazy(() => import("../pages/admin/ReviewTools_v5"));
const DashboardReviews = lazy(() => import("../pages/admin/DashboardReviews"));
const ReviewStatsPage = lazy(() => import("../pages/admin/ReviewStatsPage"));
const MissingResponsePage = lazy(() => import("../pages/admin/MissingResponsePage"));
const AdminLeadsPage = lazy(() => import("../pages/AdminLeadsPage"));
const AdminCoveragePage = lazy(() => import("../pages/AdminCoveragePage"));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route element={<AdminLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminHome />
            </Suspense>
          }
        />
        <Route
          path="outpost-applications"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminOutpostApplications />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboardPage />
            </Suspense>
          }
        />
        <Route
          path="stores"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminStoresPage />
            </Suspense>
          }
        />
        <Route
          path="add-goods"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddGoods />
            </Suspense>
          }
        />
        <Route
          path="market-goods"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MarketGoodsAdmin />
            </Suspense>
          }
        />
        <Route
          path="tools"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ReviewTools />
            </Suspense>
          }
        />
        <Route
          path="reviews/dashboard"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardReviews />
            </Suspense>
          }
        />
        <Route
          path="reviews/stats"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ReviewStatsPage />
            </Suspense>
          }
        />
        <Route
          path="reviews/missing-responses"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MissingResponsePage />
            </Suspense>
          }
        />
        <Route
          path="leads"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLeadsPage />
            </Suspense>
          }
        />
<Route
  path="coverage"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <AdminCoveragePage />
    </Suspense>
  }
/>

      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
