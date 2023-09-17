<script lang="ts">
	import * as DropdownMenu from '../ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';

	export let id: string;
	export let deleteHandler: (id: string) => void;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item on:click={(e) => deleteHandler(id)}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
