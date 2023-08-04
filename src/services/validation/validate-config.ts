import { TConfig, configSchema } from "./schemas/configSchema";

export function validateConfig(config: { [key: string]: any }): TConfig {
  return configSchema.parse(config);
}
