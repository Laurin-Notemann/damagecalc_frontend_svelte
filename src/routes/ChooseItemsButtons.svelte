<script lang="ts">
	import type { VisibilityOfDropdowns } from './TSTypes.svelte';
	import Dropdown from './Dropdown.svelte';
	import { onMount } from 'svelte';
	import { fetchData } from './apiClient';

    const greyImage = new URL('../static/images/greyItemButtons.jpg', import.meta.url).href;

	let listOfItems: any[] = [];
	onMount(async () => {
		listOfItems = await fetchData('items');
	});

	const itemButtonAndDropdowns: VisibilityOfDropdowns[] = [
		{
			id: 'One',
			visible: false
		},
		{
			id: 'Two',
			visible: false
		},
		{
			id: 'Three',
			visible: false
		},
		{
			id: 'Four',
			visible: false
		},
		{
			id: 'Five',
			visible: false
		},
		{
			id: 'Six',
			visible: false
		}
	];

	const makeVisible = (key: string | boolean) => {
		const currDropdownButton = itemButtonAndDropdowns.findIndex((element) => element.id === key);
		const currVisDropdown = itemButtonAndDropdowns.findIndex((element) => element.visible === true);

		if (currVisDropdown > -1) itemButtonAndDropdowns[currVisDropdown].visible = false;

		if (itemButtonAndDropdowns[currDropdownButton].visible)
			itemButtonAndDropdowns[currDropdownButton].visible = false;
		else itemButtonAndDropdowns[currDropdownButton].visible = true;
	};

	const removeDropdown = (event: any) => {
		const currVisDropdown = itemButtonAndDropdowns.findIndex((element) => element.visible === true);
		if (currVisDropdown > -1) {
			if (
				!event.target!.matches('.gridButtons') &&
				!event.target!.matches(`[data-dropdownButton]`)
			) {
				itemButtonAndDropdowns[currVisDropdown].visible = false;
			}
		}
	};
</script>

<svelte:window on:click={removeDropdown} />

<div class="chooseItems">
	<h4>Choose</h4>
	<div class="itemButtons">
		{#each itemButtonAndDropdowns as itemAndDropdown}
			{#each Object.entries(itemAndDropdown) as [key, value]}
				{#if key === 'id'}
					{@const buttonID = `itemButtonImage${value}`}
					<div>
						<button on:click={() => makeVisible(value)}
							><img src={greyImage} alt="laler" data-dropdownButton /></button
						>
						{#if itemAndDropdown.visible}
							<Dropdown>
								<div class="gridButtons" slot="buttons">
									{#each listOfItems as item}
										{@const imgURL = item.itemIcon}
										<button class="dropdownButtons"
											><img src={imgURL} alt="" class="dropdownItemImages" /></button
										>
									{/each}
								</div>
							</Dropdown>
						{/if}
					</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style>
	h4 {
		text-align: center;
	}
	.chooseItems {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.itemButtons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 0.5rem;
	}
	button {
		border-style: hidden;
		padding: 0;
		border-radius: 0.5rem;
		width: 4rem;
		height: 4rem;
	}
	img {
		-webkit-appearance: none;
		appearance: none;
		-webkit-box-shadow: var(--boxShadowStandard);
		-moz-box-shadow: var(--boxShadowStandard);
		box-shadow: var(--boxShadowStandard);
		transition-duration: 150ms;
		border-radius: 0.5rem;
	}
	img:hover {
		transform: scale(1.06);
	}

	.gridButtons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		background: darkgray;
		gap: 0.5rem;
	}
	.dropdownButtons {
		position: relative;
		border-radius: 0.5rem;
		border-style: hidden;
		height: 2rem;
		width: 2rem;
		transition-duration: 150ms;
		background: lightgray;
	}
	.dropdownButtons:hover {
		transform: scale(1.03);
	}
	.dropdownItemImages {
		border-radius: 0.5rem;
		height: 100%;
		transition-duration: 150ms;
		box-shadow: var(--boxShadowStandard);
	}
	.dropdownItemImages:hover {
		transform: scale(1.03);
	}
</style>
