import { z } from "zod";
import { importSchema } from "./importSchema";

export const pageSchema = z.object({
  title: z.string(),
  path: z.string(),
  content: z.string(),
  imports: z.array(importSchema),
});
