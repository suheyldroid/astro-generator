import { Config } from "../types/config.types";
import { Astro } from "./modules/Astro";
import {
  ComponentGenerator,
  GeneratorRegistry,
} from "./modules/Component/Generator/GeneratorRegistry";
import { PageRegistry } from "./modules/Page/PageRegistry";
import { ComponentRegistry } from "./modules/component/ComponentRegistry";

export class App {
  astro: Astro;
  componentRegistry: ComponentRegistry;
  pageRegistry: PageRegistry;
  generatorRegistry: GeneratorRegistry;

  constructor(
    readonly config: Config,
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
