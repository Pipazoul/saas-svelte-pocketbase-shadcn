import {Stripe} from 'stripe';
import {env} from '$env/dynamic/private'
import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const stripe = new Stripe(env.PRIVATE_STRIPE_SECRET, {
    apiVersion: '2020-08-27',
});

/** @type {import('./$types').RequestHandler} */
export const POST = (async ({request}) => {
    console.log("Webhook received");
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    console.log(sig);
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, env.PRIVATE_STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.log("Webhook error", err.message);
        return new Response(`Webhook Error: ${err.message}`, {status: 400});
    }
    console.log("Webhook event");
    console.log(event);
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed' && event.data.object.mode === 'payment') {
        const session = event.data.object;
        // Fulfill the purchase...
        console.log("Payment was successful :D");
        const userId = session.client_reference_id;
        const amount = session.amount_total;

        try{
            const pb = new PocketBase(env.PRIVATE_POCKETBASE_URL ?? "http://localhost:8090");
            const authData = await pb.admins.authWithPassword(env.PRIVATE_POCKETBASE_IDENTITY, env.PRIVATE_POCKETBASE_PASSWORD);
            
            const stripe_customer_id = session.customer;
            
            //update user to subscribed status 
            await pb.collection("users").update(userId, {role: "admin", stripe_customer_id, "credits+": amount}, authData);
            return new Response(json({status: 200}), {status: 200});
        
        }
        catch(e){
            console.log("Pocketbase error");
            console.log(e);
            return new Response(json({status: 500}), {status: 500});
        }

        
    }
    if (event.type === 'checkout.session.completed' && event.data.object.mode === 'subscription') {
        const session = event.data.object;
        const plan = session.metadata.plan || "free";
        const userId = session.client_reference_id;
        try{
            const pb = new PocketBase(env.PRIVATE_POCKETBASE_URL ?? "http://localhost:8090");
            const authData = await pb.admins.authWithPassword(env.PRIVATE_POCKETBASE_IDENTITY, env.PRIVATE_POCKETBASE_PASSWORD);
            
            const stripe_customer_id = session.customer;
            const stripe_subscription_id = session.subscription;
            const stripe_subscription_date = new Date().toISOString();
            
            //update user to subscribed status 
            await pb.collection("users").update(userId, {role: "admin", stripe_customer_id, stripe_subscription_id, stripe_subscription_date, "plan": plan}, authData);
            return new Response(json({status: 200}), {status: 200});
        }
        catch(e){
            console.log("Pocketbase error");
            console.log(e);
            return new Response(json({status: 500}), {status: 500});
        }

    }
    return new Response(json({received: true}), {status: 200});
});