import { z } from "zod";
import { importSchema } from "../importSchema";
import { propSchema } from "../propSchema";
const pascalCaseRegex = /^[A-Z][A-Za-z]*$/;

export const baseComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagName: z.string().refine((val) => pascalCaseRegex.test(val)),
  props: z.array(propSchema),
  imports: z.array(importSchema).optional().default([]),
  content: z.string(),
});
