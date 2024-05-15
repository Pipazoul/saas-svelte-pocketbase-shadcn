<script lang="ts">
	import * as Alert from "$lib/components/ui/alert";
	import { notification } from '$lib/store';
	export let message: string = 'Message par defaut';
	export let type: string = 'success';

	$: if ($notification.show) {
		// scroll to top
		window.scrollTo(0, 0);
		setTimeout(() => {
			$notification.show = false;
		}, 3000);
	}
</script>

<section class="absolute w-screen flex items-center justify-center p-4">
	{#if $notification.show}
	<Alert.Root class="w-72">
		<Alert.Description>
			{$notification.body}
		</Alert.Description>
	</Alert.Root>
	{/if}
</section>

