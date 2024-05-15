import {Stripe} from 'stripe';
import {env} from '$env/dynamic/private'
import { redirect } from '@sveltejs/kit';

const stripe = new Stripe(env.PRIVATE_STRIPE_SECRET, {
    apiVersion: '2020-08-27',
});

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({url}) => {
    const id = await url.searchParams.get('id');
    try{
        await stripe.subscriptions.cancel(id);
    }
    catch(e){
        console.log("Stripe error");
        console.log(e);
        throw redirect(302,`/stripe/unsubscribe/error`);
    }

    // redirect to user page
    throw redirect(302,`/stripe/unsubscribe/success`);

});