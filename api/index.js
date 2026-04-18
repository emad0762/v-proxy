export const config = {
    runtime: 'edge'
};

export default async function handler(request) {
    try {
        const url = new URL(request.url);
        
        // هدایت ترافیک به سمت سرور فنلاند شما
        url.hostname = "fld.emadpr.online";
        
        // اگر در فنلاند از پورت دیگری غیر از 443 استفاده می‌کنید، خط زیر را از کامنت درآورید و پورت را بنویسید
        // url.port = "8443"; 

        const modifiedRequest = new Request(url.toString(), {
            headers: request.headers,
            method: request.method,
            body: request.body,
            redirect: 'follow'
        });

        return await fetch(modifiedRequest);
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}
