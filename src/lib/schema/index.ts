import { type ZodSchema, z } from "zod";

const methods = z.literal("POST").or(z.literal("GET"))

export type Methods = z.infer<typeof methods>

export const primitiveKeysSchema = z.union([
    z.literal("string"),
    z.literal("dateTime"),
    z.literal("int"),
    z.literal("number"),
    z.literal("boolean"),
])

const typeParamSchema = z.object({
    key: z.string().min(1),
    type: primitiveKeysSchema
})

export const apiSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional().default(""),
    path: z.string().min(1),
    method: methods,
    request: z.array(typeParamSchema),
    response: z.array(typeParamSchema)
})

export type APISchema = z.infer<typeof apiSchema>

export const primitives = {
    string: z.string(),
    dateTime: z.string().datetime(),
    int: z.number().int().positive(),
    number: z.number(),
    boolean: z.boolean(),
} satisfies Record<z.infer<typeof primitiveKeysSchema>, ZodSchema>

export type PrimitiveKeys = keyof typeof primitives

