import { App } from "@/App";
import { TImport } from "@/services/types";
import { render } from "ejs";
import path from "path";
import { ComponentPathResolver } from "./resolvers/ComponentPathResolver";
import { PagePathResolver } from "./resolvers/PagePathResolver";
import { TemplatePathResolver } from "./resolvers/TemplatePathResolver";
import { Sync } from "./Sync";

export class PathResolver {
  private _componentResolver: ComponentPathResolver;
  private _pageResolver: PagePathResolver;
  private _templateResolver: TemplatePathResolver;
  private _sync: Sync;
  constructor(readonly app: App) {
    this._componentResolver = new ComponentPathResolver(this);
    this._pageResolver = new PagePathResolver(this);
    this._templateResolver = new TemplatePathResolver();
    this._sync = new Sync(this);
  }

  get component() {
    return this._componentResolver;
  }

  get page() {
    return this._pageResolver;
  }

  get template() {
    return this._templateResolver;
  }

  get projectRoot() {
    return "astro";
  }

  relativeBetween(from: string, to: string) {
    const fromDir = path.dirname(from);
    const relative = path.relative(fromDir, to);
    return `./${relative}`;
  }

  import(importTo: string, imports: TImport[]) {
    const importTemplates = this.template.import;
    return imports.map((imp) => {
      switch (imp.type) {
        case "component":
          const component = this.app.componentRegistry.get(imp.componentId);
          const componentPath = this.component.fullPath(component.component);
          return render(importTemplates.component, {
            tagName: component.component.tagName,
            path: this.relativeBetween(importTo, componentPath),
          });
        case "module":
          switch (imp.import.type) {
            case "named":
              return render(importTemplates.module.named, {
                names: imp.import.names,
                module: imp.module,
              });

            case "default":
              const template = imp.import.all
                ? importTemplates.module.all
                : importTemplates.module.default;
              return render(template, {
                name: imp.import.type,
              });
            default:
              throw new Error("Invalid import type");
          }
        default:
          throw new Error("Invalid import type");
      }
    });
  }

  get sync() {
    return this._sync;
  }
}
