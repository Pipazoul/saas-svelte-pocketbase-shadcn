<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import party from "party-js";
    import { onMount } from "svelte";
    onMount(() => {
        party.confetti(document.getElementById("confetti"));
    });
</script>
   
  <Alert.Root variant="success" id="confetti">

    <Alert.Title>🎉 Credits Added</Alert.Title>
    <Alert.Description>
        <div class="flex flex-col">
            <p>Enjoy your credits! 🚀</p>
            <Button href="/account">Go to Account</Button>
        </div>
    </Alert.Description>
  </Alert.Root>