<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	import Form from './form.svelte';
	export let response: ActionData;

	$: console.log(response?.form);
</script>

<H2>Create New API</H2>
<Form formInstace={data.form} />
