<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const tableCols = [
		{
			key: 'name',
			label: 'Name'
		},
		{
			key: 'url',
			label: 'Url'
		},
		{
			key: 'type',
			label: 'Type'
		},
		{
			key: 'description',
			label: 'Description'
		}
	] satisfies Array<{
		key: keyof PageData['list'][number];
		label: string;
	}>;
</script>

<div class="pt-4 flex justify-between border-b">
	<H2>Registered API List</H2>
	<a href="/new"><Button>Create</Button></a>
</div>

<table class="w-full mt-8">
	<thead>
		<tr>
			{#each tableCols as col}
				<th>{col.label}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data.list as api}
			<tr class="border-t leading-10">
				{#each tableCols as col}
					<td class="text-center">
						{api[col.key]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
