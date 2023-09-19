<script lang="ts">
	import { writable } from 'svelte/store';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import Action from './action.svelte';
	import type { API } from '../../../routes/(authed)/list/+page.server';
	export let list: Array<API>;
	let listStore = writable(list);
	const table = createTable(listStore);
	function deleteAPIHandler(id: string) {
		// TODO 之後call api delete，invalidate data
		listStore.update(() => $listStore.filter((item) => item.id !== id));
	}
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
			accessor: 'method',
			header: 'Method'
		}),
		table.column({
			accessor: 'description',
			header: 'Description'
		}),
		table.column({
			header: '',
			accessor: ({ id }) => id,
			cell: (item) => createRender(Action, { id: item.value, deleteHandler: deleteAPIHandler })
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

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
