<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';

	import type { Methods, apiSchema } from '$lib/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	export let formInstace: SuperValidated<typeof apiSchema>;
	const { form, errors } = superForm(formInstace);

	function insertNew(type: 'inputs' | 'outputs') {
		form.update(($form) => {
			$form[type] = [...$form[type], { key: '', type: '' }];
			return $form;
		});
	}

	function onMehodChange(option?: { value: unknown }) {
		if (!option) return;
		form.update(($form) => {
			$form.method = option.value as Methods;
			return $form;
		});
		console.log($form);
	}
</script>

<form method="POST" use:enhance>
	<div>
		<Label for="name">Name</Label>
		<Input type="text" id="name" name="name" placeholder="Give this API a name!" />
		<p class="text-sm text-muted-foreground">Provide a name to identify the API</p>
	</div>
	<div>
		<Label for="path">Path</Label>
		<Input type="text" id="path" name="path" placeholder="/unique/endpoint" />
		<p class="text-sm text-muted-foreground">Provide a UNIQUE endpoint for your API</p>
	</div>
	<div>
		<Label for="method">Method</Label>
		<Select.Root onSelectedChange={onMehodChange}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Choose Mehod" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="GET">GET</Select.Item>
				<Select.Item value="POST">POST</Select.Item>
			</Select.Content>
			<Select.Input name="method" bind:value={$form.method} />
		</Select.Root>
	</div>
	<div>
		<Label for="inputs">Inputs</Label>
		{#each $form.inputs as _, i}
			<div>
				<div class="flex gap-2">
					<div class="flex-1">
						<Label class="text-zinc-500">key</Label>
						<Input
							type="text"
							data-invalkey={$errors.inputs?.[i]?.key}
							bind:value={$form.inputs[i].key}
						/>
					</div>
					<div class="flex-1">
						<Label class="text-zinc-500">type</Label>
						<Input data-invalkey={$errors.inputs?.[i]?.type} bind:value={$form.inputs[i].type} />
					</div>
				</div>
				{#if $errors.inputs?.[i]?.key}
					<br />
					<span class="invalkey inline-block">{$errors.inputs[i].key}</span>
				{/if}
				{#if $errors.inputs?.[i]?.type}
					<br />
					<span class="invalkey">{$errors.inputs[i].type}</span>
				{/if}
			</div>
		{/each}
		<Button
			class="w-full my-1"
			variant="secondary"
			size="sm"
			type="button"
			on:click={() => {
				insertNew('inputs');
			}}
		>
			<Icon icon="ic:baseline-plus" />
			add new
		</Button>
	</div>
	<div>
		<Label for="ontputs">Outputs</Label>
		{#each $form.outputs as _, i}
			<div>
				<div class="flex gap-2">
					<div class="flex-1">
						<Label class="text-zinc-500">key</Label>
						<Input
							type="text"
							data-invalkey={$errors.outputs?.[i]?.key}
							bind:value={$form.outputs[i].key}
						/>
					</div>
					<div class="flex-1">
						<Label class="text-zinc-500">type</Label>
						<Input data-invalkey={$errors.outputs?.[i]?.type} bind:value={$form.outputs[i].type} />
					</div>
				</div>
				{#if $errors.outputs?.[i]?.key}
					<br />
					<span class="invalkey">{$errors.outputs[i].key}</span>
				{/if}
				{#if $errors.outputs?.[i]?.type}
					<br />
					<span class="invalkey">{$errors.outputs[i].type}</span>
				{/if}
			</div>
		{/each}
		<Button
			class="w-full my-1"
			variant="secondary"
			size="sm"
			type="button"
			on:click={() => {
				insertNew('outputs');
			}}
		>
			<Icon icon="ic:baseline-plus" />
			add new
		</Button>
	</div>
	<Button type="submit">Submit</Button>
</form>
