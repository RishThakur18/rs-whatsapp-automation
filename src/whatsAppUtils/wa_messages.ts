import { WA_REQUEST } from "./wa_request";

interface AudioPayload {
    audio_url: string;
}

interface ContactsPayload {
    name: string;
    phone_number: string;
}

interface DocumentPayload {
    document_url: string;
    caption?: string;
}

interface ImagePayload {
    image_url: string;
    caption?: string;
}

interface InteractivePayload {
    // Define structure based on interactive message requirements
    // Example fields:
    // buttons: Button[]
}

interface LocationPayload {
    latitude: number;
    longitude: number;
    name?: string;
}

interface StickerPayload {
    sticker_url: string;
}

interface TemplatePayload {
    // Define structure based on template message requirements
    // Example fields:
    // template_name: string;
    // elements: Element[];
}

interface TextPayload {
    text: { body: string };
}

interface VideoPayload {
    video_url: string;
    caption?: string;
}

type Payload =
    | AudioPayload
    | ContactsPayload
    | DocumentPayload
    | ImagePayload
    | InteractivePayload
    | LocationPayload
    | StickerPayload
    | TemplatePayload
    | TextPayload
    | VideoPayload;


export class WA_MESSAGES {
    private readonly commonMethod: string = "Post";
    private readonly commonEndpoint: string = 'messages';
    private readonly request: WA_REQUEST;

    constructor(request: WA_REQUEST) {
        this.request = request;
    }

    async send(type: string, payload: Payload, recipient: string, replyMessageId?: string) {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipient,
            type: type,
            [type]: payload,
        };

        if (replyMessageId) {
            body.context = { message_id: replyMessageId };
        }

        try {
            // Call your API client method to send the message
            const response = await this.request.hitApi("POST", "/messages", body);
            console.log(`Sent ${type} message to ${recipient}`);
            return response;
        }
        catch (error) {
            console.error(`Failed to send ${type} message to ${recipient}:`, error);
            throw new Error(`Failed to send ${type} message`);
        }
    }

    async sendAudio(audioPayload: AudioPayload, recipient: string, replyMessageId?: string) {
        return this.send("audio", audioPayload, recipient, replyMessageId);
    }

    async sendContacts(contactsPayload: ContactsPayload[], recipient: string, replyMessageId?: string) {
        return this.send("contacts", contactsPayload, recipient, replyMessageId);
    }

    async sendDocument(documentPayload: DocumentPayload, recipient: string, replyMessageId?: string) {
        return this.send("document", documentPayload, recipient, replyMessageId);
    }

    async sendImage(imagePayload: ImagePayload, recipient: string, replyMessageId?: string) {
        return this.send("image", imagePayload, recipient, replyMessageId);
    }

    async sendInteractive(interactivePayload: InteractivePayload, recipient: string, replyMessageId?: string) {
        return this.send("interactive", interactivePayload, recipient, replyMessageId);
    }

    async sendLocation(locationPayload: LocationPayload, recipient: string, replyMessageId?: string) {
        return this.send("location", locationPayload, recipient, replyMessageId);
    }

    async sendSticker(stickerPayload: StickerPayload, recipient: string, replyMessageId?: string) {
        return this.send("sticker", stickerPayload, recipient, replyMessageId);
    }

    async sendTemplate(templatePayload: TemplatePayload, recipient: string, replyMessageId?: string) {
        return this.send("template", templatePayload, recipient, replyMessageId);
    }

    async sendText(textPayload: string, recipient: string, replyMessageId?: string) {
        return this.send("text", { body: textPayload}, recipient, replyMessageId);
    }

    async sendVideo(videoPayload: VideoPayload, recipient: string, replyMessageId?: string) {
        return this.send("video", videoPayload, recipient, replyMessageId);
    }
}
