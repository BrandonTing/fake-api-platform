// import db from "$lib/db";
import { apiSchema, type APISchema } from "$lib/schema";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
export const load: PageServerLoad = () => {
    return {
        form: superValidate(apiSchema)
    };
};
export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, apiSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        }
        // TODO insert
        const value = await event.request.json() as APISchema
        console.log(value)
        // await db.api.create({
        //     data: {
        //         ...value,

        //     }
        // })
        return {
            form
        };
    },
};