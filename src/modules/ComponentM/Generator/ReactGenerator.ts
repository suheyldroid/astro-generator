import ejs from "ejs";
import { TComponentGenerator, TReactComponent } from "@/services/types";

const ReactGenerator: TComponentGenerator<TReactComponent> = async ({
  componentRegisty,
  component,
  imports,
}) => {
  const content = await ejs.renderFile("./src/templates/components/react.ejs", {
    component,
    name: component.name,
    imports,
    props: component.props.map((prop) => prop.name),
    content: component.content,
    id: component.id,
  });

  return content;
};

export { ReactGenerator };
