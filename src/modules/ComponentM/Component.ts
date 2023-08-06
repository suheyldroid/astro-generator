import { TComponent } from "@/services/types";
import { GeneratorRegistry } from "./Generator/GeneratorRegistry";

export class Component {
  private _code: string | undefined;
  constructor(readonly component: TComponent) {}

  async generate(generatorRegistry: GeneratorRegistry, imports: string[]) {
    const generator = generatorRegistry.get(this.component.type);
    if (generator) {
      this._code = await generator({
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
