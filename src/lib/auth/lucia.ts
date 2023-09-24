// src/lib/server/lucia.ts
import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { dev } from "$app/environment";
import env from "$lib/utils/env";
import { github } from "@lucia-auth/oauth/providers";
import client from '$lib/db/index'
import { prisma } from "@lucia-auth/adapter-prisma";


export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD",
    middleware: web(),
    sessionCookie: {
        expires: false
    },
    getUserAttributes: (data) => {
        return {
            githubUsername: data.username
        };
    }
});

export type Auth = typeof auth;

export const githubAuth = github(auth, {
    clientId: env.GITHUB_OAUTH_CLIENTID,
    clientSecret: env.GITHUB_OAUTH_CLIENT_SECRETS,
});

