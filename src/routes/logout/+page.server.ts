import type { Actions } from "./$types";
import { auth } from "$lib/auth/lucia";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ locals }) => {
        const session = await locals.auth.validate();
        if (!session) return fail(401);
        await auth.invalidateSession(session.sessionId); // invalidate session
        locals.auth.setSession(null); // remove cookie
        throw redirect(302, "/"); // redirect to login page
    }

}