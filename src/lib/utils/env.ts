import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    GITHUB_OAUTH_CLIENTID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRETS: z.string(),
})

envSchema.parse(process.env)
export default process.env as z.infer<typeof envSchema>
