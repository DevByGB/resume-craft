import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
} satisfies Config;