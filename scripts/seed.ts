import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Manipulation de la base de données");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Espagnol",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italien",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "Français",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croate",
        imageSrc: "/hr.svg",
      },
    ]);

    console.log("Manipulation terminée");
  } catch (error) {
    console.error(error);
    throw new Error("Echec de la manipulation de la base de données");
  }
};

main();
