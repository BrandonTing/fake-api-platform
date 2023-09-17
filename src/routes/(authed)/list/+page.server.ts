

export type API = {
    id: string,
    name: string,
    description: string
    path: string,
    type: "POST" | "GET"
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
