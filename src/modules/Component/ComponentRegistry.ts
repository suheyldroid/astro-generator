import { Component as ComponentType } from "../../../types/component.types";
import { App } from "../../App";
import { GeneratedComponent } from "../Component/Generator/GeneratorRegistry";
import { Component } from "./Component";
import fs from "fs";

export class ComponentRegistry {
  private components: Component[] = [];

  constructor(readonly m: App) {}

  register(components: ComponentType[]) {
    this.components = components.map((component) => new Component(component));
  }
  get(id: string) {
    return this.components.find((component) => component.component.id === id);
  }
  async generate() {
    for (const component of this.components) {
      await component.generate(this, this.m.generatorRegistry);
    }
  }
  sync() {
    this.components.forEach((component) => {
      if (component.isGenerated) {
        this.__sync(component.output!);
      }
    });
  }
  private __sync(generatedComponent: GeneratedComponent) {
    fs.writeFileSync(
      `astro/src${generatedComponent.path}`,
      generatedComponent.content
    );
  }
}
