import { Arg, Component, Import } from "./component.types";

export type Config = {
  components: Component[];
  routes: Route[];
};

export type ConfigComponent = {
  type: string;
  name: string;
  id: string;
  import: Import[];
  args: Arg[];
  [key: string]: any;
};

export type Route = {
  title: string;
  component: Component["id"];
  path: string;
};
