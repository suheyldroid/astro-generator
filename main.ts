import fs from "fs";
import { Config } from "./types/config.types";
import { AstroGenerator } from "./src/modules/Component/Generator/AstroGenerator";
import { ReactGenerator } from "./src/modules/Component/Generator/ReactGenerator";
import { App } from "./src/App";
import { validateConfig } from "./src/services/validation/validate-config";

const configStr = fs.readFileSync("config.json", "utf8");
const config = validateConfig(JSON.parse(configStr));
/* 
const app = new App(config, {
  react: ReactGenerator,
  classic: AstroGenerator,
});

(async () => {
  await app.initialize();
  await app.setup();
})(); */

// TODO: Path Resolver
// TODO: Config Resolver
// TODO: Page Content
// component import
// parametrized config
