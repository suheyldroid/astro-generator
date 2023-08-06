import { TComponent } from ".";

export type TComponentGenerator<T = TComponent> = (componentData: {
  component: T;
  imports: string[];
}) => Promise<string>;
