<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import FormInput from '$lib/components/ui/form/form-input.svelte';
	import * as Select from '$lib/components/ui/select';
	import { apiSchema } from '$lib/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<typeof apiSchema>;

	let methods = ['POST', 'GET'];
</script>

<Form.Root method="POST" {form} schema={apiSchema} let:config>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Input placeholder="my api" />
			<Form.Description>This is the display name of this API.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="path">
		<Form.Item>
			<Form.Label>Path</Form.Label>
			<Form.Input placeholder="/some/cool/endpoint" />
			<Form.Description>Define the endpoint.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="method">
		<Form.Item>
			<Form.Label>Method</Form.Label>
			<Form.Select>
				<Select.Trigger>
					<Select.Value placeholder="Select a method" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each methods as method}
							<Select.Item value={method} label={method}>{method}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Form.Select>
			<Form.Description>POST/GET</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<!-- TODO input -->

	<!-- TODO output -->

	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Textarea placeholder="Leave some description about this API" />
			<Form.Description>Describe this API.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
	<a href="/list">
		<Form.Button variant="secondary">Cancel</Form.Button>
	</a>
</Form.Root>
