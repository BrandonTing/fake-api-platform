import { error, json } from '@sveltejs/kit';
import { deleteParamSchema } from './utils.js';
import db from '$lib/db/index.js';

export async function POST({ request }) {

    const data = await request.json()
    const parsed = deleteParamSchema.safeParse(data);
    if (!parsed.success) {
        throw error(400, {
            message: "wrong parameters"
        })
    }
    await db.api.delete({
        where: {
            id: parsed.data.id
        }
    })
    return json({
        success: true
    })
}