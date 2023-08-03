import { ComponentGenerator } from "./GeneratorRegistry";
import { ReactComponent } from "../../../types/component.types";
import { prepareImports } from "../../helpers/generateImports";

const ReactGenerator: ComponentGenerator<ReactComponent> = ({
  componentRegisty,
  imports,
  args,
  name,
  component,
}) => {
  const fileName = "component_" + component.id + ".jsx";
  const path = "/components/" + fileName;
  return {
    content: `${prepareImports(imports, componentRegisty)}
export default function Component_${component.id}(${args
      .map((arg) => arg.name)
      .join(", ")}) {
${component.jsx}
}
    `,
    fileName,
    path,
  };
};

export { ReactGenerator };
