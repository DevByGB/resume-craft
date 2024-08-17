import { Separator } from "@/components/ui/separator"
import { TemplatesListSection } from "./sections/templates-list"
import { LayoutSection } from "./sections/layout"

export const StructureSidebar = () => {
  return (
    <aside className="w-full h-full p-6 overflow-y-auto">
      <TemplatesListSection />
      <Separator className="my-5" />
      <LayoutSection />
    </aside>
  )
}