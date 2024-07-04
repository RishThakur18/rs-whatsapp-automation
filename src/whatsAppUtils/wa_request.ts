export class WA_REQUEST {
    public readonly baseURL: string;
    public readonly accessToken;

    constructor(baseURL: string, senderNumberId: number, accessToken: string) {
        this.baseURL = `${baseURL}/${senderNumberId}`;
        this.accessToken = accessToken;
    }

    async hitApi(method: string, endpoint: string, payload: any): Promise<any> {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        };

        const options: RequestInit = {
            method,
            headers,
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error: any) {
            console.error(`Error calling WhatsApp API: ${error.message}`);
            throw error;
        }
    }
}
