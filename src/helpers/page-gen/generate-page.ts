import { Route } from "../../types/config.types";
import fs from "fs";
export function generatePage(route: Route) {

  const file = {
    name: (route.link === "/" ? "index" : route.link).replace("/", ""),
    content: "",
  };
  file.content = `---
    // ${route.title}.astro
    import Page from "../components/${route.component}.astro";
---
    <Page />
    `;
    fs.existsSync(`astro/src/pages/${file.name}`) || fs.writeFileSync(`astro/src/pages/${file.name}.astro`, file.content);
}
