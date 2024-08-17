import { BaseResumeProps } from ".";
import { Element } from "../resume-element";
import { sectionIsEmpty } from "@/lib/utils";
import { ResumeSectionContent } from "./shared/sections-content";
import { Fragment } from "react";
import { sectionLabels } from "../../structure-sidebar/layout-drag-list";
import { BasicInfos } from "./shared/basic-infos";

export const Ditto = ({ data }: BaseResumeProps) => {
  const { content } = data;
  const { infos } = content;

  const sections = [
    ...data.structure.layout.mainSections,
    ...data.structure.layout.sidebarSections,
  ].filter((section) => {
    return !sectionIsEmpty(section.key, data.content);
  });

  return (
    <div className="w-full h-full p-4">
      <div className="text-center">
        {content.image.url && content.image.visible && (
          <img src={content.image.url} className="w-24 h-24 mx-auto mb-2" />
        )}
        <Element className="text-2xl text-center font-bold">
          {infos.fullName}
        </Element>
        <Element>{infos.headline}</Element>

        <BasicInfos infos={infos} className="mt-2" />
      </div>

      <hr className="my-5" />

      {sections.map((section, i) => {
        const isLastOne = i === sections.length - 1;

        return (
          <Fragment key={`section-item-${section.key}`}>
            <div className="grid grid-cols-[140px,1fr]">
              <p className="font-bold text-sm">{sectionLabels[section.key][data.structure.language]}</p>
              <ResumeSectionContent
                key={section.id}
                section={section}
                content={data.content}
              />
            </div>
            {!isLastOne && <hr className="my-5" />}
          </Fragment>
        );
      })}
    </div>
  );
};
