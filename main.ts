import fs from "fs";
import { Config } from "./types/config.types";
import { AstroGenerator } from "./src/modules/Component/Generator/AstroGenerator";
import { ReactGenerator } from "./src/modules/Component/Generator/ReactGenerator";
import { App } from "./src/App";

const configStr = fs.readFileSync("config.json", "utf8");
const config: Config = JSON.parse(configStr);

const app = new App(config, {
  react: ReactGenerator,
  classic: AstroGenerator,
});

(async () => {
  await app.initialize();
  await app.setup();
})();
