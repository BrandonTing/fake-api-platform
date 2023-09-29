// import db from "$lib/db";
import { apiSchema, } from "$lib/schema";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
export const load: PageServerLoad = () => {
    return {
        form: superValidate(apiSchema)
    };
};
export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const form = await superValidate(request, apiSchema);
            console.log(form)
            if (!form.valid) {
                return fail(400, {
                    form
                });
            }
            // await db.api.create({
            //     data: {
            //         ...form.data,
            //         input_schema: "[]",
            //         response_schema: "[]"
            //     }
            // })  
            console.log(form)

            return { form, isSuccess: true }
        } catch (err) {
            console.log(err)
            return { isSuccess: false }
        }
    },
};