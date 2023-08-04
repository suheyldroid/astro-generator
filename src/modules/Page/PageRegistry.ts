import { TPage } from "@/types";
import { App } from "../../App";
import { Page } from "./Page";

export class PageRegistry {
  pages: Page[] = [];

  constructor(readonly m: App) {}

  register(pages: TPage[]) {
    this.pages = pages.map((page) => new Page(page));
  }

  async generate() {
    for (const page of this.pages) {
      await page.generate();
    }
  }

  sync() {
    this.pages.forEach((page) => page.sync());
  }
}
