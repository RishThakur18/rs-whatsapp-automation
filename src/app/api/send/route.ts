import send_message from '@/whatsAppUtils/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    send_message();
    return NextResponse.json({ message: 'Message sent successfully' });
}


