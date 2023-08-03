import { Component } from "../../../types/component.types";
import { generateClassicComponent } from "./generate-classic-component";
import { generateReactComponent } from "./generate-react-component";
import fs from "fs";

export function generateComponent(component: Component) {
  const file = {
    name: component.id,
    type: "astro",
    content: "",
  };

  switch (component.type) {
    case "react":
      file.content = generateReactComponent(component);
      file.type = "jsx";
      break;
    default:
      file.content = generateClassicComponent(component);
      file.type = "astro";
      break;
  }
}
