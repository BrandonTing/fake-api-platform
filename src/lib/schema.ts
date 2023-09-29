import { z } from "zod";

const methods = z.literal("POST").or(z.literal("GET"))

export type Methods = z.infer<typeof methods>

export const apiSchema = z.object({
    name: z.string(),
    description: z.string(),
    path: z.string(),
    method: methods,
    inputs: z.array(z.object({
        key: z.string(),
        type: z.string()
    })),
    outputs: z.array(z.object({
        key: z.string(),
        type: z.string()
    }))
})

export type APISchema = z.infer<typeof apiSchema>