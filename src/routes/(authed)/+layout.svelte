<script lang="ts">
	import { enhance } from '$app/forms';
	import NavItem from '$lib/components/navItem.svelte';
	import type { NavItemType } from '$lib/components/navItem.svelte';
	const navItems = [
		{
			url: '/list',
			label: 'API List'
		}
		// {
		// 	url: '/new',
		// 	label: 'Create New'
		// }
	] satisfies Array<NavItemType>;
</script>

<header class="py-4 px-3 text-center bg-slate-100 text-2xl relative mb-4">
	<div class="max-w-[1280px] flex mx-auto justify-end item">
		<!-- <div class="flex" />
		<div class="gap-x-12 flex">
			{#each navItems as item}
				<NavItem nav={item} />
			{/each}
		</div> -->
		<form class="justify-end flex" method="post" action="/logout" use:enhance>
			<button type="submit" class="text-sm font-semibold leading-6 text-gray-900 self-end"
				>Log out <span aria-hidden="true">&rarr;</span></button
			>
		</form>
	</div>
</header>
<main class="max-w-[1280px] mx-auto px-5">
	<slot />
</main>
