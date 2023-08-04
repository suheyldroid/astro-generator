import { TImport } from "@/types";
import { ComponentRegistry } from "../modules/ComponentM/ComponentRegistry";

export const prepareImports = (
  componentImports: TImport[],
  componentRegistry: ComponentRegistry
) => {
  return componentImports.map((importItem) => {
    switch (importItem.type) {
      case "component":
        const type = componentRegistry.get(importItem.componentId)?.component
          .type;
        const fileName = type === "react" ? "jsx" : "astro";
        return `import Component_${importItem.componentId} from "./component_${importItem.componentId}.${fileName}";`;
      case "module":
        switch (importItem.import.type) {
          case "default":
            const _as = importItem.import.as;
            const _name = importItem.import.name;
            return `import ${_as ? `* as ${_name}` : _name} from "${
              importItem.module
            }";`;
          case "named":
            return `import {${importItem.import.names.join(", ")}} from "${
              importItem.module
            }";`;

          default:
            throw new Error("Invalid import type");
        }
      default:
        throw new Error("Invalid import type");
    }
  });
};
