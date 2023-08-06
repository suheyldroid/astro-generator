import { TPage } from "@/services/types";
import { render } from "ejs";
import path from "path";
import { PathResolver } from "../PathResolver";

export class PagePathResolver {
  constructor(readonly pathResolver: PathResolver) {}

  private get fileTemplate() {
    return this.pathResolver.template.filePath;
  }
  path(page: TPage) {
    return render(this.fileTemplate.page.path, {
      path: page.path,
    });
  }

  fullPath(page: TPage) {
    return path.join(this.path(page), this.fileTemplate.page.fileName);
  }

  import(page: TPage) {
    return this.pathResolver.import(this.fullPath(page), page.imports);
  }
}
