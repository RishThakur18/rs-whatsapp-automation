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
        const whatsappPayload = await request.json();

        const firstEntry = whatsappPayload.entry[0];
        const firstChange = firstEntry.changes[0];
        const messages = firstChange.value.messages;

        if (messages && messages.length > 0) {
            const message = messages[0];
            const from = message.from;
            const text = message.text.body;
            await whatsapp.messages.sendText("hiiii", from);
        }

        return NextResponse.json({ status: 'success' }, { status: 200 });
    }
    catch (error: any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ status: 'error', message: error.message });
    }
}
