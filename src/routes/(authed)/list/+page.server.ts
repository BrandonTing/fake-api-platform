import type { PageServerLoad } from "./$types";

type API = {
    name: string,
    description: string
    url: string,
    type: "POST" | "GET"
}

export const load: PageServerLoad<Promise<{ list: Array<API> }>> = async () => {
    return {
        list: [
            {
                name: "api 1",
                description: "test description",
                url: "/test",
                type: "POST"
            },
            {
                name: "api 2",
                description: "test description",
                url: "/test",
                type: "POST"
            }

        ]
    }

};