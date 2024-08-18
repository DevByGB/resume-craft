import { api } from "@/lib/axios";

type ResumeDownloadPayload = {
  html: string;
  structure: ResumeStructureData;
};

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
  const { data } = await api.post("/resume/download", payload, {
    responseType: "blob",
  });

  return window.URL.createObjectURL(data);
};

export const ApiService = {
  getResumeUrl,
};
