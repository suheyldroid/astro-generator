import ejs from "ejs";
import _path from "path";
import { TAstroComponent, TComponentGenerator } from "@/services/types";
import { TProp } from "@/services/validation/schemas";

export const AstroGenerator: TComponentGenerator<TAstroComponent> = async ({
  component,
  imports,
}) => {
  const content = await ejs.renderFile("./src/templates/components/astro.ejs", {
    ...component,
    imports,
    props: prepareArgs(component.props),
  });
  return content;
};

const prepareArgs = (componentProps: TProp[]) => {
  const props = componentProps.map((prop) => {
    return prop.defaultValue
      ? ` ${prop.name}=${JSON.stringify(prop.defaultValue)}`
      : ` ${prop.name}`;
  });

  return `const {${props.join(", ")}} = Astro.props;`;
};
