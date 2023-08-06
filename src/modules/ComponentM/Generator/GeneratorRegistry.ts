import { TComponentGenerator } from "@/services/types";
import { App } from "@/App";

export class GeneratorRegistry {
  private generators: Record<string, TComponentGenerator<any>> = {};

  constructor(readonly m: App) {}

  register(generators: Record<string, TComponentGenerator<any>>) {
    this.generators = generators;
  }

  get(key: string) {
    return this.generators[key];
  }
}
