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
			<Form.Label>Username</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="path">
		<Form.Item>
			<Form.Label>Path</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="type">
		<Form.Item>
			<Form.Label>Type</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</Form.Root>
