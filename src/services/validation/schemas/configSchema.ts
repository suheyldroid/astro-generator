import { z } from "zod";
import { pageSchema } from "./pageSchema";
import { componentSchema } from "./components/componentSchema";
import { appSchema } from "./appSchema";

export const configSchema = z.object({
  components: z.array(componentSchema),
  pages: z.array(pageSchema),
  app: appSchema,
});

export type TConfig = z.infer<typeof configSchema>;
