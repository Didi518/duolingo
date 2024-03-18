"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Non autorisé");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Enseignement introuvable");
  }
  // TODO:: autoriser les unités et leçons
  //   if (!course.units.length || !course.units[0].lessons.length) {
  //     throw new Error("Enseignement vide");
  //   }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/cours");
    revalidatePath("/apprendre");
    redirect("/apprendre");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/cours");
  revalidatePath("/apprendre");
  redirect("/apprendre");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const currentUserProgress = await getUserProgress();
  //TODO: get user sub

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge introuvable");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("Progrès introuvables");
  }

  // TODO: sub

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/boutique");
  revalidatePath("/apprendre");
  revalidatePath("/quetes");
  revalidatePath("/classement");
  revalidatePath(`/classe/${lessonId}`);
};
