import { spawn } from "child_process";
import { withAsyncSpawn } from "../helpers/async-spawn";
import fs from "fs";
import { Config } from "../../types/config.types";
export class App {
  constructor(readonly config: Config) {}
  private async initializeAstro() {
    if (fs.existsSync("astro")) fs.rmdirSync("astro", { recursive: true });
    await withAsyncSpawn(
      spawn(
        "yarn create astro astro ./ --template minimal --install --no-git -y --skip-houston",
        {
          shell: true,
          stdio: "inherit",
        }
      )
    );
  }
  private resetComponents() {
    fs.existsSync("astro/src/components") &&
      fs.rmdirSync("astro/src/components", { recursive: true });
    fs.mkdirSync("astro/src/components");
  }
  private resetPages() {
    fs.existsSync("astro/src/pages") &&
      fs.rmdirSync("astro/src/pages", { recursive: true });
    fs.mkdirSync("astro/src/pages");
  }
  private resetLayouts() {
    fs.existsSync("astro/src/layouts") &&
      fs.rmdirSync("astro/src/layouts", { recursive: true });
    fs.mkdirSync("astro/src/layouts");
  }
  private async addReact() {
    await withAsyncSpawn(
      spawn(
        "cd astro && yarn astro add react --yes && yarn add react react-dom",
        {
          shell: true,
          stdio: "inherit",
        }
      )
    );
  }
  async initialize() {
    await this.initializeAstro();
    this.resetComponents();
    this.resetPages();
    this.resetLayouts();
    await this.addReact();
  }
}
