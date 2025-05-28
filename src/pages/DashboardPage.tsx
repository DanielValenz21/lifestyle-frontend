// src/pages/DashboardPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { Plus, Eye, Calendar, Target } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
import { Badge } from "../components/ui/badge";

/* -------------------------------------------------------------------------- */
/*  Tipos y mock data                                                         */
/* -------------------------------------------------------------------------- */

export type PlanStatus = "Activo" | "En progreso" | "Completado" | "Pausado";

interface Plan {
  id: string;
  title: string;
  date: string;
  status: PlanStatus;
  snippet: string;
  sections: number; // n.º de secciones (mock)
}

const mockPlans: Plan[] = [
  {
    id: "1",
    title: "Plan Personalizado",
    date: "27 may 2025",
    status: "En progreso",
    snippet: "Plan personalizado basado en tus objetivos específicos…",
    sections: 5,
  },
  {
    id: "2",
    title: "Plan Integral 2024",
    date: "15 Ene 2024",
    status: "Activo",
    snippet: "Plan completo enfocado en crecimiento profesional y bienestar personal…",
    sections: 5,
  },
  {
    id: "3",
    title: "Objetivos Q1",
    date: "8 Ene 2024",
    status: "En progreso",
    snippet: "Metas trimestrales con enfoque en productividad y salud física…",
    sections: 5,
  },
  {
    id: "4",
    title: "Rutina de Bienestar",
    date: "2 Ene 2024",
    status: "Completado",
    snippet: "Rutina diaria de meditación, ejercicio y alimentación balanceada…",
    sections: 5,
  },
];

/* Utilidad para colores del badge */
function badgeClasses(status: PlanStatus) {
  switch (status) {
    case "Activo":
      return "bg-[#D0EFEA] text-emerald-700 hover:bg-[#D0EFEA]";
    case "En progreso":
      return "bg-[#CCE7E8] text-cyan-700 hover:bg-[#CCE7E8]";
    case "Completado":
      return "bg-[#F2C1D1] text-pink-700 hover:bg-[#F2C1D1]";
    default:
      return "bg-gray-200 text-gray-600 hover:bg-gray-200";
  }
}

/* -------------------------------------------------------------------------- */
/*  Componente                                                                */
/* -------------------------------------------------------------------------- */

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const activeCount = mockPlans.filter((p) => p.status === "Activo").length;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* ---------- HEADER ---------- */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-light text-gray-800 flex items-center gap-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2C1D1] to-[#E3D4ED] flex items-center justify-center">
              {/* ícono decorativo */}
              <span className="w-3 h-3 bg-white rounded-full" />
            </span>
            Mis Planes
          </h1>

          <Button
            className="rounded-xl bg-[#D0EFEA] hover:bg-[#C1E9E3] text-gray-800 shadow-md transition-all duration-300 hover:scale-[1.03]"
            onClick={() => navigate("/new-plan")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear nuevo plan
          </Button>
        </div>
      </header>

      {/* ---------- RESUMEN ---------- */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <p className="text-gray-600">
          Bienvenido de vuelta
          <br />
          <span className="text-sm">Tienes {activeCount} planes activos</span>
        </p>
      </section>

      {/* ---------- LISTA DE PLANES ---------- */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPlans.map((plan, index) => (
            <Card
              key={plan.id}
              /* animación de aparición opcional */
              className="rounded-2xl border-0 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              style={{ animation: `fadeInUp 0.4s ease forwards`, animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* título + badge */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{plan.title}</h3>
                  <Badge className={badgeClasses(plan.status)}>{plan.status}</Badge>
                </div>

                {/* snippet */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{plan.snippet}</p>

                {/* meta (fecha / secciones) */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {plan.date}
                  </span>
                  <span className="flex items-center">
                    <Target className="w-3 h-3 mr-1" />
                    {plan.sections} secciones
                  </span>
                </div>

                {/* botón */}
                <Button
                  variant="outline"
                  className="mt-auto w-full rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => navigate(`/plans/${plan.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
