export const prerender = false;

import type { APIRoute } from "astro";
import {getAuth} from "../../lib/lucia.ts";

export const GET: APIRoute = async (context) => {
    const auth = getAuth(context.locals.runtime);
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validate();
    if (session) {
        await auth.invalidateSession(session.sessionId);
    }
    return new Response(null, {
        headers: {
            Location: "/"
        },
        status: 302
    });
};