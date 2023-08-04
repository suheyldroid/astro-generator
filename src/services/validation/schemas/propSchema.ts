import { z } from "zod";

export const propSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean().optional().default(false),
  defaultValue: z.string().optional(),
});

export type TProp = z.infer<typeof propSchema>;
