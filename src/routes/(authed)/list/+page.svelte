<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	import ListTable from '$lib/components/list/table.svelte';
</script>

<div class="flex justify-between border-b">
	<H2>Registered API List</H2>
	<a href="/new"><Button>Create</Button></a>
</div>

<ListTable list={data.list} />
