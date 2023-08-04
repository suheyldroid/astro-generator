import { z } from "zod";
import { propSchema } from "../propSchema";
import { baseComponentSchema } from "./baseComponentSchema";

export const astroComponent = baseComponentSchema.extend({
  type: z.literal("astro"),
  serverJs: z.string(),
  clientJs: z.string(),
  clientProps: z.array(propSchema).optional().default([]),
});

export type TAstroComponent = z.infer<typeof astroComponent>;
