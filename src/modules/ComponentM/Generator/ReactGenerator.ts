import ejs from "ejs";
import { TComponentGenerator, TReactComponent } from "@/services/types";

const ReactGenerator: TComponentGenerator<TReactComponent> = async ({
  component,
  imports,
}) => {
  const content = await ejs.renderFile("./src/templates/components/react.ejs", {
    ...component,
    imports,
  });

  return content;
};

export { ReactGenerator };
