import { TComponent } from "@/services/types";
import { render } from "ejs";
import { ComponentExts } from "./config";
import path from "path";
import { PathResolver } from "../PathResolver";

export class ComponentPathResolver {
  constructor(readonly pathResolver: PathResolver) {}

  private get fileTemplate() {
    return this.pathResolver.template.filePath;
  }

  name(component: TComponent) {
    return render(this.fileTemplate.component.fileName, {
      id: component.id,
      ext: ComponentExts[component.type],
    });
  }

  path() {
    return this.fileTemplate.component.path;
  }
  fullPath(component: TComponent) {
    return path.join(this.path(), this.name(component));
  }

  import(component: TComponent) {
    return this.pathResolver.import(
      this.fullPath(component),
      component.imports
    );
  }
}
