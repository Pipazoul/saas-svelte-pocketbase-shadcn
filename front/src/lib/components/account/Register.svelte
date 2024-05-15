<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
	import Title from '$lib/components/utils/Title.svelte';
	import { notification } from '$lib/store';
	import { signup } from '$lib/utils/auth';
	import PasswordStrength from '$lib/components/utils/PasswordStrength.svelte';
	import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button";

	let password: string;
	let passwordConfirm: string;
	let email: string;
	let username: string;

	async function checkPassword(password: string, passwordConfirm: string) {
		if (!password || !passwordConfirm) {
			$notification = {
				body: 'Please fill in all fields',
				type: 'alert-warning',
				show: true
			};
			return false;
		}
		// password does contain a space
		if (password.includes(' ')) {
			$notification = {
				body: "Password should not contain spaces",
				type: 'alert-warning',
				show: true
			};
			return false;
		}
		if (password == passwordConfirm) {
			//is at least 8 characters
			if (password.length < 8) {
				$notification = {
					body: 'Password must be at least 8 characters long',
					type: 'alert-warning',
					show: true
				};
				return false;
			}
			return true;
		}

		return false;
	}

	async function register() {
		console.log('register');
		const isPasswordValid = await checkPassword(password, passwordConfirm);
		console.log(isPasswordValid);
		if (isPasswordValid) {
			console.log('registering');
			await signup(username, email, password, passwordConfirm);
		}
	}
</script>

<section>
	<!--Disable form redirect-->
	<form on:submit|preventDefault class="space-y-4">
		<Title text={'Sign Up'} />
		<div class="form-control w-full max-w-xs space-y-4">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex items-center">
				<Fa icon={faUser} />
				<p class="ml-2">Username</p>
			</label>
			<Input
				type="text"
				placeholder="Your Username"
				class="input input-bordered w-full max-w-xs"
				bind:value={username}
			/>
			<label class="flex items-center">
				<Fa icon={faEnvelope} />
				<p class="ml-2">Email</p>
			</label>
			<Input
				type="email"
				placeholder="Your Email"
				class="input input-bordered w-full max-w-xs"
				bind:value={email}
			/>
			<label class="flex items-center">
				<Fa icon={faLock} />
				<p class="ml-2">Password</p>
			</label>
			<Input
				type="password"
				placeholder="Password"
				class="input input-bordered w-full max-w-xs"
				bind:value={password}
			/>
			<Input
				type="password"
				placeholder="Confirm Password"
				class="input input-bordered w-full max-w-xs"
				bind:value={passwordConfirm}
			/>
			<PasswordStrength {password} />

			<Button
				type="submit"
				class="btn btn-primary"
				on:click={() => {
					register();
				}}>Create account</Button
			>
		</div>
	</form>

</section>
