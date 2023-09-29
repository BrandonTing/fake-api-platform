<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import ErrorMessage from './errorMessage.svelte';
	import type { APISchema, apiSchema } from '$lib/schema';
	export let label: string;
	export let name: keyof APISchema;
	export let placeholder: string = `Please enter ${name}`;
	export let description: string = '';
	export let errorMessage: string[] | undefined;
	export let form: SuperForm<typeof apiSchema>['form'];
</script>

<div>
	<Label for={name}>{label}</Label>
	<Input type="text" id={name} {name} {placeholder} bind:value={$form[name]} />
	<p class="text-sm text-muted-foreground">{description}</p>
	<ErrorMessage {errorMessage} />
</div>
