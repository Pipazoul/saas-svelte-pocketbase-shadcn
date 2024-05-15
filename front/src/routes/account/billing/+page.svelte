<script lang="ts">
	import PlanOffering from "$lib/components/plans/PlanOffering.svelte";
import Button from "$lib/components/ui/button/button.svelte";
    import Title from "$lib/components/utils/Title.svelte";
	import { currentUser } from "$lib/store";
    $: console.log($currentUser);

</script>
<section>
    <Title text="Billing" />
    {#if $currentUser}
        <h2 class="text-2xl">Subscription</h2>
        <PlanOffering />
        
        <h2 class="text-2xl">Credits</h2>
        <form action="/stripe/checkout/credit?currentUserId={$currentUser.id}" method="POST">
            <Button type="submit">Add Credits</Button>
        </form>
    {/if}
</section>