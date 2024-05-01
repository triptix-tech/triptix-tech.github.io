export const prerender = false;

import {parseCookie} from "lucia/utils";
import {OAuthRequestError} from "@lucia-auth/oauth";
import {getAuth, getGitHubAuth} from "../../../lib/lucia.ts";
import type {APIRoute} from "astro";

export const get: APIRoute = async (context) => {
    const request = context.request;
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    const storedState = cookies.github_oauth_state;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400
        });
    }

    const auth = getAuth(context.locals.runtime);
    const githubAuth = getGitHubAuth(auth);
    try {
        const {getExistingUser, githubUser, createUser} =
            await githubAuth.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) {
                return existingUser;
            }
            console.log('new user with email: ', githubUser.email);
            const user = await createUser({
                attributes: {
                    email: githubUser.email,
                    email_verified: 1
                }
            });
            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const sessionCookie = auth.createSessionCookie(session);
        return new Response(null, {
            headers: {
                Location: "/auth/ccp/apikeys",
                "Set-Cookie": sessionCookie.serialize() // store session cookie
            },
            status: 302
        });
    } catch (e) {
        console.log({ message: e });
        if (e instanceof OAuthRequestError) {
            // invalid code
            console.log(e.request);
            console.log(JSON.stringify(e.request.headers.entries()));
            console.log(e.response);
            console.log(await e.response.text());
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
};