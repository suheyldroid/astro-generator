import { log } from "console";
import { GeneratedComponent } from "../Generator/GeneratorRegistry";
import { Component } from "./Component";
import fs from "fs";

export class ComponentRegistry {
  private components: Component[] = [];
  register(component: Component) {
    this.components.push(component);
  }
  get(id: string) {
    return this.components.find((component) => component.component.id === id);
  }
  generate() {
    this.components.forEach((component) => component.generate(this));
  }
  sync() {
    this.components.forEach((component) => {
      if (component.isGenerated) {
        this.__sync(component.output!);
      }
    });
  }
  private __sync(generatedComponent: GeneratedComponent) {
    console.log(generatedComponent.path);
    
    fs.writeFileSync(
      `astro/src${generatedComponent.path}`,
      generatedComponent.content
    );
  }
}
