import { auth } from "@/lib/auth";
import { cache } from "react";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { resumes } from "./schema";
import { ResumeDto } from "./types";

export const getResumes = cache(async (): Promise<ResumeDto[]> => {
  const session = await auth();

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const userId = session?.user?.id;

  if (!userId) return [];

  const userResumes = await db.query.resumes.findMany({
    where: eq(resumes.userId, userId),
  });

  return userResumes;
});