import { TPage } from "@/services/types";
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

  get(pageId: string): Page {
    const page = this.pages.find((page) => page.page.id === pageId);
    if (!page) throw new Error("Page not found");
    return page;
  }
}
