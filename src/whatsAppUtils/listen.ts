import WhatsApp from "whatsapp";

const senderNumber = 901234567890;
const wa = new WhatsApp();

export default function custom_callback(statusCode: any, headers: any, body: any, resp: any, err: any) {
    console.log(
        `Incoming webhook status code: ${statusCode}\n\nHeaders:
        ${JSON.stringify(headers)}\n\nBody: ${JSON.stringify(body)}`
    );

    if (resp) {
        resp.writeHead(200, { "Content-Type": "text/plain" });
        resp.end();
    }

    if (err) {
        console.log(`ERROR: ${err}`);
    }
}

wa.webhooks.start(custom_callback);