<script lang="ts">
    import { fade } from "svelte/transition";


</script>

<div transition:fade="{{duration:25}}" class="dropdownStyle">
	<slot name="buttons" />
</div>

<style>
	.dropdownStyle {
		position: absolute;
		display: flex;
		flex-direction: column;
		z-index: 1;
		padding: 0.5rem;
		background: rgba(172, 172, 172, 1);
		border-radius: 0.5rem;
		box-shadow: var(--boxShadowStandard);
		gap: 0.5rem;
	}
</style>
