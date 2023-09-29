<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { primitives, type PrimitiveKeys, apiSchema } from '$lib/schema';
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let name: string;
	export let parentName: 'inputs' | 'outputs';
	export let index: number;
	export let label: string;
	export let placeholder: string;
	export let form: SuperForm<typeof apiSchema>['form'];

	function onTypeChange(option?: { value: unknown }) {
		if (!option) return;
		form.update(($form) => {
			$form[parentName][index].type = option.value as PrimitiveKeys;
			return $form;
		});
	}
</script>

<Label for={name}>{label}</Label>
<Select.Root onSelectedChange={onTypeChange}>
	<Select.Trigger>
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content>
		{#each Object.keys(primitives) as primitive}
			<Select.Item value={primitive}>{primitive.toUpperCase()}</Select.Item>
		{/each}
	</Select.Content>
	<Select.Input {name} bind:value={$form[parentName][index].type} />
</Select.Root>
