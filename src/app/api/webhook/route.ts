import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('hub.mode');
        const token = searchParams.get('hub.verify_token');
        const challenge = searchParams.get('hub.challenge');

        if (mode && token && mode === 'subscribe' && process.env.WEBHOOK_VERIFICATION_TOKEN === token) {
            return NextResponse.json({ success: true, status: 200 });
        }
        else {
            return NextResponse.json({ success: false, status: 500 });
        }
    }
    catch (error) {
        console.error({ error })
        return NextResponse.json({ success: false, status: 500 });
    }
};

export async function POST(request: NextRequest) {

    try {
        console.log(">>> ", request.body);
        return NextResponse.json({ success: true, status: 200 });
    }
    catch (error) {
        console.error({ error })

        return NextResponse.json({ success: false, status: 500 });
    }
};

