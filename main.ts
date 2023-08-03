import fs from "fs";
import { Config } from "./types/config.types";

import GeneratorRegistry from "./src/modules/Generator/GeneratorRegistry";

import { ReactGenerator } from "./src/modules/Generator/ReactGenerator";
import { AstroGenerator } from "./src/modules/Generator/AstroGenerator";
import { Component } from "./src/modules/component/Component";
import { ComponentRegistry } from "./src/modules/component/ComponentRegistry";
import { App } from "./src/modules/App";
import { Page } from "./src/modules/Page/Page";
import { PageRegistry } from "./src/modules/Page/PageGenerator";
const configStr = fs.readFileSync("config.json", "utf8");

const config: Config = JSON.parse(configStr);

const app = new App(config);
app.initialize().then(() => {
  GeneratorRegistry.register("react", ReactGenerator);
  GeneratorRegistry.register("classic", AstroGenerator);

  const compReg = new ComponentRegistry();

  config.components.forEach((component) => {
    compReg.register(new Component(component));
  });

  compReg.generate();
  compReg.sync();

  const pages = new PageRegistry();

  config.routes.forEach((route) => {
    pages.register(new Page(route));
  });

  pages.generate(compReg);
  pages.sync();
});
