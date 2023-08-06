import { TComponent } from "@/services/types";
import fs from "fs";
import path from "path";
import { FilePathInfo, FileType } from "./config";

export class TemplatePathResolver {
  constructor(
    private readonly templatesFolderPath: string = "./src/templates"
  ) {
    if (!fs.existsSync(this.templatesFolderPath))
      throw new Error(
        `Templates folder does not exist at ${this.templatesFolderPath}`
      );
  }

  component(componentType: TComponent["type"]) {
    const componentsFolderPath = path.join(
      this.templatesFolderPath,
      "components",
      `${componentType}.ejs`
    );
    return fs.readFileSync(componentsFolderPath, "utf-8");
  }

  page() {
    const pagesFolderPath = path.join(
      this.templatesFolderPath,
      "pages",
      "page.ejs"
    );
    return fs.readFileSync(pagesFolderPath, "utf-8");
  }

  get import() {
    return {
      component: "import <%- tagName %> from '<%- path %>'",
      module: {
        named: "import { <%- names.join(', ') %> } from '<%- module %>'",
        default: "import <%- name %> from '<%- module %>'",
        all: "import * as <%- name %> from '<%- module %>'",
      },
    };
  }

  get filePath(): Record<FileType, FilePathInfo> {
    return {
      component: {
        path: "src/components/",
        fileName: "component_<%= id %>.<%= ext %>",
      },
      page: {
        path: "src/pages/<%= path %>",
        fileName: "index.astro",
      },
    };
  }
}
