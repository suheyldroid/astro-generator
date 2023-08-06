import { z } from "zod";
import { importSchema } from "./importSchema";

export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  path: z.string(),
  content: z.string(),
  imports: z.array(importSchema),
});

export type TPage = z.infer<typeof pageSchema>;
