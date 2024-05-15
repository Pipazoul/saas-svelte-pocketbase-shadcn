<script lang="ts">
	import Title from "$lib/components/utils/Title.svelte";
	import { currentUser } from "../../../lib/store";

</script>
<section>
    <Title text="Billing" />
    <div class="flex flex-col justify-center">
        <h1 class="text-2xl font-bold">Billing</h1>
    </div>
    <form action="/stripe/checkout?currentUserId={$currentUser.id}" method="POST">
        <button class="btn btn-primary" type="submit" id="checkout-button">Add Credits</button>
    </form>
</section>