import { App } from "@/App";
import { Component } from "./Component";
import { TComponent } from "@/services/types";

export class ComponentRegistry {
  private components: Component[] = [];

  constructor(readonly m: App) {}

  register(components: TComponent[]) {
    this.components = components.map((component) => new Component(component));
  }
  get(id: string): Component {
    const component = this.components.find(
      (component) => component.component.id === id
    );
    if (!component) throw new Error(`Component not found: ${id}`);
    return component;
  }
  async generate() {
    for (const component of this.components) {
      await component.generate(
        this,
        this.m.generatorRegistry,
        this.m.pathResolver.getComponentImports(component.component.id)
      );
    }
  }
}
