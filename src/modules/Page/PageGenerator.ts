import { ComponentRegistry } from "../component/ComponentRegistry";
import { Page } from "./Page";

export class PageRegistry {
  pages: Page[] = [];

  register(page: Page) {
    this.pages.push(page);
  }

  generate(componentRegistry: ComponentRegistry) {
    this.pages.forEach((page) => page.generate(componentRegistry));
  }

  sync() {
    this.pages.forEach((page) => page.sync());
  }
}
