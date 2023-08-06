export const ComponentExts = {
  react: "jsx",
  astro: "astro",
  vue: "vue",
  svelte: "svelte",
  angular: "ts",
};

export enum FileType {
  Component = "component",
  Page = "page",
}

export type FilePathInfo = {
  path: string;
  fileName: string;
};
