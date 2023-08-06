import { TComponent } from "@/services/types";
import { GeneratorRegistry } from "./Generator/GeneratorRegistry";
import { ComponentRegistry } from "./ComponentRegistry";

export class Component {
  _code: string | undefined;
  constructor(readonly component: TComponent) {}

  async generate(
    componentRegisty: ComponentRegistry,
    generatorRegistry: GeneratorRegistry,
    imports: string[]
  ) {
    const generator = generatorRegistry.get(this.component.type);

    if (generator) {
      this._code = await generator({
        componentRegisty,
        component: this.component,
        imports,
      });
    }
  }

  get isGenerated() {
    return !!this._code;
  }

  get code(): string {
    if (!this._code) throw new Error("Component is not generated yet");
    return this._code;
  }
}
