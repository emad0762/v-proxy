export const config = { 
    runtime: 'edge' 
};

export default async function handler(request) {
    try {
        const url = new URL(request.url);
        
        // هدایت ترافیک به سمت سرور فنلاند
        url.hostname = "fld.emadpr.online";
        
        // کپی کردن هدرها و تغییر هدر Host برای عبور از سد کلودفلر
        const newHeaders = new Headers(request.headers);
        newHeaders.set('Host', 'fld.emadpr.online');
        
        // آماده‌سازی تنظیمات درخواست
        const reqInit = {
            method: request.method,
            headers: newHeaders,
            redirect: 'manual'
        };
        
        // در متدهای GET نباید Body ارسال شود، در غیر این صورت ورسل ارور می‌دهد
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            reqInit.body = request.body;
        }

        // ارسال درخواست اصلاح شده به فنلاند
        return await fetch(url.toString(), reqInit);
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}
