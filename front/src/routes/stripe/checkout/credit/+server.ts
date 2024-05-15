import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import PocketBase from 'pocketbase';
import {env} from '$env/dynamic/private'
import type { User } from '$lib/models/user.js';


const stripe = new Stripe(env.PRIVATE_STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});

export const POST = (async (request) => {
    const currentUserId = request.url.searchParams.get('currentUserId');
    
    const pb = new PocketBase(env.PRIVATE_POCKETBASE_URL ?? "http://localhost:8090");
    const authData = await pb.admins.authWithPassword(env.PRIVATE_POCKETBASE_IDENTITY, env.PRIVATE_POCKETBASE_PASSWORD);

    const user: User = await pb.collection("users").getOne(currentUserId, authData);

    let data =  {
      client_reference_id: currentUserId!,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: env.PRIVATE_STRIPE_CREDITS_ID,
          quantity: 1,
        },
      ],
      // automatic_tax: { 
      //   enabled: true,
      // },
      // consent_collection: {
      //   terms_of_service: "required"
      // },
      mode: 'payment',
      success_url: `${env.PRIVATE_FRONT_DOMAIN}/stripe/success/credits`,
      cancel_url: `${env.PRIVATE_FRONT_DOMAIN}/`,
    } 

    if(user.stripe_customer_id){
      data.customer = user.stripe_customer_id;
    }
    // add client_reference_id using the current user's id
    const session = await stripe.checkout.sessions.create(data);

      throw redirect(303,session.url);
});