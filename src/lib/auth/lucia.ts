// src/lib/server/lucia.ts
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { client } from "$lib/db";
import env from "$lib/utils/env";
import { discord } from "@lucia-auth/oauth/providers";

export const auth = lucia({
    adapter: libsql(client, {
        user: "user",
        key: "user_key",
        session: "user_session"
    }),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),

    getUserAttributes: (data) => {
        return {
            discordUsername: data.username
        };
    }
});

export const discordAuth = discord(auth, {
    clientId: env.DISCORD_OAUTH_CLIENTID,
    clientSecret: env.DISCORD_OAUTH_CLIENT_SECRETS,
    redirectUri: "http://localhost:5173/list"
});

export type Auth = typeof auth;
