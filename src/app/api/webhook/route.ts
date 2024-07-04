import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import WhatsApp from 'whatsapp';

const wa = new WhatsApp();

async function sendMessage(to: string, message: string) {
    try {
        await wa.messages.send({
            to,
            type: 'text',
            text: {
                body: message,
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('hub.mode');
        const token = searchParams.get('hub.verify_token');
        const challenge = searchParams.get('hub.challenge');

        if (mode && token && mode === 'subscribe' && process.env.WEBHOOK_VERIFICATION_TOKEN === token) {
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
        const body = await request.json();

        const { messages } = body;

        if (messages && messages.length > 0) {
            const message = messages[0];
            const from = message.from;
            const text = message.text.body;
            await sendMessage(from, 'Hi, how can I help you?');
        }

        return NextResponse.json({ status: 'success' });
    }
    catch (error: any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ status: 'error', message: error.message });
    }
}
