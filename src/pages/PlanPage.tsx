
import { useState } from "react";
import { pastelSections, type PlanSection } from "../mocks/plan";
import { Progress } from "../components/ui/Progress";
import { Button } from "../components/ui/button";
import SectionCard from "../components/SectionCard";
import FeedbackModal from "../components/FeedbackModal";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlanPage() {
  const nav = useNavigate();

  /* estado local -------------------------------------------------------- */
  const [sections, setSections] = useState(
    pastelSections.map((s) => ({ ...s, accepted: false }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<PlanSection | null>(null);

  const acceptedCount = sections.filter((s) => s.accepted).length;
  const allDone = acceptedCount === sections.length;

  const handleAccept = (id: string) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, accepted: true } : s))
    );

  const handleEdit = (section: PlanSection) => {
    setSelected(section);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* header --------------------------------------------------------- */}
      <header className="bg-white sticky top-0 border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => nav("/")}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-light text-gray-800">Tu Plan Personalizado</h1>
              <p className="text-sm text-gray-600">Revisa y ajusta cada sección</p>
            </div>
          </div>

          {allDone && (
            <Button
              className="rounded-xl bg-[#D0EFEA] text-gray-800"
              onClick={() => nav("/export")}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalizar Plan
            </Button>
          )}
        </div>
      </header>

      {/* progreso ------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto p-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-800">Progreso de revisión</h3>
            <span className="text-sm text-gray-600">
              {acceptedCount} / {sections.length} secciones
            </span>
          </div>
          <Progress value={(acceptedCount / sections.length) * 100} className="h-2" />
        </div>

        {/* grid de secciones ------------------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((s) => (
            <SectionCard
              key={s.id}
              section={s}
              accepted={s.accepted}
              onAccept={() => handleAccept(s.id)}
              onEdit={() => handleEdit(s)}
            />
          ))}
        </div>
      </section>

      {/* modal --------------------------------------------------------- */}
      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        section={selected}
      />
    </div>
  );
}
