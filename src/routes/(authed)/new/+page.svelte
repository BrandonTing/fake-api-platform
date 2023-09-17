<script lang="ts">
	import H2 from '$lib/components/typography/H2.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import Form from './form.svelte';
</script>

<H2>Create New API</H2>
<Form form={data.form} />
