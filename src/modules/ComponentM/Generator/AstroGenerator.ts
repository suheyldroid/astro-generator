import ejs from "ejs";
import _path from "path";
import { TAstroComponent, TComponentGenerator } from "@/services/types";
import { TProp } from "@/services/validation/schemas";

export const AstroGenerator: TComponentGenerator<TAstroComponent> = async ({
  componentRegisty,
  component,
  imports,
}) => {
  const content = await ejs.renderFile("./src/templates/components/astro.ejs", {
    name: component.name,
    imports,
    props: prepareArgs(component.props),
    serverJs: component.serverJs,
    clientJs: component.clientJs,
    clientArgs: component.clientProps,
    html: component.content,
  });
  return content;
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
