<script lang="ts">
	export let errorMessage: string[] | undefined = undefined;
</script>

{#if errorMessage}
	<span class="text-sm font-medium text-destructive">{errorMessage.join(', ')}</span>
{/if}
