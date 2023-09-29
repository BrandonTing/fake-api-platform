<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';

	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import Button from '$lib/components/ui/button/button.svelte';
	import TextInput from './textInput.svelte';
	import type { Methods, apiSchema } from '$lib/schema';
	import TypeSelect from './typeSelect.svelte';
	import AddNewButton from './addNewButton.svelte';
	import ErrorMessage from './errorMessage.svelte';
	export let formInstace: SuperValidated<typeof apiSchema>;
	const { form, errors, enhance } = superForm(formInstace, {
		dataType: 'json'
	});

	function onMehodChange(option?: { value: unknown }) {
		if (!option) return;
		form.update(($form) => {
			$form.method = option.value as Methods;
			return $form;
		});
	}
</script>

<form method="POST" use:enhance>
	<TextInput
		label="Name"
		name="name"
		placeholder="Give this API a name!"
		description="Provide a name to identify the API"
		errorMessage={$errors.name}
		{form}
	/>
	<TextInput
		label="Path"
		name="path"
		placeholder="/unique/endpoint"
		description="Provide a UNIQUE endpoint for your API"
		errorMessage={$errors.path}
		{form}
	/>
	<div>
		<Label for="method">Method</Label>
		<Select.Root onSelectedChange={onMehodChange}>
			<Select.Trigger>
				<Select.Value placeholder="Choose Mehod" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="GET">GET</Select.Item>
				<Select.Item value="POST">POST</Select.Item>
			</Select.Content>
			<Select.Input name="method" bind:value={$form.method} />
		</Select.Root>
		<ErrorMessage errorMessage={$errors.method} />
	</div>
	<div>
		<Label for="request">Request</Label>
		{#each $form.request as _, i}
			<div class="flex gap-2">
				<div class="flex-1">
					<Label class="text-zinc-500">key</Label>
					<Input
						type="text"
						data-invalkey={$errors.request?.[i]?.key}
						bind:value={$form.request[i].key}
					/>
					<ErrorMessage errorMessage={$errors.request?.[i]?.key} />
				</div>
				<div class="flex-1">
					<TypeSelect
						parentName="request"
						index={i}
						label="Type"
						name="type"
						placeholder="Select type of property"
						{form}
					/>
					<ErrorMessage errorMessage={$errors.request?.[i]?.type} />
				</div>
			</div>
		{/each}
		<AddNewButton {form} type="request" />
	</div>
	<div>
		<Label for="response">Response</Label>
		{#each $form.response as _, i}
			<div class="flex gap-2">
				<div class="flex-1">
					<Label class="text-zinc-500">key</Label>
					<Input
						type="text"
						data-invalkey={$errors.response?.[i]?.key}
						bind:value={$form.response[i].key}
					/>
					<ErrorMessage errorMessage={$errors.response?.[i]?.key} />
				</div>
				<div class="flex-1">
					<TypeSelect
						parentName="response"
						index={i}
						label="Type"
						name="type"
						placeholder="Select type of property"
						{form}
					/>
					<ErrorMessage errorMessage={$errors.response?.[i]?.type} />
				</div>
			</div>
		{/each}
		<AddNewButton {form} type="response" />
	</div>
	<div>
		<Label for="description">Description</Label>
		<Textarea name="description" placeholder="Describe the API" bind:value={$form.description} />
	</div>
	<Button class="mt-3" type="submit">Submit</Button>
</form>
