import ejs from "ejs";

import { prepareImports } from "../../../helpers/generateImports";
import { ComponentGenerator } from "./GeneratorRegistry";
import _path from "path";
import { TAstroComponent } from "@/types";
import { TProp } from "@/services/validation/schemas";
export const AstroGenerator: ComponentGenerator<TAstroComponent> = async ({
  componentRegisty,
  component,
}) => {
  const fileName = "component_" + component.id + ".astro";
  const path = "/components/" + fileName;

  const content = await ejs.renderFile("./src/templates/components/astro.ejs", {
    name: component.name,
    imports: prepareImports(component.imports, componentRegisty),
    props: prepareArgs(component.props),
    serverJs: component.serverJs,
    clientJs: component.clientJs,
    clientArgs: component.clientProps,
    html: component.content,
  });
  return {
    content,
    fileName,
    path,
  };
};

const prepareArgs = (componentArgs: TProp[]) => {
  let _args = "";
  componentArgs.forEach((arg) => {
    _args += arg.defaultValue
      ? ` ${arg.name}=${arg.defaultValue}`
      : ` ${arg.name}`;
  });
  _args = _args.trim();
  _args = `const {${_args}} = Astro.props;`;
  return _args;
};
