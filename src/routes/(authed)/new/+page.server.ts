// import db from "$lib/db";
import db from "$lib/db";
import { apiSchema, buildSchema, } from "$lib/schema";
import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { zodToJsonSchema } from "zod-to-json-schema";

export const load: PageServerLoad = () => {
    return {
        form: superValidate(apiSchema)
    };
};
export const actions: Actions = {
    default: async (event) => {
        try {
            const form = await superValidate(event.request, apiSchema);
            if (!form.valid) {
                return fail(400, {
                    form
                });
            }
            const { request, response, ...rest } = form.data
            await db.api.create({
                data: {
                    ...rest,
                    request_schema: JSON.stringify(zodToJsonSchema(buildSchema(request))),
                    response_schema: JSON.stringify(zodToJsonSchema(buildSchema(response))),
                }
            })

            // redirect to list page when success
            redirect(307, "/list")
            return { form, isSuccess: true }
        } catch (err) {
            console.log(err)
            return { isSuccess: false }
        }
    },
};