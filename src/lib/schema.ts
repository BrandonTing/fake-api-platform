import { z } from "zod";

export const apiSchema = z.object({
    name: z.string(),
    description: z.string(),
    path: z.string(),
    type: z.literal("POST").or(z.literal("GET"))
})

export type APISchema = z.infer<typeof apiSchema>