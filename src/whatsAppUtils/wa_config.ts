export class WA_CONFIG {

    public readonly senderNumberId: number;
    public readonly accessToken: string;
    public readonly apiVersion: string;

    public readonly baseURL: string = "https://graph.facebook.com";
    
    constructor() {
        this.senderNumberId = parseInt(process.env.WA_SENDER_NUMBER_ID || "");
        this.accessToken = process.env.WA_ACCESS_TOKEN || ""; 
        this.apiVersion = process.env.WA_API_VERSION || "v20.0";
        this.baseURL = `${this.baseURL}/${this.apiVersion}`;
    }
}