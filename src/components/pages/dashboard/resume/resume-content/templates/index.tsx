import { useMemo } from "react";
import { Ditto } from "./ditto";
import { Eevee } from "./eevee";
import { Jynx } from "./jynx";
import { Onix } from "./onix";

export type BaseResumeProps = {
  data: ResumeData;
};

type ResumeTemplateProps = {
  data: ResumeData;
};

const templatesMap: Record<ResumeTemplates, React.FC<BaseResumeProps>> = {
  ditto: Ditto,
  eevee: Eevee,
  jynx: Jynx,
  onix: Onix,
};

export const ResumeTemplate = ({ data }: ResumeTemplateProps) => {
  const template = data.structure.template;

  const Resume = useMemo(() => {
    return templatesMap[template];
  }, [template]);

  return (
    <div
      id="resume-content"
      className="w-[210mm] min-h-[297mm] bg-white text-black font-arial [&_hr]:border-black"
    >
      <Resume data={data} />
    </div>
  );
};
