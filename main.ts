import fs from "fs";
import { AstroGenerator } from "./src/modules/ComponentM/Generator/AstroGenerator";
import { ReactGenerator } from "./src/modules/ComponentM/Generator/ReactGenerator";
import { App } from "./src/App";
import { validateConfig } from "./src/services/validation/validate-config";

const configStr = fs.readFileSync("config.json", "utf8");
const config = validateConfig(JSON.parse(configStr));

const app = new App(config, {
  react: ReactGenerator,
  classic: AstroGenerator,
});

(async () => {
  await app.initialize();
  await app.setup();
})();

// TODO: Path Resolver
// TODO: Page Content
// component import
// parametrized config
// getter
// generated type düznelemesi
// generator ve ejs düzenlemesi
// generator registry types
