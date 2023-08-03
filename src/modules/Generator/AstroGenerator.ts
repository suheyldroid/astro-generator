import { Arg, ClassicComponent, Import } from "../../../types/component.types";
import { prepareImports } from "../../helpers/generateImports";
import { ComponentGenerator } from "./GeneratorRegistry";

export const AstroGenerator: ComponentGenerator<ClassicComponent> = ({
  componentRegisty,
  args,
  imports,
  name,
  component,
}) => {
  const fileName = "component_" + component.id + ".astro";
  const path = "/components/" + fileName;
  return {
    content: `---
// ${component.name}.js
${prepareImports(imports, componentRegisty)}
${prepareArgs(args)}
${component.serverSideJs}
---
${component.html}
<script define:vars={{a}}>
${component.clientSideJs}
</script>
`,
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
