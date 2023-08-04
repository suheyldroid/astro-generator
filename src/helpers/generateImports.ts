import { Import } from "../../types/component.types";
import { ComponentRegistry } from "../modules/component/ComponentRegistry";

export const prepareImports = (
  componentImports: Import[],
  componentRegistry: ComponentRegistry
) => {
  return componentImports.map((importItem) => {
    switch (importItem.type) {
      case "component":
        const type = componentRegistry.get(importItem.id)?.component.type;
        const fileName = type === "react" ? "jsx" : "astro";
        return `import Component_${importItem.id} from "./component_${importItem.id}.${fileName}";`;
      case "module":
        switch (importItem.import.type) {
          case "default":
            const _as = importItem.import.as;
            const _name = importItem.import.name;
            return `import ${_as ? `* as ${_name}` : _name} from "${
              importItem.from
            }";`;
          case "named":
            return `import {${importItem.import.names.join(", ")}} from "${
              importItem.from
            }";`;

          default:
            throw new Error("Invalid import type");
        }
      default:
        throw new Error("Invalid import type");
    }
  });
};
