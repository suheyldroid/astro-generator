import { ComponentGenerator } from "./GeneratorRegistry";

import { prepareImports } from "../../../helpers/generateImports";
import ejs from "ejs";
import { TReactComponent } from "@/types";

const ReactGenerator: ComponentGenerator<TReactComponent> = async ({
  componentRegisty,
  component,
}) => {
  const fileName = "component_" + component.id + ".jsx";
  const path = "/components/" + fileName;
  const content = await ejs.renderFile("./src/templates/components/react.ejs", {
    component,
    name: component.name,
    imports: prepareImports(component.imports, componentRegisty),
    props: component.props.map((prop) => prop.name),
    content: component.content,
    id: component.id,
  });
  return {
    content,
    fileName,
    path,
  };
};

export { ReactGenerator };
