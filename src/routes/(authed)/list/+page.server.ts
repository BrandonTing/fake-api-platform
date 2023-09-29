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
            method: "POST",
            inputs: [],
            outputs: []
        },
        {
            id: "2",
            name: "api 2",
            description: "test description",
            path: "/test",
            method: "POST",
            inputs: [],
            outputs: []
        }

    ] satisfies Array<API>
    return {
        list
    }
}
