import { json } from '@sveltejs/kit';

function getSearchParamObj(searchParams: URLSearchParams) {
    const entries = searchParams.entries();
    const result: Record<string, string> = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    return result;

}

export async function GET({ url }) {
    const pathname = url.pathname;
    const input = getSearchParamObj(url.searchParams);
    return json({
        pathname,
        input
    })
}


export async function POST({ request, url }) {
    const pathname = url.pathname;
    const input = await request.json();
    return json({
        pathname,
        input
    })
}