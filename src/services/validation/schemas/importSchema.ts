import { z } from "zod";

export const namedImportNameSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    as: z.string(),
  }),
]);

export const namedModueImportSchema = z.object({
  type: z.literal("named"),
  names: z.array(namedImportNameSchema),
});

export const defaultModuleImportSchema = z.object({
  type: z.literal("default"),
  name: z.string(),
  all: z.boolean().optional().default(false),
});

export const moduleImportSchema = z.object({
  type: z.literal("module"),
  module: z.string(),
  import: z.discriminatedUnion("type", [
    defaultModuleImportSchema,
    namedModueImportSchema,
  ]),
});

export const componentImportSchema = z.object({
  type: z.literal("component"),
  componentId: z.string(),
});

export const importSchema = z.discriminatedUnion("type", [
  moduleImportSchema,
  componentImportSchema,
]);
