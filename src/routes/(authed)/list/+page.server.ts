import type { APISchema } from "$lib/schema"


export type API = APISchema & {
    id: string,
}

export const load = async () => {
    const list = [
        {
            id: "1",
            name: "api 1",
            description: "test description",
            path: "/test",
            type: "POST"
        },
        {
            id: "2",
            name: "api 2",
            description: "test description",
            path: "/test",
            type: "POST"
        }

    ] satisfies Array<API>
    return {
        list
    }
}
