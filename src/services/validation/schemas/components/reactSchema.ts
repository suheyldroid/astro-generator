import { z } from "zod";
import { baseComponentSchema } from "./baseComponentSchema";

export const reactComponent = baseComponentSchema.extend({
  type: z.literal("react"),
});

export type TReactComponent = z.infer<typeof reactComponent>;
