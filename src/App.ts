import { Astro } from "./modules/Astro";
import { GeneratorRegistry } from "./modules/ComponentM/Generator/GeneratorRegistry";
import { PageRegistry } from "./modules/Page/PageRegistry";
import { ComponentRegistry } from "./modules/ComponentM/ComponentRegistry";
import { TComponentGenerator, TConfig } from "@/services/types";
import { PathResolver } from "./modules/PathResolver/PathResolver";

export class App {
  astro: Astro;
  componentRegistry: ComponentRegistry;
  pageRegistry: PageRegistry;
  generatorRegistry: GeneratorRegistry;
  pathResolver: PathResolver;
  constructor(
    readonly config: TConfig,
    readonly generators: Record<string, TComponentGenerator<any>>
  ) {
    this.astro = new Astro(this);
    this.componentRegistry = new ComponentRegistry(this);
    this.pageRegistry = new PageRegistry(this);
    this.generatorRegistry = new GeneratorRegistry(this);
    this.pathResolver = new PathResolver(this);
  }

  async initialize() {
    /* await this.astro.initialize(); */
    this.componentRegistry.register(this.config.components);
    this.pageRegistry.register(this.config.pages);
    this.generatorRegistry.register(this.generators);
  }

  async generate() {
    await this.componentRegistry.generate();
    await this.pageRegistry.generate();
  }
}
