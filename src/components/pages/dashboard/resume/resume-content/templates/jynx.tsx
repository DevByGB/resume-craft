import { cn, sectionIsEmpty } from "@/lib/utils";
import { BaseResumeProps } from ".";
import { Element } from "../resume-element";
import { BasicInfos } from "./shared/basic-infos";
import { sectionLabels } from "../../structure-sidebar/layout-drag-list";
import { ResumeSectionContent } from "./shared/sections-content";

export const Jynx = ({ data }: BaseResumeProps) => {
  const { content } = data;
  const { infos } = content;

  const mainSections = data.structure.layout.mainSections.filter((section) => {
    return !sectionIsEmpty(section.key, data.content);
  });

  const sidebarSections = data.structure.layout.sidebarSections.filter(
    (section) => {
      return !sectionIsEmpty(section.key, data.content);
    }
  );

  return (
    <div className="w-full h-full">
      <section className="w-full h-max min-h-[120px] bg-resume-primary text-white items-center grid grid-cols-[300px,1fr]">
        <div className="relative">
          {content.image.url && content.image.visible && (
            <img
              src={content.image.url}
              className="w-36 h-36 absolute left-1/2 top-[calc(50%+30px)] -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <div>
          <Element className="text-3xl font-bold">{infos.fullName}</Element>
          <Element>{infos.headline}</Element>
        </div>
      </section>

      <div className="grid grid-cols-[300px,1fr]">
        <section className="p-6 pt-20">
          {sidebarSections.map((section, i) => {
            return (
              <div
                key={`section-item-${section.key}`}
                className={cn(i > 0 && "mt-4")}
              >
                <p className="font-extrabold mb-2">
                  {sectionLabels[section.key][data.structure.language]}
                </p>

                <ResumeSectionContent
                  key={section.id}
                  section={section}
                  content={data.content}
                />
              </div>
            );
          })}
        </section>

        <section className="pr-6 pb-6">
          <BasicInfos infos={infos} className="justify-start gap-y-2 mb-4 pt-4" />

          {mainSections.map((section, i) => {
            return (
              <div
                key={`section-item-${section.key}`}
                className={cn(i > 0 && "mt-4")}
              >
                <p className="font-bold text-sm mb-2">
                  {sectionLabels[section.key][data.structure.language]}
                </p>

                <div className="border-l border-l-resume-primary pl-4 w-full">
                  <ResumeSectionContent
                    key={section.id}
                    section={section}
                    content={data.content}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
