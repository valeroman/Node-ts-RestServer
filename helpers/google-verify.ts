import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(`${ process.env.GOOGLE_CLIENT_ID }`);

export const googleVerify = async(idToken = '') => {

    const ticket = await client.verifyIdToken({
        idToken, 
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const datos = ticket.getPayload();

    const { name, email, picture: img }: any = datos;

    return { name, email, img };
}