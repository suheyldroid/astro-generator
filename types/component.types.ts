export type ClassicComponent = {
  id: string;
  type: "classic";
  name: string;
  serverSideJs: string;
  clientSideJs: string;
  html: string;
  import: Import[]
  args: Arg[];
};

export type ReactComponent = {
  id: string;
  type: "react";
  name: string;
  import: Import[];
  jsx: string;
  args: Arg[];
};

export type Arg = {
  name: string;
  type: string;
  default: string;
};

export type Import = ComponentImport | ModuleImport;
export type ComponentImport = {
  type: "component";
  id: Component["id"];
};
export type ModuleImport = {
  type: "module";
  from: string;
  import:
    | {
        type: "default";
        name: string;
        as?: boolean;
      }
    | {
        type: "named";
        names: string[];
      };
};

export type Component = ClassicComponent | ReactComponent;
