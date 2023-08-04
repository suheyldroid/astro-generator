import { z } from "zod";

export const propsSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean().optional().default(false),
  defaultValue: z.string().optional(),
});
