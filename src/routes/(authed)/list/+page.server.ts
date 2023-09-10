

export type API = {
    name: string,
    description: string
    url: string,
    type: "POST" | "GET"
}

export const load = async () => {
    const list = [
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

    ] satisfies Array<API>
    return {
        list
    }
}
