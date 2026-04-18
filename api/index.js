export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const targetUrl = new URL(req.url);
  // مقصد نهایی: سرور فنلاند شما
  targetUrl.hostname = 'fld.emadpr.online';
  targetUrl.port = '443';

  // کپی کردن هدرها و تنظیم دقیق هدر Host برای فریب دادن کلودفلر
  const headers = new Headers(req.headers);
  headers.set('Host', 'fld.emadpr.online');

  // حذف هدرهایی که باعث اختلال در پروکسی می‌شوند
  headers.delete('x-vercel-id');
  headers.delete('x-forwarded-for');

  try {
    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: headers,
      body: req.body,
      redirect: 'manual',
    });

    // برگرداندن پاسخ سرور فنلاند به گوشی شما با تمام هدرها
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    return new Response(`Proxy Error: ${error.message}`, { status: 502 });
  }
}
