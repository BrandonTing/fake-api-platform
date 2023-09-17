

export type API = {
    name: string,
    description: string
    path: string,
    type: "POST" | "GET"
}

export const load = async () => {
    const list = [
        {
            name: "api 1",
            description: "test description",
            path: "/test",
            type: "POST"
        },
        {
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
