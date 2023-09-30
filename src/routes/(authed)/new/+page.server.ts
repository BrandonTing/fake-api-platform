// import db from "$lib/db";
import db from "$lib/db";
import { apiSchema, } from "$lib/schema";
import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

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
            const { request, response, ...rest } = form.data;
            await db.api.create({
                data: {
                    ...rest,
                    schemas: {
                        createMany: {
                            data: request.map((res) => {
                                return {
                                    ...res,
                                    usage: "request",
                                }
                            }).concat(response.map(res => {
                                return {
                                    ...res,
                                    usage: "response"
                                }
                            }))
                        }
                    }
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