import { Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { useFormContext } from "react-hook-form";

type LayoutDragListProps = {
  title: string;
  fields: ResumeLayoutSection[];
}

const labels: Record<ResumeSections, Record<ResumeLanguages, string>> = {
  certifications: {
    portuguese: "Certificações",
    english: "Certifications",
    french: "Certifications",
    german: "Zertifizierungen",
    italian: "Certificazioni",
    spanish: "Certificaciones",
  },
  educations: {
    portuguese: "Educação",
    english: "Education",
    french: "Éducation",
    german: "Bildung",
    italian: "Istruzione",
    spanish: "Educación",
  },
  experiences: {
    portuguese: "Experiências",
    english: "Experiences",
    french: "Expériences",
    german: "Erfahrungen",
    italian: "Esperienze",
    spanish: "Experiencias",
  },
  languages: {
    portuguese: "Idiomas",
    english: "Languages",
    french: "Langues",
    german: "Sprachen",
    italian: "Lingue",
    spanish: "Idiomas",
  },
  projects: {
    portuguese: "Projetos",
    english: "Projects",
    french: "Projets",
    german: "Projekte",
    italian: "Progetti",
    spanish: "Proyectos",
  },
  skills: {
    portuguese: "Habilidades",
    english: "Skills",
    french: "Compétences",
    german: "Fähigkeiten",
    italian: "Abilità",
    spanish: "Habilidades",
  },
  socialMedias: {
    portuguese: "Redes Sociais",
    english: "Social Medias",
    french: "Réseaux Sociaux",
    german: "Soziale Medien",
    italian: "Social Media",
    spanish: "Redes Sociales",
  },
  summary: {
    portuguese: "Resumo",
    english: "Summary",
    french: "Résumé",
    german: "Zusammenfassung",
    italian: "Sommario",
    spanish: "Resumen",
  },
};

export const sectionLabels = labels;

export const LayoutDragList = ({ title, fields }: LayoutDragListProps) => {
  const { watch } = useFormContext<ResumeData>();

  const language = watch("structure.language");
  
  return (
    <div className="w-full p-2 bg-muted rounded">
      <p className="font-title text-sm font-bold mb-2">{title}</p>

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <Draggable
            key={field.key}
            draggableId={`draggable-${field.key}`}
            index={index}
          >
            {(provided) => (
              <div
                key={field.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="flex items-center gap-1 bg-foreground p-1 rounded"
              > 
                <GripVertical className="w-4 h-4 min-w-4 text-background" />
                <p className="text-accent text-xs font-semibold">
                  {labels[field.key][language]}
                </p>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}