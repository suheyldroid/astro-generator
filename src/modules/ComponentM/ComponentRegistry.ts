import { App } from "@/App";
import fs from "fs";
import { GeneratedComponent } from "./Generator/GeneratorRegistry";

import { Component } from "./Component";
import { TComponent } from "@/types";

export class ComponentRegistry {
  private components: Component[] = [];

  constructor(readonly m: App) {}

  register(components: TComponent[]) {
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
