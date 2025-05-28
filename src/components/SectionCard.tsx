import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ThumbsUp, Edit, CheckCircle } from "lucide-react";
import type { PlanSection } from "../mocks/plan";

interface Props {
  section: PlanSection;
  accepted: boolean;
  onAccept: () => void;
  onEdit: () => void;
}

export default function SectionCard({ section, accepted, onAccept, onEdit }: Props) {
  const Icon = section.icon;
  return (
    <Card className={`rounded-2xl border-0 shadow-md ${section.color}`}>
      <CardContent className="p-6">
        {/* título + ✔︎ si ya está aceptado */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center mr-4">
              <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
          </div>
          {accepted && <CheckCircle className="w-6 h-6 text-green-600" />}
        </div>

        {/* contenido scrollable */}
        <div className="bg-white/50 rounded-xl p-4 mb-6 max-h-44 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 font-sans">
            {section.content}
          </pre>
        </div>

        {/* botones */}
        <div className="flex gap-3">
          <Button
            className={`flex-1 rounded-xl ${accepted ? "bg-green-100 text-green-700" : "bg-white/70 text-gray-800"}`}
            disabled={accepted}
            onClick={onAccept}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            {accepted ? "Aceptado" : "Aceptar"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-xl bg-white/50 border-white/50"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
