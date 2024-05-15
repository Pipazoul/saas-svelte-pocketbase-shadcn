import {Stripe} from 'stripe';
import {env} from '$env/dynamic/private'
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const stripe = new Stripe(env.PRIVATE_STRIPE_SECRET, {
    apiVersion: '2020-08-27',
});

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({url}) => {
    const currentUserId = await url.searchParams.get('currentUserId');
    
    const pb = new PocketBase(env.PRIVATE_POCKETBASE_URL ?? "http://localhost:8090");
    const authData = await pb.admins.authWithPassword(env.PRIVATE_POCKETBASE_IDENTITY, env.PRIVATE_POCKETBASE_PASSWORD);
    const user: User = await pb.collection("users").getOne(currentUserId, authData);

    try{
        await stripe.subscriptions.cancel(user.stripe_subscription_id);
        pb.collection("users").update(currentUserId, {role: "user", stripe_subscription_id: null, plan: "free"}, authData);
    }
    catch(e){
        console.log("Stripe error");
        console.log(e);
        throw redirect(302,`/stripe/unsubscribe/error`);
    }

    // redirect to user page
    throw redirect(302,`/stripe/unsubscribe/success`);

});