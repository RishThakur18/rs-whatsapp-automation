export async function sendTextMessage(, to: number, message: string) {
    try {
        await wa.messages.text({ "body": message }, to);
    }
    catch (error) {
        console.error('Error sending message:', error);
    }
}


type InteractiveObject = ListInteractiveObject;

type SimpleTextObject = {
    text: string;
}

type HeaderObject = {
    type: "text";
    text: string;
}

type ActionObject = {
    button?: string;
};

type ListInteractiveObject = {
    type: "list";
    body: SimpleTextObject;
    footer?: SimpleTextObject;
    header?: HeaderObject;
    action: ActionObject;
};

export async function sendInteractiveMessage(wa: WhatsApp, type: string, to: number, message: string) {

    const headerText = "HEADER_TEXT";
    const bodyText = "BODY_TEXT";
    const footerText = "FOOTER_TEXT";
    const buttonText = "BUTTON_TEXT";

    const obj: InteractiveObject = {
        type: "list",
        body: {
            text: "bodyText"
        },
        action: {
            button: buttonText
        }
    };


    try {
        await wa.messages.interactive({ body: obj as InteractiveObject }, to);
    }

    catch (error) {
        console.error('Error sending message:', error);
    }

}
