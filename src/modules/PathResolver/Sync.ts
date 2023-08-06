import fs from "fs";
import { PathResolver } from "./PathResolver";
import { Component } from "../ComponentM/Component";
import { Page } from "../Page/Page";
import path from "path";
export class Sync {
  constructor(private readonly pathResolver: PathResolver) {}
  component(component: Component) {
    const componentPath = this.pathResolver.component.fullPath(
      component.component
    );
    this.sync(componentPath, component.code);
  }

  page(page: Page) {
    const pagePath = this.pathResolver.page.fullPath(page.page);
    this.sync(pagePath, page.code);
  }

  sync(filepath: string, content: string) {
    const _path = this.prepareDir(filepath);
    fs.writeFileSync(_path, content, { encoding: "utf-8" });
  }

  getDir(path: string) {
    return path.split("/").slice(0, -1).join("/");
  }
  prepareDir(filePath: string) {
    const projectPath = path.join(this.pathResolver.projectRoot, filePath);
    const dir = this.getDir(projectPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return projectPath;
  }
}
