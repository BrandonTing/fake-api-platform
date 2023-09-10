<script lang="ts">
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

<header class="py-4 px-3 text-center bg-slate-100 text-2xl relative">
	<div class="max-w-[1280px] flex mx-auto justify-between item">
		<div class="flex" />
		<div class="gap-x-12 flex">
			{#each navItems as item}
				<NavItem nav={item} />
			{/each}
		</div>
		<div class="justify-end flex">
			<a href="/" class="text-sm font-semibold leading-6 text-gray-900 self-end"
				>Log out <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</header>
<main class="max-w-[1280px] mx-auto">
	<slot />
</main>
