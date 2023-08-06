import fs from "fs";
import ejs from "ejs";
import { TPage } from "@/services/types";

export class Page {
  private _code: string | undefined;
  constructor(readonly page: TPage) {}

  async generate() {
    this._code = await ejs.renderFile("./src/templates/pages/page.ejs", {});
  }

  get code(): string {
    if (!this.isGenerated) throw new Error("Page not generated");
    return this.code;
  }

  get isGenerated() {
    return !!this.code;
  }
}
