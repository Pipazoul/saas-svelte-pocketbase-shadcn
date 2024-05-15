<script lang="ts">
	import { page } from '$app/stores';
	import { confirmEmailVerification } from '$lib/utils/auth';
	import { onMount } from 'svelte';

	let token = $page.url.searchParams.get('token') || '';
	onMount(async() => {
        await confirmEmailVerification(token);
    });

</script>

<section />
