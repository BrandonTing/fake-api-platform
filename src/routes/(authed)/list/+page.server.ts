import db from "$lib/db"
import { apiSchema, } from "$lib/schema"
import { z } from "zod"

const schema = apiSchema.merge(z.object({
    id: z.string()
}))

export type API = z.infer<typeof schema>

export const load = async () => {
    console.log('load')
    const data = await db.api.findMany({
        include: {
            schemas: true
        }
    })
    const list = data.map(({ schemas, ...rest }) => {
        const requestSchemas = schemas.filter(schema => schema.usage === "request")
        const responseSchemas = schemas.filter(schema => schema.usage === "response")
        const api = {
            ...rest,
            request: requestSchemas,
            response: responseSchemas
        }

        const parse = schema.safeParse(api)
        if (!parse.success) return
        return parse.data
    }).filter(Boolean)
    return {
        list
    }
}
