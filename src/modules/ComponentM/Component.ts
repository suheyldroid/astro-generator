import { TComponent } from "@/types";
import {
  GeneratedComponent,
  GeneratorRegistry,
} from "./Generator/GeneratorRegistry";
import { ComponentRegistry } from "./ComponentRegistry";

export class Component {
  isGenerated: boolean = false;
  output: GeneratedComponent | undefined;
  constructor(readonly component: TComponent) {}
  async generate(
    componentRegisty: ComponentRegistry,
    generatorRegistry: GeneratorRegistry
  ) {
    const generator = generatorRegistry.get(this.component.type);
    if (generator) {
      this.output = await generator({
        componentRegisty,
        component: this.component,
      });
      this.isGenerated = true;
    }
  }
}
