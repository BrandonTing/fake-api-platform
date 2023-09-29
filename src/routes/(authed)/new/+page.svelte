<script lang="ts">
	import { goto } from '$app/navigation';
	import H2 from '$lib/components/typography/H2.svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	import Form from './form.svelte';
	export let form: ActionData;
	$: {
		if (form?.isSuccess) {
			console.log('wefwef');
			goto('/list');
		}
	}
</script>

<H2>Create New API</H2>
<Form formInstace={data.form} />
