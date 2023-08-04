import fs from "fs";
import { ComponentRegistry } from "../component/ComponentRegistry";
import ejs from "ejs";

export class Page {
  isGenerated: boolean = false;
  content: string | undefined;
  constructor(private config: PageType) {}

  async generate(componentRegistry: ComponentRegistry) {
    const component = componentRegistry.get(this.config.component);
    if (!component) throw new Error("Component not found");
    if (!component.isGenerated) throw new Error("Component not generated");

    this.content = await ejs.renderFile(
      "./src/templates/pages/page.ejs",
      {
        path: component?.output?.path,
      }
    );
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

export type PageType = { path: string; title: string; component: string };
