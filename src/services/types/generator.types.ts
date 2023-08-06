import { ComponentRegistry } from "@/modules/ComponentM/ComponentRegistry";
import { TComponent } from ".";

export type TComponentGenerator<T = TComponent> = (componentData: {
  componentRegisty: ComponentRegistry;
  component: T;
  imports: string[];
}) => Promise<string>;
