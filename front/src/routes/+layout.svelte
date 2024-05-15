<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import * as Avatar from "$lib/components/ui/avatar/index";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Separator } from "$lib/components/ui/separator/index";
	import { Button } from "$lib/components/ui/button/index";
	import {currentUser, watchUserChange } from '$lib/store';
	import Notifications from '$lib/components/utils/Notifications.svelte';
	import Fa from 'svelte-fa';
	import Logo from "$lib/assets/favicon.svg";
	import { faServer, faDatabase, faPlus, faUser, faFileInvoice, faRightFromBracket, faBook } from '@fortawesome/free-solid-svg-icons';
	import { faDocker } from '@fortawesome/free-brands-svg-icons';
	import { goto } from '$app/navigation';
	import { logout } from '../lib/utils/auth';
	import VerifyBanner from '../lib/components/account/VerifyBanner.svelte';
	import { getUserCredits } from '../lib/utils/user';
	import Upgrade from '$lib/components/account/Upgrade.svelte';

	onMount(async () => {
		if (!$currentUser) {
			goto('/account/login');
		}
		watchUserChange();
	});

</script>

<html lang="fr" data-theme="dark">
	<Notifications />
	{#if $currentUser}
	<body class="w-full min-h-screen h-screen">
		
		<div class="flex">
			<div class="drawer-side w-1/4 h-[calc(100vh_-_50px)]">
				<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
				  <!-- Sidebar content here -->
				  <div class="flex items-center justify-center mb-8">
					  <img src={Logo} alt="logo" class="w-8 h-8 " />
					  <p class="pl-4 uppercase text-1xl font-bold">Saas</p>
				  </div>
				  <Separator class="mb-2"/>
				  <li>
					<a href="/" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
					  <Fa icon={faBook}/>
					  <span class="ml-3 flex-1 whitespace-nowrap">Home</span>
					</a>
				  </li>
				  <li>
					<a href="/" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
					  <Fa icon={faBook}/>
					  <span class="ml-3 flex-1 whitespace-nowrap">Item</span>
					</a>
				  </li>
				  <li>
					<a href="/" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
					  <Fa icon={faBook}/>
					  <span class="ml-3 flex-1 whitespace-nowrap">Item</span>
					</a>
				  </li>
				</ul>
				<div class="flex justify-center">
					<Upgrade />
				</div>
			</div>
			
			<div class="flex flex-col w-3/4">
				<div class="flex justify-between p-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button>
								<Fa icon={faPlus}/>
								<div class="pl-2">Create</div>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
						  <DropdownMenu.Group>
							<DropdownMenu.Item>Item 1</DropdownMenu.Item>
							<DropdownMenu.Item>Item 2 </DropdownMenu.Item>
						  </DropdownMenu.Group>
						</DropdownMenu.Content>
					  </DropdownMenu.Root>

					  <div class="flex items-center">
						<div class="p-4 cursor-pointer">
							<a href="/account/billing">{getUserCredits($currentUser) }€</a>
						  </div>
						  <DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="">
								<Avatar.Root>
									<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
									<Avatar.Fallback>CN</Avatar.Fallback>
								</Avatar.Root>
								 </Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-56">
							  <DropdownMenu.Label>My Account</DropdownMenu.Label>
							  <DropdownMenu.Separator />
							  <DropdownMenu.Group>
								<a href="/account">
								<DropdownMenu.Item class="cursor-pointer">
								
									<Fa icon={faUser}/>
									  <span class="pl-2">Profile</span>
								</DropdownMenu.Item>
								</a>
								<a href="/account/billing">
								<DropdownMenu.Item class="cursor-pointer">
										<Fa icon={faFileInvoice}/>							
										<span class="pl-2">Billing</span>
								</DropdownMenu.Item>
								</a>
								<a on:click={logout}>
								<DropdownMenu.Item class="cursor-pointer">
										<Fa icon={faRightFromBracket}/>			
										  <span class="pl-2">Logout</span>
								</DropdownMenu.Item>
								</a>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						  </DropdownMenu.Root>
					  </div>
				</div>
				<div class="p-4  h-full">
					<VerifyBanner />
					<slot />
				</div>
			  <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
			</div> 
		  </div>
	</body>
	{:else}
		<slot/>
	{/if}

</html>
