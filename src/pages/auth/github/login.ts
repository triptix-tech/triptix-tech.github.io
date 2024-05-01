export const prerender = false;

import type { APIRoute } from "astro";
import {getAuth, getGitHubAuth} from "../../../lib/lucia.ts";

export const GET: APIRoute = async (context) => {
    const [url, state] = await getGitHubAuth(getAuth(context.locals.runtime)).getAuthorizationUrl();
    context.cookies.set("github_oauth_state", state, {
        httpOnly: true,
        secure: !import.meta.env.DEV,
        path: "/",
        maxAge: 60 * 60
    });
    return context.redirect(url.toString(), 302);
};