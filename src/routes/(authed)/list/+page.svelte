<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { readable } from 'svelte/store';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';

	export let data: PageData;
	const table = createTable(readable(data.list));
	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'path',
			header: 'Path'
		}),
		table.column({
			accessor: 'type',
			header: 'Type'
		}),
		table.column({
			accessor: 'description',
			header: 'Description'
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="pt-4 flex justify-between border-b">
	<H2>Registered API List</H2>
	<a href="/new"><Button>Create</Button></a>
</div>

<div class="w-full mt-8">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
