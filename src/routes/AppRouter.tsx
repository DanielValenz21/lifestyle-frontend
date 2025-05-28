// src/routes/AppRouter.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Usa alias “@/” si lo tienes configurado:
import DashboardPage  from "../pages/DashboardPage";
import ObjectivesPage from "../pages/ObjectivesPage";
import PlanPage       from "../pages/PlanPage";
import ExportPage     from "../pages/ExportPage";
import HistoryPage    from "../pages/HistoryPage";
import LoginPage      from "../pages/LoginPage";

const AppRouter: React.FC = () => (
  <Routes>
    {/* Auth --------------------------------------------------------- */}
    <Route path="/login" element={<LoginPage />} />

    {/* Dashboard (lista de planes) ---------------------------------- */}
    <Route path="/" element={<DashboardPage />} />

    {/* Crear plan (form objetivos) ---------------------------------- */}
    <Route path="/new-plan" element={<ObjectivesPage />} />

    {/* Flujo de un plan concreto ------------------------------------ */}
    {/*   └─ /plans/:id  --> revisión / aceptar secciones */}
    {/*   └─ /plans/:id/export --> pantalla de exportación */}
    <Route path="/plans/:id" element={<PlanPage />} />
    <Route path="/plans/:id/export" element={<ExportPage />} />

    {/* Histórico global o de un plan ------------------------------- */}
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/plans/:id/history" element={<HistoryPage />} />

    {/* Fallback → login -------------------------------------------- */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRouter;
