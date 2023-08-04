import { z } from "zod";
import { reactComponent } from "./reactSchema";
import { astroComponent } from "./astroSchema";
import { baseComponentSchema } from "./baseComponentSchema";

export const componentSchema = z
  .discriminatedUnion("type", [astroComponent, reactComponent])

export type TComponent = z.infer<typeof componentSchema>;
