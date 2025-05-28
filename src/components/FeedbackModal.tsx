import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Sparkles } from "lucide-react";
import type { PlanSection } from "../mocks/plan";
import { useState, type SetStateAction } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  section: PlanSection | null;
}

export default function FeedbackModal({ open, onClose, section }: Props) {
  const [comment, setComment] = useState("");

  if (!section) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-0 shadow-xl max-w-6xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-gray-800">
            ¿Qué te gustaría ajustar en "{section.title}"?
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
          {/* bloque original */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Contenido actual</h4>
            <div className="bg-gray-50 p-4 rounded-xl max-h-64 overflow-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-gray-700">
                {section.content}
              </pre>
            </div>
          </div>

          {/* bloque feedback */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Tus comentarios</h4>
            <Textarea
              placeholder="Describe específicamente los cambios…"
              className="min-h-32 rounded-xl mb-4"
              value={comment}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setComment(e.target.value)}
            />

            {/* === BOTÓN IA ================================================= */}
            <Button
              /* ——— visual ——— */
              className="
                w-full h-12 rounded-xl font-medium
                bg-pastelPink text-gray-800 shadow
                hover:bg-pastelPink/90 active:scale-[.98]
                transition
              "
              /* ——— lógica ——— */
              disabled={!comment.trim()}
              onClick={() => {
                /* aquí irá la llamada al backend/IA */
                setComment("");
                onClose();
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Reajustar con IA
            </Button>

            <Button variant="outline" className="w-full rounded-xl" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
