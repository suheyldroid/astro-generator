import { TComponent } from "@/types";
import { App } from "@/App";
import { ComponentRegistry } from "../ComponentRegistry";

export class GeneratorRegistry {
  private generators: Record<string, ComponentGenerator<any>> = {};

  constructor(readonly m: App) {}

  register(generators: Record<string, ComponentGenerator<any>>) {
    this.generators = generators;
  }

  get(key: string) {
    return this.generators[key];
  }
}

export type ComponentGenerator<T = TComponent> = (componentData: {
  componentRegisty: ComponentRegistry;
  component: T;
}) => Promise<GeneratedComponent>;

export type GeneratedComponent = {
  content: string;
  fileName: string;
  path: string;
};
