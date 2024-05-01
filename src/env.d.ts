/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="lucia" />

type KVNamespace = import('@cloudflare/workers-types/experimental').KVNamespace;
type ENV = {
    SERVER_URL: string;
    KV_BINDING: KVNamespace;
};

type Runtime = import('@astrojs/cloudflare').AdvancedRuntime<ENV>;

declare namespace App {
    interface Locals extends Runtime {
        user: {
            name: string;
            surname: string;
        };
    }
}

declare namespace Lucia {
    type Auth = import("./lib/lucia").Auth;
    type DatabaseUserAttributes = {
        email: string;
        email_verified: number;
    };
    type DatabaseSessionAttributes = {};
}