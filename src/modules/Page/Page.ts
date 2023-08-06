import ejs from "ejs";
import { TPage } from "@/services/types";

export class Page {
  private _code: string | undefined;
  constructor(readonly page: TPage) {}

  async generate(imports: string[]) {
    this._code = await ejs.renderFile("./src/templates/pages/page.ejs", {
      ...this.page,
      imports,
    });
  }

  get code(): string {
    if (!this.isGenerated) throw new Error("Page not generated");
    return this._code!;
  }

  get isGenerated() {
    return !!this._code;
  }
}
