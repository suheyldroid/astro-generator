import fs from "fs";
import { ComponentRegistry } from "../ComponentM/ComponentRegistry";
import ejs from "ejs";
import { TPage } from "@/types";

export class Page {
  isGenerated: boolean = false;
  content: string | undefined;
  constructor(private config: TPage) {}

  async generate() {
    this.content = await ejs.renderFile("./src/templates/pages/page.ejs", {});
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
