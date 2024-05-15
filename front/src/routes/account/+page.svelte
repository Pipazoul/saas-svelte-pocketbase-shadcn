<script lang="ts">
	import Title from '$lib/components/utils/Title.svelte';
	import { currentUser } from '$lib/store';
	import { logout } from '$lib/utils/auth';
</script>

<section class="flex flex-col justify-center">
	<Title text="Account" />
</section>
