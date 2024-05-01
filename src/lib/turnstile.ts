export const turnStileSiteKey = '0x4AAAAAAAMR5AowlF2SoFSg';

export async function isTurnStileValid(formData: FormData, devMode: boolean) {
    const token = formData.get('cf-turnstile-response');
    const ip = formData.get('CF-Connecting-IP');

    let req = new FormData();
    req.append('secret', devMode ? '1x0000000000000000000000000000000AA' : import.meta.env.TURNSTILE_SECRET_KEY);
    req.append('response', token);
    req.append('remoteip', ip);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        body: req,
        method: 'POST',
    });

    const outcome = await result.json();
    return outcome.success;
}