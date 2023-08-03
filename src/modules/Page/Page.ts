import fs from "fs";
import { ComponentRegistry } from "../component/ComponentRegistry";

export class Page {
  isGenerated: boolean = false;
  content: string | undefined;
  constructor(
    private config: { path: string; title: string; component: string }
  ) {}
  generate(componentRegistry: ComponentRegistry) {
    const component = componentRegistry.get(this.config.component);
    if (!component) throw new Error("Component not found");
    if (!component.isGenerated) throw new Error("Component not generated");
    console.log(component?.output?.path);
    
    this.content = `---
import Component from "..${component?.output?.path}";
---
<Component />`;
    this.isGenerated = true;
  }
  generatePath() {
    const path = "astro/src/pages/" + this.config.path.replace("/", "");
    !fs.existsSync(path) && fs.mkdirSync(path, { recursive: true });
    return path.endsWith("/") ? path : path + "/";
  }

  sync() {
    if (!this.isGenerated) throw new Error("Page not generated");
    const path = this.generatePath();
    fs.writeFileSync(path + "index.astro", this.content!);
  }
}
