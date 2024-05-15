<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import party from "party-js";
    import { onMount } from "svelte";
</script>
   
  <Alert.Root >

    <Alert.Title>Subscription Canceled</Alert.Title>
    <Alert.Description>
        <div class="flex flex-col">
            <p>Your subscription has been successfully canceled.</p>
            <Button href="/account">Go to Account</Button>
        </div>
    </Alert.Description>
  </Alert.Root>