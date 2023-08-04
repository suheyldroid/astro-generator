import { App } from "../../App";
import { Page, PageType } from "./Page";

export class PageRegistry {
  pages: Page[] = [];

  constructor(readonly m: App) {}
  
  register(pages: PageType[]) {
    this.pages = pages.map((page) => new Page(page));
  }

  async generate() {
    for (const page of this.pages) {
      await page.generate(this.m.componentRegistry);
    }
  }

  sync() {
    this.pages.forEach((page) => page.sync());
  }
}
