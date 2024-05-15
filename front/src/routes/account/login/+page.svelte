<script lang="ts">
    import Logo from "$lib/assets/favicon.svg";
    import LoginBg from "$lib/assets/login-bg.png";
	import Login from "../../../lib/components/account/Login.svelte";
	import Register from "../../../lib/components/account/Register.svelte";
    let mode = "login";
</script>

<section>
      
    <div class="flex flex-col">
        <div class="flex">
            <div class="flex flex-col items-center justify-center w-1/2 p-4">
                <div class="flex items-center p-4">
                    <img src={Logo} alt="logo" class="w-8 h-8 mr-2" />
                    <p class="uppercase text-1xl font-bold ">SAAS -Console</p>
                </div>
                {#if mode === "register"}
                <Register />
                {/if}
                {#if mode === "login"}
                <Login />
                {/if}
                <div class="flex flex-col mt-4">
                    {#if mode === "login"}
                        <a href="#" class="underline" on:click={() => {mode = "register"}}>Create an account</a>
                        <a href="/account/forgot-password" class="underline">Forgot password</a>
                    {/if}
                    {#if mode === "register"}
                        <a href="#" class="underline" on:click={() => {mode = "login"}}>Already have an account</a>
                    {/if}
                </div>
            </div>
            <div class="w-1/2 bg-cover h-screen bg-center flex items-center justify-center" style="background-image: url({LoginBg});">
                <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    SAAS NAME
                </h1>
            </div>
        </div>
    </div>    
</section>