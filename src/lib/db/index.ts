import env from "$lib/utils/env";
import { createClient } from "@libsql/client";
import { drizzle } from 'drizzle-orm/libsql';

const { DATABASE_AUTH_TOKEN, DATABASE_URL } = env

export const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
export default drizzle(client);
