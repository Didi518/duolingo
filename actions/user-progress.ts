"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";

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
