// // routes/+page.server.ts
// import { redirect } from "@sveltejs/kit";

// import type { LayoutServerLoad, } from "./$types";

// export const load: LayoutServerLoad = async ({ locals }) => {
//     const session = await locals.auth.validate();
//     if (!session) throw redirect(302, "/");
//     return {
//         userId: session.user.userId,
//         githubUsername: session.user.githubUsername
//     };
// };

