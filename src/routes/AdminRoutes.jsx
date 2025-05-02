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

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <AdminLogin />
        </Suspense>
      } />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminHome />
          </Suspense>
        } />
        <Route path="/admin/outpost-applications" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOutpostApplications />
          </Suspense>
        } />
        <Route path="/admin/dashboard" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboardPage />
          </Suspense>
        } />
        <Route path="/admin/stores" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoresPage />
          </Suspense>
        } />
        <Route path="/admin/add-goods" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AddGoods />
          </Suspense>
        } />
        <Route path="/admin/market-goods" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MarketGoodsAdmin />
          </Suspense>
        } />
        <Route path="/admin/tools" element={
          <Suspense fallback={<LoadingSpinner />}>
            <ReviewTools />
          </Suspense>
        } />
        <Route path="/admin/reviews/dashboard" element={
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardReviews />
          </Suspense>
        } />
        <Route path="/admin/reviews/stats" element={
          <Suspense fallback={<LoadingSpinner />}>
            <ReviewStatsPage />
          </Suspense>
        } />
        <Route path="/admin/reviews/missing-responses" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MissingResponsePage />
          </Suspense>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
