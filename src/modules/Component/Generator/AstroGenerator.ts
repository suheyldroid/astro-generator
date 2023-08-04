import ejs from "ejs";
import {
  Arg,
  ClassicComponent,
  Import,
} from "../../../../types/component.types";
import { prepareImports } from "../../../helpers/generateImports";
import { ComponentGenerator } from "./GeneratorRegistry";
import _path from "path";
import { existsSync } from "fs";
export const AstroGenerator: ComponentGenerator<ClassicComponent> = async ({
  componentRegisty,
  args,
  imports,
  name,
  component,
}) => {
  const fileName = "component_" + component.id + ".astro";
  const path = "/components/" + fileName;

  const content = await ejs.renderFile("./src/templates/components/astro.ejs", {
    name,
    imports: prepareImports(imports, componentRegisty),
    args: prepareArgs(args),
    serverJs: component.serverSideJs,
    clientJs: component.clientSideJs,
    clientArgs: ["a"],
    html: component.html,
  });
  return {
    content,
    fileName,
    path,
  };
};

const prepareArgs = (componentArgs: Arg[]) => {
  let _args = "";
  componentArgs.forEach((arg) => {
    _args += arg.default ? ` ${arg.name}=${arg.default}` : ` ${arg.name}`;
  });
  _args = _args.trim();
  _args = `const {${_args}} = Astro.props;`;
  return _args;
};
