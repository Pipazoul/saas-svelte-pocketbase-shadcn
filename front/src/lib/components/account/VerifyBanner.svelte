<script lang="ts">
	import { currentUser } from '$lib/store';
	import { sendVerificationEmail } from '$lib/utils/auth';

	let verificationSent = false;
	function send() {
		sendVerificationEmail($currentUser.email);
		verificationSent = true;
	}
</script>

<section>
	{#if  $currentUser?.id && !$currentUser?.verified}
		<div
			class="bg-blue-100 border rounded-md m-4 border-blue-500 text-blue-700 px-4 py-3"
			role="alert"
		>
			{#if !verificationSent}
				<p class="font-bold">Please verify your email address</p>
				<p class="text-sm">We have sent you an email with a link to verify your email address.</p>
				<p class="text-sm">If you did not receive the email, please check your spam folder.</p>

				<button class="text-sm underline cursor-pointer" on:click={send}> Resend verification email</button>
			{:else}
				<p class="text-sm">A verification email has been sent to your email address</p>
				<p class="text-sm bold">Please check your inbox and spam folder</p>
			{/if}
		</div>
	{/if}
</section>