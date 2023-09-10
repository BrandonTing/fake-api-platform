<script lang="ts" context="module">
	export type NavItemType = {
		url: string;
		label: string;
	};
</script>

<script lang="ts">
	export let nav: NavItemType;
	import { page } from '$app/stores';
	$: isActive = nav.url === $page.url.pathname;
</script>

<a href={nav.url} class="text-sm font-semibold leading-6 text-gray-900">
	<span class="py-2" class:border-b-2={isActive} class:border-gray-400={isActive}>{nav.label}</span>
</a>
