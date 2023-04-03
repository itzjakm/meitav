<script>
	import { onMount } from 'svelte';
	import Close from 'svelte-ionicons/Close.svelte';
	export let deleteFieldFn = undefined;
	export const prerender = true;
	export let inactive = false;
	export let options = {};
	import { page } from '$app/stores';
	let src = '';
	onMount(() => {
		src = `${$page.url}/icons/Fruits/final/${options.type}.png`;
	});
	let opinions;
	$: opinions = options.opinions;
	function deleteField() {
		deleteFieldFn(options.type);
	}
</script>

{#if options.inactive}
	<div htmlstoretype={options.type} class:inactive class="square" />
{:else}
	<div htmlstoretype={options.type} class="square">
		{#if opinions.length > 0}
			<div class="opinion">
				<p>
					{#each opinions as opinion, index (opinion)}
						{opinion}{index < opinions.length - 1 ? ', \u200F' : ''}
						<br />
					{/each}
				</p>
			</div>
		{/if}
		{#if src}
			<div class="img-container">
				<div on:click={deleteField} class="close">
					<Close color="red" size="20" />
				</div>
				<img class="img" {src} alt="" />
			</div>
		{/if}
	</div>
{/if}

<style>
	.square {
		width: 100px;
		height: 100px;
		padding: 10px 10px;
		/* background-color: red; */
		position: relative;
	}
	.inactive {
		background-color: transparent;
	}
	.img {
		width: 100%;
		height: 100%;
	}
	.img-container {
		position: relative;
	}
	.opinion {
		position: absolute;
		top: 0;
		left: -125px;
		width: 100%;
		height: 100%;
		/* background-color: rgba(0, 0, 0, 0.5); */
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		text-align: center;
	}
	@media only screen and (max-width: 491px) {
		.opinion {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
	}
	.close {
		position: absolute;
		top: 8px;
		right: 8px;
		/* bottom: 10px; */
		z-index: 2;
	}
</style>
