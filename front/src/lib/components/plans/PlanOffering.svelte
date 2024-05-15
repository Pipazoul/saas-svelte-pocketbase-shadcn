<script lang="ts">
    import {
      Button,
      buttonVariants
    } from "$lib/components/ui/button/index";
    import { Label } from "$lib/components/ui/label/index";
    import * as Card from "$lib/components/ui/card/index.js";
	import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
    import { currentUser } from "$lib/store";

    function subscribe(plan) {
        const form = document.createElement('form');
        form.action = `/stripe/checkout/subscribe?currentUserId=${$currentUser.id}&plan=${plan}`;
        form.method = 'POST';
        document.body.appendChild(form);
        form.submit();
    }

</script>
<div class="flex flex-row">
    <div class="w-1/3">
        <Card.Root>
            <Card.Header>
                <Card.Title>Free</Card.Title>
                <Card.Description>Basic plan offering</Card.Description>
                <ul>
                    <li class="flex items-center"><Fa icon={faCheck} class="mr-2 text-green-500"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                </ul>
                <div class="">
                    <Label>Price</Label>
                    <h2 class="text-2xl font-bold">Free</h2>
                </div>
              </Card.Header>
              <Card.Content>
            </Card.Content>
            <Card.Footer class="flex justify-center">
                {#if $currentUser.plan === 'free'}
                    <Button disabled>Current plan</Button>
                {:else}
                    <Button on:click={() => subscribe('free')}>Subscribe</Button>
                {/if}
            </Card.Footer>
          </Card.Root>
    </div>
    <div class="w-2"></div>
    <div class="w-1/3">
        <Card.Root>
            <Card.Header>
                <Card.Title>Basic</Card.Title>
                <Card.Description>Basic plan offering</Card.Description>
                <ul>
                    <li class="flex items-center"><Fa icon={faCheck} class="mr-2 text-green-500"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faCheck} class="mr-2 text-green-500"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                </ul>
                <div class="">
                    <Label>Price</Label>
                    <h2 class="text-2xl font-bold">9.99€</h2>
                </div>
              </Card.Header>
              <Card.Content>
            </Card.Content>
            <Card.Footer class="flex justify-center">
                {#if $currentUser.plan === 'basic'}
                    <Button disabled>Current plan</Button>
                {:else}
                    <Button on:click={() => subscribe('basic')}>Subscribe</Button>
                {/if}
            </Card.Footer>
          </Card.Root>
    </div>
    <div class="w-2"></div>
    <div class="w-1/3">
        <Card.Root >
            <Card.Header>
                <Card.Title>Pro</Card.Title>
                <Card.Description>Pro plan offering</Card.Description>
                <ul>
                    <li class="flex items-center"><Fa icon={faCheck} class="mr-2 text-green-500"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faCheck} class="mr-2 text-green-500"/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                    <li class="flex items-center"><Fa icon={faClose} class="mr-2 "/> Feature 1</li>
                </ul>
                <div class="">
                    <Label>Price</Label>
                    <h2 class="text-2xl font-bold">29.99€</h2>
                </div>
              </Card.Header>
              <Card.Content>
            </Card.Content>
            <Card.Footer class="flex justify-center">
                {#if $currentUser.plan === 'pro'}
                    <Button disabled>Current plan</Button>
                {:else}
                    <Button on:click={() => subscribe('pro')}>Subscribe</Button>
                {/if}
            </Card.Footer>
          </Card.Root>
    </div>

  </div>