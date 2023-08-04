import { z } from "zod";
import { pageSchema } from "./pageSchema";
import { componentSchema } from "./componentSchema";
import { appSchema } from "./appSchema";

export const configSchema = z.object({
  components: z.array(componentSchema),
  pages: z.array(pageSchema),
  app: appSchema,
});
