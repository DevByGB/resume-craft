import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export const useResumeDownload = (title?: string) => {
  const { getValues } = useFormContext<ResumeData>();

  const { mutateAsync: handleGetResumeUrl, isPending } = useMutation({
    mutationFn: ApiService.getResumeUrl,
  })

  const handleDownloadResume = async () => {
    const resume = document.getElementById("resume-content");

    if (!resume) return;

    const structure = getValues("structure");

    const url = await handleGetResumeUrl({
      html: resume.outerHTML,
      structure,
    })

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title ?? "Currículo"}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return {
    handleDownloadResume,
    isLoading: isPending,
  };
};
