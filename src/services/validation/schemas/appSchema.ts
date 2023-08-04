import { z } from "zod";

const appNameRegex = /^[a-zA-Z0-9-_]+$/;

export const appSchema = z.object({
  name: z.string().refine((val) => appNameRegex.test(val)),
});

export type TApp = z.infer<typeof appSchema>;
