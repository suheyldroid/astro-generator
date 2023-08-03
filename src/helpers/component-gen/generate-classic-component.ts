import { Arg, ClassicComponent } from "../../types/component.types";

export function generateClassicComponent(component: ClassicComponent) {
  const args = prepareArgs(component.args);
  return `---
  // ${component.name}.js
    ${args}
   ${component.serverSideJs}
---
   ${component.html}
   <script define:vars={{a}}>
   ${component.clientSideJs}
   </script>
   `;
}

const prepareArgs = (componentArgs: Arg[]) => {
  let _args = "";
  componentArgs.forEach((arg) => {
    _args += arg.default ? ` ${arg.name}=${arg.default}` : ` ${arg.name}`;
  });
  _args = _args.trim();
  _args = `const {${_args}} = Astro.props;`;
  return _args;
};
