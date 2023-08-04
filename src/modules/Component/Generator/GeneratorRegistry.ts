import {
  Arg,
  Component as ComponentType,
  Import,
} from "../../../../types/component.types";
import { App } from "../../../App";
import { ComponentRegistry } from "../../component/ComponentRegistry";

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

export type ComponentGenerator<T = ComponentType> = (componentData: {
  componentRegisty: ComponentRegistry;
  name: string;
  imports: Import[];
  args: Arg[];
  component: T;
}) => Promise<GeneratedComponent>;

export type GeneratedComponent = {
  content: string;
  fileName: string;
  path: string;
};
