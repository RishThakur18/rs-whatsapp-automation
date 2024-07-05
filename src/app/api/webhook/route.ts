import { WhatsApp } from '@/whatsAppUtils/wa';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const whatsapp = new WhatsApp();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('hub.mode');
        const token = searchParams.get('hub.verify_token');
        const challenge = searchParams.get('hub.challenge');

        if (mode && token && mode === 'subscribe' && process.env.WA_WEBHOOK_VERIFICATION_TOKEN === token) {
            return new NextResponse(challenge, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
    catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ success: false, status: 500 });
    }
};

export async function POST(request: NextRequest) {

    try {
        const whatsappPayload = await request.json();

        const firstEntry = whatsappPayload.entry[0];
        const firstChange = firstEntry.changes[0];
        const messages = firstChange.value.messages;

        if (messages && messages.length > 0) {
            const message = messages[0];
            const from = message.from;
            if (message.text) {
                const text = message.text.body;
                // await whatsapp.messages.sendText("hiiii", from);

                const interactivePayload = {
                    type: "button",
                    header: "Hi, I am Rishabh",
                    text: "This is my whatsapp resume",
                    footer: "Please do no call or text on this automated number",
                    buttons: [
                        { id: "view", title: "View" },
                        { id: "resume", title: "Resume" },
                        { id: "contact", title: "Contact" }
                    ],
                };
                await whatsapp.messages.sendInteractive(interactivePayload, from)
            }
           
            else if(message.interactive) {
                const interactive_type = message.interactive.type;
                if(interactive_type === "button_reply") {
                    if(message.interactive.button_reply.id === "view"){
                        
                    }
                    else if(message.interactive.button_reply.id === "resume"){
                        await whatsapp.messages.sendDocument("ssf","yess");
                    }
                    else {

                    }
                }
            
            }
        }


        return NextResponse.json({ status: 'success' }, { status: 200 });
    }
    catch (error: any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ status: 'error', message: error.message });
    }
}
