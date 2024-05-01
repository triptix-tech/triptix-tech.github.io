export const isDevMode = (astro: Astro) => {
    return astro.url.toString().startsWith("http://localhost");
}