import { getResumes } from "@/db/queries";
import { AddResumeButton } from "../add-resume-button";
import { NewResumeDialog } from "../new-resume-dialog";
import { ResumeCard } from "../resume-card";

export const ResumesList = async () => {
  const resumes = await getResumes();

  const sortedResumes = resumes.sort((a, b) => {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  });

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
      <NewResumeDialog>
        <AddResumeButton />
      </NewResumeDialog>
      {sortedResumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </section>
  );
};
