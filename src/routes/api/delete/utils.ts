import { z } from "zod";

export const deleteParamSchema = z.object({
    id: z.string()
})

