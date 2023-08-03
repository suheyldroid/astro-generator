import { ReactComponent } from "../../types/component.types";

export function generateReactComponent(component: ReactComponent) {
  return `${component.imports}
  export default function ${component.id}(${component.args
    .map((arg) => arg.name)
    .join(", ")}) {
    ${component.jsx}
  }
  `;
}
