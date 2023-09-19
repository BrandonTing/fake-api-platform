<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { apiSchema } from '$lib/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<typeof apiSchema>;
</script>

<!-- TODO add select, text area  -->
<Form.Root method="POST" {form} schema={apiSchema} let:config>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Input />
			<Form.Description>This is the display name of this API.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="path">
		<Form.Item>
			<Form.Label>Path</Form.Label>
			<Form.Input />
			<Form.Description>Define the endpoint.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="method">
		<Form.Item>
			<Form.Label>Method</Form.Label>
			<Form.Input />
			<Form.Description>POST/GET</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Input />
			<Form.Description>Describe this API.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
	<a href="/list">
		<Form.Button variant="secondary">Cancel</Form.Button>
	</a>
</Form.Root>
