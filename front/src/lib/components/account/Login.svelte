<script lang="ts">
    import { login } from "$lib/utils/auth";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button";
    let email = "";
    let password = "";
</script>

<section>
    <!--Disable form redirect-->
    <form on:submit|preventDefault class="space-y-4 p-4">
        <h2 class="text-4xl font-bold">Login into your account</h2>
        <div class="form-control max-w-xs space-y-4">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <Input type="email" placeholder="Your Email" class="max-w-xs" bind:value={email} />
            <Input type="password" placeholder="Password" class="max-w-xs" bind:value={password} />
            <Button  on:click={login(email,password)} >Log in</Button>
        </div>
    </form>
</section>