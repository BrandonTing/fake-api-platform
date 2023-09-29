// import db from "$lib/db"
import { convertToZodSchema, type APISchema } from "$lib/schema"


export type API = APISchema & {
    id: string,
}

export const load = async () => {
    // const data = await db.api.findMany()
    const jsonSchema = "{\"type\":\"object\",\"properties\":{\"eee\":{\"type\":\"string\",\"format\":\"date-time\"}},\"required\":[\"eee\"],\"additionalProperties\":false,\"$schema\":\"http://json-schema.org/draft-07/schema#\"}"
    // console.log(data[-1]?.request_schema)
    const zodSchema = convertToZodSchema(JSON.parse(jsonSchema));
    zodSchema.safeParse({})
    const list = [
        {
            id: "1",
            name: "api 1",
            description: "test description",
            path: "/test",
            method: "POST",
            request: [],
            response: []
        },
        {
            id: "2",
            name: "api 2",
            description: "test description",
            path: "/test",
            method: "POST",
            request: [],
            response: []
        }

    ] satisfies Array<API>
    return {
        list
    }
}
