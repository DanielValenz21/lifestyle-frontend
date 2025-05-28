// src/components/LoadingModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onFinish: () => void;      // se dispara al acabar el “progreso”
  duration?: number;         // ms (default 3200)
}

const LoadingModal: React.FC<Props> = ({ open, onFinish, duration = 3200 }) => {
  // % de progreso para la barra
  const [progress, setProgress] = useState(0);

  /* fake loading ------------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    // calculamos cada 50 ms ⇒ 20 pasos/seg
    const step   = 50;
    const total  = duration;
    const incPct = (step / total) * 100;

    const id = setInterval(() => {
      setProgress((p) => {
        if (p + incPct >= 100) {
          clearInterval(id);
          onFinish();              // ¡listo!
          return 100;
        }
        return p + incPct;
      });
    }, step);

    return () => clearInterval(id);
  }, [open, duration, onFinish]);

  /* UI ---------------------------------------------------------------- */
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm p-8 rounded-2xl">
        {/* cierre opcional (por accesibilidad) */}
        <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </DialogClose>

        <DialogHeader className="mb-6 text-center space-y-2 border-none">
          <DialogTitle className="text-lg font-medium text-gray-800">
            Generando tu plan personalizado
          </DialogTitle>

          <span className="inline-flex items-center justify-center w-16 h-16
                           rounded-full bg-pastelPink animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </span>
        </DialogHeader>

        {/* barra de progreso */}
        <div className="w-full h-1 rounded-full bg-gray-200 overflow-hidden mb-4">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gray-800 transition-all"
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          Personalizando contenido…
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
