import { AudioPayload, ContactsPayload, DocumentPayload, ImagePayload, InteractivePayload, LocationPayload, Payload, StickerPayload, TemplatePayload, TextPayload, VideoPayload } from "./types/wa_messages_types";
import { WA_REQUEST } from "./wa_request";

export class WA_MESSAGES {
    private readonly commonMethod: string = "Post";
    private readonly commonEndpoint: string = 'messages';
    private readonly request: WA_REQUEST;

    constructor(request: WA_REQUEST) {
        this.request = request;
    }

    private async send(type: string, payload: Payload, recipient: string, replyMessageId?: string) {
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

    async sendDocument(documentPayload: any, recipient: string, replyMessageId?: string) {

        const payload: DocumentPayload = 
            {
                link: `https://rs-whatsapp-automation.vercel.app/resume.pdf`,
                caption: documentPayload.caption,
                filename: documentPayload.filename
        }

        return this.send("document", documentPayload, recipient, replyMessageId);
    }

    async sendImage(imagePayload: ImagePayload, recipient: string, replyMessageId?: string) {
        return this.send("image", imagePayload, recipient, replyMessageId);
    }

    async sendInteractive(interactivePayload: any, recipient: string, replyMessageId?: string) {

        const buttons = interactivePayload.buttons.slice(0, 3).map((button: { id: string; title: string; }) => ({
            type: "reply",
            reply: {
                id: button.id,
                title: button.title,
            }
        }));

        const payload: InteractivePayload = {
            type: interactivePayload.type,
            header: { type: "text", text: interactivePayload.header },
            body: {
                text: interactivePayload.text,
            },
            footer: {
                text: interactivePayload.footer,
            },
            action: {
                buttons,
            },
        };

        return this.send("interactive", payload, recipient, replyMessageId);
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
        return this.send("text", { body: textPayload }, recipient, replyMessageId);
    }

    async sendVideo(videoPayload: VideoPayload, recipient: string, replyMessageId?: string) {
        return this.send("video", videoPayload, recipient, replyMessageId);
    }
}
