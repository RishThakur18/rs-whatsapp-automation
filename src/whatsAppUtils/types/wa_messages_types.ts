export interface MessagePayloadBase {
    messaging_product: string;
    recipient_type: string;
    to: string;
    type: string;
    [key: string]: any;
}

export interface AudioPayload {
    audio_url: string;
}

export interface ContactsPayload {
    name: string;
    phone_number: string;
}

export interface DocumentPayload {
    link: string
    filename: string;
    caption: string;
}

export interface ImagePayload {
    image_url: string;
    caption?: string;
}

export interface InteractivePayload {
    type: "button" | "list";
    header?: MessageHeader;
    body: Body;
    footer?: Footer;
    action: Action;
}

export interface MessageHeader {
    [key: string]: any;
}

export interface Body {
    text: string;
}

export interface Footer {
    text: string;
}

export interface Action {
    buttons: Button[];
}

export interface Button {
    type: string;
    reply: Reply;
}

export interface Reply {
    id: string;
    title: string;
}

export interface LocationPayload {
    latitude: number;
    longitude: number;
    name?: string;
}

export interface StickerPayload {
    sticker_url: string;
}

export interface TemplatePayload {
    // Define structure based on template message requirements
}

export interface TextPayload {
    body: string;
}

export interface VideoPayload {
    video_url: string;
    caption?: string;
}

export type Payload =
    | AudioPayload
    | ContactsPayload[]
    | DocumentPayload
    | ImagePayload
    | InteractivePayload
    | LocationPayload
    | StickerPayload
    | TemplatePayload
    | TextPayload
    | VideoPayload;
