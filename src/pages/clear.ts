export const prerender = false;

import type {APIContext} from "astro";

export async function GET(context : APIContext) {
    if (context.url.toString().startsWith("http://localhost")) {
        console.log("WARNING: DELETING USERS");
        let {DB} = (context.locals.runtime.env as { DB: D1Database });
        await DB
            .prepare('DELETE FROM user_key;')
            .run();
        await DB
            .prepare('DELETE FROM user_session;')
            .run();
        await DB
            .prepare('DELETE FROM email_verification_token;')
            .run();
        await DB
            .prepare('DELETE FROM password_reset_token;')
            .run();
        await DB
            .prepare('DELETE FROM user;')
            .run();
    } else {
        console.log("not deleting", context.url);
    }
    return new Response("Hello World!", {headers: {'content-type': 'text/html'}});
};