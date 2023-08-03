import {
  Arg,
  Component as ComponentType,
  Import,
} from "../../../types/component.types";
import { ComponentRegistry } from "../component/ComponentRegistry";

export class GeneratorRegisty {
  private generators: Record<string, ComponentGenerator<any>> = {};

  register(key: string, generator: ComponentGenerator<any>) {
    this.generators[key] = generator;
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
}) => GeneratedComponent;

export type GeneratedComponent = {
  content: string;
  fileName: string;
  path: string;
};

export default new GeneratorRegisty();
