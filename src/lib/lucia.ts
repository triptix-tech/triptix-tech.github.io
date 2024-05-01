import type {AdvancedRuntime} from "@astrojs/cloudflare";

export const prerender = false;

import type {D1Database} from "@cloudflare/workers-types";

import {Auth, lucia} from "lucia";
import {astro} from "lucia/middleware";
import {generateRandomString, isWithinExpiration} from "lucia/utils";
import {d1} from "@lucia-auth/adapter-sqlite";
import {github, google} from "@lucia-auth/oauth/providers";
import {Kysely} from 'kysely';
import {D1Dialect} from 'kysely-d1';
import type {Database, EmailVerificationToken} from "../db.ts";


export function isEmailValid(str: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isPasswordValid(str: string) {
    return str.length >= 8 && str.length <= 255;
}

export function getAuth(runtime:Object) {
    let {DB} = (runtime.env as { DB: D1Database });
    if (!DB) {
        console.log('DB not found');
        throw new Error('DB not found');
    }
    return lucia({
        adapter: d1(DB, {
            user: "user",
            key: "user_key",
            session: "user_session"
        }),
        middleware: astro(),
        env: import.meta.env.DEV ? "DEV" : "PROD",
        getUserAttributes: (data) => {
            return {
                email: data.email,
                emailVerified: Boolean(data.email_verified)
            };
        }
    });
}

export function getGitHubAuth(auth:Auth) {
    console.assert(import.meta.env.GITHUB_CLIENT_ID);
    console.assert(import.meta.env.GITHUB_CLIENT_KEY);
    return github(auth, {
        clientId: import.meta.env.GITHUB_CLIENT_ID,
        clientSecret: import.meta.env.GITHUB_CLIENT_KEY
    });
}

export function getGoogleAuth(auth:Auth) {
    console.assert(import.meta.env.GOOGLE_CLIENT_ID);
    console.assert(import.meta.env.GOOGLE_CLIENT_KEY);
    console.assert(import.meta.env.GOOGLE_REDIRECT_URL);
    return google(auth, {
        clientId: import.meta.env.GOOGLE_CLIENT_ID,
        clientSecret: import.meta.env.GOOGLE_CLIENT_KEY,
        redirectUri: import.meta.env.GOOGLE_REDIRECT_URL,
        scope: ['email']
    });
}

export const getDB = (runtime: AdvancedRuntime) => {
    let {DB} = (runtime.env as { DB: D1Database });
    if (!DB) {
        console.log('DB not found');
        throw new Error('DB not found');
    }
    return new Kysely<Database>({dialect: new D1Dialect({database: DB})});
}