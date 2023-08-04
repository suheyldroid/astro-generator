import { Component as ComponentType } from "../../../types/component.types";
import {
  ComponentGenerator,
  GeneratedComponent,
  GeneratorRegistry,
} from "../Component/Generator/GeneratorRegistry";
import { ComponentRegistry } from "./ComponentRegistry";

export class Component {
  isGenerated: boolean = false;
  output: GeneratedComponent | undefined;
  constructor(readonly component: ComponentType) {}
  async generate(
    componentRegisty: ComponentRegistry,
    generatorRegistry: GeneratorRegistry
  ) {
    const generator = generatorRegistry.get(this.component.type);
    if (generator) {
      this.output = await generator({
        componentRegisty,
        component: this.component,
        args: this.component.args,
        imports: this.component.import,
        name: this.component.name,
      });
      this.isGenerated = true;
    }
  }
}
