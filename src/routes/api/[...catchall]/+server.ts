import db from '$lib/db/index.js';
import { primitiveKeysSchema, primitives, } from '$lib/schema/index.js';
import type { Schema } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import { z, type AnyZodObject, type ZodSchema } from 'zod';
import { createFixture } from "zod-fixture"
function getSearchParamObj(searchParams: URLSearchParams) {
    const entries = searchParams.entries();
    const result: Record<string, string> = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    return result;

}

async function getSchema(path: string) {
    const schema = await db.api.findFirst({
        where: {
            path
        },
        select: {
            schemas: true
        }
    })
    if (!schema) {
        return [null, null]
    }
    const requestSchema = schema.schemas.filter(schema => schema.usage === 'request')
    const responseSchema = schema.schemas.filter(schema => schema.usage === 'response')
    return [requestSchema, responseSchema]
}

function genZodSchema(schema: Array<Schema>): AnyZodObject {
    return z.object(schema.reduce((pre, { type, required, min, max, key }) => {
        const verifyType = primitiveKeysSchema.safeParse(type)
        if (!verifyType.success) {
            return pre
        }
        const { data } = verifyType

        if (data === "boolean") {
            pre[key] = primitives[data]
            return pre
        }
        let schema = primitives[data];
        if (min) {
            schema = schema.min(min)
        }
        if (max) {
            schema = schema.max(max)
        }
        if (required) {
            pre[key] = schema.optional()
            return pre
        }
        pre[key] = schema
        return pre
    }, {} as Record<string, ZodSchema>))

}

async function handleRequest(path: string, request: Record<string, unknown>) {
    const [requestSchema, responseSchema] = await getSchema(path);
    if (requestSchema) {
        const requestZodSchema = genZodSchema(requestSchema);
        const validateInputs = requestZodSchema.safeParse(request);
        if (!validateInputs.success) {
            throw error(400, { message: "invalid parameters" })
        }
    }
    if (!responseSchema) {
        throw error(404, { message: "cannot find response schema " })
    }
    const responseZodSchema = genZodSchema(responseSchema);
    const data = createFixture(responseZodSchema)
    return json(data)

}

export async function GET({ url }) {
    const pathname = url.pathname.split('/api')[1];
    console.log(pathname)
    const input = getSearchParamObj(url.searchParams);
    return await handleRequest(pathname, input)
}


export async function POST({ request, url }) {
    const pathname = url.pathname.split('/api/')[1];
    const input = await request.json() as Record<string, unknown>;
    return await handleRequest(pathname, input)
}