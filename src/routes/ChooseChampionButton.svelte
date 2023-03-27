<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { fetchData } from './apiClient';
	import type { VisibilityOfDropdowns } from './TSTypes.svelte';
	import { onMount } from 'svelte';

	let listOfChampions: any[] = [];

	onMount(async () => {
		listOfChampions = await fetchData("champs");
	});

	const greyImage = new URL('../static/images/greyChampButton.jpg', import.meta.url).href;

	const championButtonAndVisibility: VisibilityOfDropdowns = {
		id: 'Champ',
		visible: false
	};

	const dropdownButtonClick = () => {
		if (!championButtonAndVisibility.visible) championButtonAndVisibility.visible = true;
		else championButtonAndVisibility.visible = false;
	};

	const removeDropdown = (event: any) => {
		if (!event.target!.matches('.gridDropdownButtons') && !event.target!.matches('#champImage')) {
			championButtonAndVisibility.visible = false;
		}
	};
</script>

<svelte:window on:click={removeDropdown} />

<div class="chooseChampion">
	<h4>Choose Champion</h4>
	<div>
		<button
			on:click={dropdownButtonClick}
			data-buttonAndDropdown="buttonChamp"
			class="chooseButtonChamp"
		>
			<img id="champImage" src={greyImage} alt="Lol" />
		</button>

		{#if championButtonAndVisibility.visible}
			<Dropdown>
				<div class="gridDropdownButtons" slot="buttons">
					{#each listOfChampions as champion}
						{@const champIconUrl = champion.champIcon}
						<button class="dropdownButton"
							><img src={champIconUrl} alt="" class="smallerChampIcons" />
						</button>
					{/each}
				</div>
			</Dropdown>
		{/if}
		<div />
	</div>
</div>

<style>
	.chooseChampion {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.chooseButtonChamp {
		border-radius: 0.5rem;
		border-style: hidden;
		padding: 0;
		width: 7.5rem;
		height: 7.5rem;
	}
	img {
		border-radius: 0.5rem;
		box-shadow: var(--boxShadowStandard);
		transition-duration: 150ms;
	}
	img:hover {
		transform: scale(1.06);
	}
	.gridDropdownButtons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: 0.5rem;
	}
	.dropdownButton {
		border-radius: 0.5rem;
		border-style: hidden;
		height: 3.75rem;
		width: 3.75rem;
		transition-duration: 150ms;
		background: lightgray;
	}
	.dropdownButton:hover {
		transform: scale(1.06);
	}
	.gridDropdownButtons button {
		transform: scale(1.03);
	}
	.smallerChampIcons {
		border-radius: 0.5rem;
		height: 100%;
		transition-duration: 150ms;
		box-shadow: var(--boxShadowStandard);
	}
	.smallerChampIcons:hover {
		transform: scale(1.03);
	}
</style>
