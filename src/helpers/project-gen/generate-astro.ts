import fs from "fs";
import { spawn } from "child_process";
export function generateAstro() {
  if (fs.existsSync("astro")) fs.rmdirSync("astro", { recursive: true });
  const cre = spawn(
    "yarn create astro astro ./ --template minimal --install --no-git -y --skip-houston",
    {
      shell: true,
      stdio: "inherit",
    }
  );

  fs.existsSync("astro/src/components") &&
    fs.rmdirSync("astro/src/components", { recursive: true });
  fs.mkdirSync("astro/src/components");

  fs.existsSync("astro/src/pages") &&
    fs.rmdirSync("astro/src/pages", { recursive: true });
  fs.mkdirSync("astro/src/pages");

  fs.existsSync("astro/src/layouts") &&
    fs.rmdirSync("astro/src/layouts", { recursive: true });
  fs.mkdirSync("astro/src/layouts");

  spawn("cd astro && yarn astro add react --yes && yarn add react react-dom", {
    shell: true,
    stdio: "inherit",
  });
}
