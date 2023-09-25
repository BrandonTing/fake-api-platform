<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	import Form from './form.svelte';
	export let form: ActionData;
	$: console.log(form?.isSuccess);
</script>

<H2>Create New API</H2>
<Form form={data.form} />
