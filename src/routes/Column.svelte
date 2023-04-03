<script>
	import Cart from 'svelte-ionicons/Cart.svelte';
	import { SortableList } from '@jhubbardsf/svelte-sortablejs';
	import Field from './Field.svelte';
	export let sortFn = undefined;
	export let buyFn = undefined;
	export let deleteFieldFn = undefined;
	export let entity = undefined;
	export let fields = undefined;
	let store = {
		set: (e) => sortFn(e.toArray())
	};
</script>

<h3 class="entity">{entity}</h3>
<SortableList dataIdAttr="htmlstoretype" {store} class="column" swapClass="highlight" animation={0}>
	{#each fields as field (field)}
		<Field options={field} {deleteFieldFn} />
	{/each}
</SortableList>
<div on:click={buyFn}>
	<Cart size="40" color="pink" />
</div>

<style>
	.entity {
		font-size: 30px;
		color: #ffffff;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
