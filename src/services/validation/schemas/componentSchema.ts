import { z } from "zod";
import { propsSchema } from "./propsSchema";
import { importSchema } from "./importSchema";
const pascalCaseRegex = /^[A-Z][A-Za-z]*$/;

export const baseComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagName: z.string().refine((val) => pascalCaseRegex.test(val)),
  props: z.array(propsSchema),
  imports: z.array(importSchema).optional().default([]),
  content: z.string(),
});

export const reactComponent = z.object({
  type: z.literal("react"),
});
export const astroComponent = z.object({
  type: z.literal("astro"),
  serverJs: z.string(),
  clientJs: z.string(),
  clientProps: z.array(propsSchema).optional().default([]),
});

export const componentSchema = z
  .discriminatedUnion("type", [reactComponent, astroComponent])
  .and(baseComponentSchema);
