export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    // این خط را اضافه کردیم تا ورود ترافیک را روی مانیتور ببینیم
    console.log("Xray connection attempt:", req.method, req.url);

    const targetUrl = new URL(req.url);
    targetUrl.hostname = 'fld.emadpr.online';
    targetUrl.port = '443';

    const headers = new Headers(req.headers);
    headers.set('Host', 'fld.emadpr.online');
    headers.delete('x-vercel-id');
    headers.delete('x-forwarded-for');

    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: headers,
      body: req.body,
      redirect: 'manual',
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return new Response(`Proxy Error: ${error.message}`, { status: 502 });
  }
}
