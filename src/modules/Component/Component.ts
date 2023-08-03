import { Component as ComponentType } from "../../../types/component.types";
import GeneratorRegistry, {
  ComponentGenerator,
  GeneratedComponent,
} from "../Generator/GeneratorRegistry";
import { ComponentRegistry } from "./ComponentRegistry";

export class Component {
  isGenerated: boolean = false;
  output: GeneratedComponent | undefined;
  constructor(readonly component: ComponentType) {}
  generate(componentRegisty: ComponentRegistry) {
    const generator = GeneratorRegistry.get(this.component.type);
    if (generator) {
      this.output = generator({
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
