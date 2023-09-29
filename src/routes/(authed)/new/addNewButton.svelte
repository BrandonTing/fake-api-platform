<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { apiSchema } from '$lib/schema';
	import Icon from '@iconify/svelte';
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<typeof apiSchema>['form'];
	export let type: 'inputs' | 'outputs';
	function insertNew() {
		form.update(($form) => {
			$form[type] = [...$form[type], { key: '', type: 'string' }];
			return $form;
		});
	}
</script>

<Button class="w-full my-1" variant="secondary" size="sm" type="button" on:click={insertNew}>
	<Icon icon="ic:baseline-plus" />
	add new
</Button>
