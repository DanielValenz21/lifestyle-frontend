import {
  Briefcase,
  Dumbbell,
  Book,
  UtensilsCrossed,
  Heart,
} from "lucide-react";

/* --- Tipos reutilizables --- */
export interface PlanSection {
  id: string;
  icon: React.FC<any>;
  title: string;
  content: string;
  color: string;          // clase tailwind para el fondo pastel
}

export interface Plan {
  id: string;
  title: string;
  date: string;
  sections: PlanSection[];
}

/* --- “Dummy data” ------------------------------------------------------- */
export const pastelSections: PlanSection[] = [
  {
    id: "professional",
    icon: Briefcase,
    title: "Desarrollo Profesional",
    color: "bg-pink-100",
    content: `**Semana 1-2: Fundación**
• Actualizar CV y LinkedIn
• Identificar 3 oportunidades de networking
• Completar evaluación de habilidades

**Semana 3-4: Expansión**
• Curso online relevante
• 2 coffee-chats con profesionales senior
• Proyecto personal de demostración`,
  },
  {
    id: "training",
    icon: Dumbbell,
    title: "Entrenamiento Físico",
    color: "bg-cyan-100",
    content: `**Rutina Semanal Prog.**
• Cardio 30 min + fuerza 20 min 3×/sem
• Yoga 25 min 2×/sem
• Sábado: actividad recreativa
• Domingo: descanso activo

**Progresión mensual**
Mes 1: hábito · Mes 2: +15 % intensidad`,
  },
  {
    id: "hobbies",
    icon: Book,
    title: "Desarrollo de Hobbies",
    color: "bg-purple-100",
    content: `**Lectura**
• 30 min diarios
• Meta 2 libros/mes
• Journal de reflexiones

**Fotografía**
• Curso 4 sem
• 10 fotos diarias
• Proyecto mensual`,
  },
  {
    id: "nutrition",
    icon: UtensilsCrossed,
    title: "Nutrición Balanceada",
    color: "bg-emerald-100",
    content: `• Meal-prep dominical (4 comidas)
• 5 porciones de frutas/verduras
• 2 .5 L agua + infusiones
• Snacks saludables

**Seguimiento**
App de tracking · revisión semanal`,
  },
  {
    id: "wellness",
    icon: Heart,
    title: "Bienestar Mental",
    color: "bg-rose-100",
    content: `• Meditación 10 min/día
• Journaling nocturno
• ≤ 1 h redes sociales

**Conexión Social**
Llamada semanal + 2 h naturaleza`,
  },
];
