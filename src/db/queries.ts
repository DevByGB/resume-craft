import { auth } from "@/lib/auth";
import { cache } from "react";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { resumes } from "./schema";
import { ResumeDto } from "./types";

export const getResumes = cache(async (): Promise<ResumeDto[]> => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return [];

  const userResumes = await db.query.resumes.findMany({
    where: eq(resumes.userId, userId),
  });

  return userResumes;
});

export const getResumeById = cache(
  async (id: string): Promise<ResumeDto | undefined> => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return undefined;

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, id),
    });

    return resume;
  }
);
