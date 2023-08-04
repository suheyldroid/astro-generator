import { Astro } from "./modules/Astro";
import {
  ComponentGenerator,
  GeneratorRegistry,
} from "./modules/ComponentM/Generator/GeneratorRegistry";
import { PageRegistry } from "./modules/Page/PageRegistry";
import { ComponentRegistry } from "./modules/ComponentM/ComponentRegistry";
import { TConfig } from "@/types";

export class App {
  astro: Astro;
  componentRegistry: ComponentRegistry;
  pageRegistry: PageRegistry;
  generatorRegistry: GeneratorRegistry;

  constructor(
    readonly config: TConfig,
    readonly generators: Record<string, ComponentGenerator<any>>
  ) {
    this.astro = new Astro(this);
    this.componentRegistry = new ComponentRegistry(this);
    this.pageRegistry = new PageRegistry(this);
    this.generatorRegistry = new GeneratorRegistry(this);
  }

  async initialize() {
    await this.astro.initialize();
    this.componentRegistry.register(this.config.components);
    this.pageRegistry.register(this.config.routes);
    this.generatorRegistry.register(this.generators);
  }

  async setup() {
    await this.componentRegistry.generate();
    await this.pageRegistry.generate();
    this.componentRegistry.sync();
    this.pageRegistry.sync();
  }
}
