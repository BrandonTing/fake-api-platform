import { parseSchema } from "json-schema-to-zod";
import { type ZodSchema, z } from "zod";
import type { JsonSchema7AnyType } from "zod-to-json-schema/src/parsers/any";

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

export function buildSchema(params: z.infer<typeof typeParamSchema>[]): ZodSchema {
    return z.object(params
        .reduce((pre, { key, type }) => {
            pre[key] = primitives[type];
            return pre
        }, {} as Record<string, ZodSchema>))
}


export function convertToZodSchema(jsonSchema: JsonSchema7AnyType): ZodSchema {
    const zodSchema = parseSchema(jsonSchema)

    const args = '...args'
    const convert = new Function(args, `const [z] = args; const schema = ${zodSchema}; return schema;`)

    // obviously typings via `infer` are not available here as the json schema is coming in at runtime
    // but the parse and typescript conversion using zodToTs works just fine

    return convert(z) as ZodSchema
}