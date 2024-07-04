import WhatsApp from 'whatsapp';

const wa = new WhatsApp(parseInt(process.env.WA_PHONE_NUMBER || "0123456789"));

const recipient_number = 918255990451;

export default async function send_message()
{
    try{
        const sent_text_message = wa.messages.text( { "body" : "Hello world" }, recipient_number );

        await sent_text_message.then( ( res ) =>
        {
            console.log( res.rawResponse() );
        } );
    }
    catch( e )
    {
        console.log( JSON.stringify( e ) );
    }
}
