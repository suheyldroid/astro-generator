import { configSchema } from "./schemas/configSchema";

export function validateConfig(config: { [key: string]: any }) {
  const result = configSchema.safeParse(config);
  result.success || console.log(JSON.stringify(result.error, null, 2));
}
