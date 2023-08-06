import { App } from "@/App";
import { TImport } from "@/services/types";
import { render } from "ejs";
import fs from "fs";
import path from "path";

const ComponentExts = {
  react: "jsx",
  astro: "astro",
  vue: "vue",
  svelte: "svelte",
  angular: "ts",
};

const filePathInfo: Record<FileType, FilePathInfo> = {
  component: {
    path: "src/components/",
    fileName: "component_<%= id %>.<%= ext %>",
  },
  page: {
    path: "src/pages/<%= path %>",
    fileName: "index.astro",
  },
};

export class PathResolver {
  constructor(readonly app: App) {}

  trimPath(path: string) {
    return path.split("/").filter(Boolean).join("/");
  }

  getComponentPath() {
    return this.trimPath(filePathInfo.component.path);
  }

  getPagePath(pageId: string) {
    const page = this.app.pageRegistry.get(pageId);
    const pagePath = render(filePathInfo.page.path, {
      path: page.page.path,
    });
    return this.trimPath(pagePath);
  }

  getComponentName(componentId: string) {
    const component = this.app.componentRegistry.get(componentId);
    return render(filePathInfo.component.fileName, {
      id: component.component.id,
      ext: ComponentExts[component.component.type],
    });
  }

  getPageFullPath(pageId: string) {
    return path.join(this.getPagePath(pageId), filePathInfo.page.fileName);
  }

  getComponentFullPath(componentId: string) {
    return path.join(
      this.getComponentPath(),
      this.getComponentName(componentId)
    );
  }

  relativeBetween(from: string, to: string) {
    return path.relative(from, to);
  }

  import(importTo: string, imports: TImport[]) {
    return imports.map((imp) => {
      switch (imp.type) {
        case "component":
          const componentPath = this.getComponentFullPath(imp.componentId);
          return this.relativeBetween(importTo, componentPath);
        case "module":
          switch (imp.import.type) {
            case "named":
              return render(importTemplate.module.named, {
                names: imp.import.names,
                module: imp.module,
              });
            case "default":
              const template = imp.import.all
                ? importTemplate.module.all
                : importTemplate.module.default;
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

  importToPage(pageId: string) {
    const page = this.app.pageRegistry.get(pageId);
    const imports = page.page.imports;
    return this.import(this.getPageFullPath(pageId), imports);
  }

  getComponentImports(componentId: string) {
    const component = this.app.componentRegistry.get(componentId);
    const imports = component.component.imports;
    return this.import(this.getComponentFullPath(componentId), imports);
  }

  /* sync(type: FileType, id: string) {
    switch (type) {
      case FileType.Component:
        const component = this.app.componentRegistry.get(id);
        const path = this.resolveComponentPath(id);
        fs.writeFileSync(path, component.code!);
        break;
      case FileType.Page:
        const page = this.app.pageRegistry.get(id);
        const pagePath = this.resolvePagePath(id);
        fs.writeFileSync(pagePath, page.code!);
        break;
      default:
        throw new Error("Invalid file type");
    }
  } */
}

const importTemplate = {
  component: "import <%= name %> from '<%= path %>'",
  module: {
    named: "import { <% names.join(', ') %> } from '<%= module %>'",
    default: "import <%= name %> from '<%= module %>'",
    all: "import * as <%= name %> from '<%= module %>'",
  },
};

export enum FileType {
  Component = "component",
  Page = "page",
}

type FilePathInfo = {
  path: string;
  fileName: string;
};
