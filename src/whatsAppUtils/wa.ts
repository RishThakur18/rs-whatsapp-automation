import { WA_CONFIG } from "./wa_config";
import { WA_MESSAGES } from "./wa_messages";
import { WA_REQUEST } from "./wa_request";

export class WhatsApp {

    private config: WA_CONFIG;
    private request: WA_REQUEST;
    public messages: WA_MESSAGES;

    constructor() {
        this.config = new WA_CONFIG();
        this.request = new WA_REQUEST(this.config.baseURL, this.config.senderNumberId, this.config.accessToken);
        this.messages = new WA_MESSAGES(this.request);
    }
}
