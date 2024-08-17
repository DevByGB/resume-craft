import { LayoutTemplate } from "lucide-react"
import { SectionTitle } from "../../infos-sidebar/section-title"
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";

const allTemplates: ResumeTemplates[] = ["ditto", "eevee", "jynx", "onix"];

export const TemplatesListSection = () => {
  const { control } = useFormContext<ResumeData>();

  return (
    <div>
      <SectionTitle title="Modelos" icon={LayoutTemplate} />

      <Controller
        control={control}
        name="structure.template"
        render={({ field }) => (
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            {allTemplates.map((template) => {
              const isSelected = field.value === template;

              return (
                <button
                  key={`template-${template}`}
                  type="button"
                  className={cn(
                    "w-full aspect-auto relative rounded border-2 border-muted overflow-hidden hover:brightness-125 transition-all",
                    isSelected && "border-muted-foreground"
                  )}
                  onClick={() => field.onChange(template)}
                >
                  <Image
                    className="w-full h-full object-cover"
                    width={150}
                    height={130}
                    src={`/images/templates/${template}.webp`}
                    alt={template}
                  />

                  <div className={cn(
                    "absolute text-sm inset-0 w-full h-full flex flex-col font-bold font-title capitalize",
                    "items-center justify-end p-2 bg-gradient-to-t from-background"
                  )}>
                    {template}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      />
    </div>
  )
}