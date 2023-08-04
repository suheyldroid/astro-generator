import { ComponentGenerator } from "./GeneratorRegistry";
import { ReactComponent } from "../../../../types/component.types";
import { prepareImports } from "../../../helpers/generateImports";
import ejs from "ejs";

const ReactGenerator: ComponentGenerator<ReactComponent> = async ({
  componentRegisty,
  imports,
  args,
  name,
  component,
}) => {
  const fileName = "component_" + component.id + ".jsx";
  const path = "/components/" + fileName;
  const content = await ejs.renderFile(
    "./src/templates/components/react.ejs",
    {
      name,
      imports: prepareImports(imports, componentRegisty),
      args: args.map((arg) => arg.name),
      jsx: component.jsx,
      id: component.id,
    }
  );
  return {
    content,
    fileName,
    path,
  };
};

export { ReactGenerator };
