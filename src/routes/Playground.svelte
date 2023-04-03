<script>
	import { onMount } from 'svelte';
	import Add from 'svelte-ionicons/Add.svelte';
	import Trash from 'svelte-ionicons/Trash.svelte';
	import Column from './Column.svelte';
	import { Field, FieldPlaceholder } from './Field.js';
	let updateMsg;
	onMount((e) => {
		updateMsg = function (text, color) {
			const msg = document.querySelector('.msg');
			msg.textContent = text;
			msg.style.color = color || 'inherit';
		};
	});

	let rows = [
		{ mazik: new Field(), nizak: new FieldPlaceholder() },
		{ mazik: new Field(), nizak: new Field() },
		{ mazik: new FieldPlaceholder(), nizak: new Field() }
	];
	$: {
		(function () {
			if (updateMsg) updateMsg('Tip: Arrastra los campos para cambiar el caso');
			if (rows.length === 0) return;
			rows = rows.map((row) => {
				row.mazik.opinions = [];
				return row;
			});

			const meitavMazik = rows.findIndex((row) => !row.mazik.inactive);
			const meitavNizak = rows.findIndex((row) => !row.nizak.inactive);

			if (meitavMazik === -1) {
				updateMsg('El מזיק no tiene campos para pagar', 'red');
				return;
			}

			rows[meitavMazik].mazik.opinions.push('רבי עקיבא');
			const suitableMazik = rows.slice(0, meitavNizak).filter((row) => !row.mazik.inactive);
			if (meitavNizak === -1) {
				rows[meitavMazik].mazik.opinions.push('רבי ישמעאל segun un צד');
				updateMsg(
					'Segun un צד (para רבי ישמעאל) los campos se consideran como cualquier otro objeto',
					'red'
				);
				return;
			}

			if (!rows[meitavNizak].mazik.inactive) {
				rows[meitavNizak].mazik.opinions.push('רבי ישמעאל');
				return;
			} else {
				if (suitableMazik.length === 1) {
					suitableMazik[0].mazik.opinions.push('רבי ישמעאל');
					return;
				} else if (suitableMazik.length > 1) {
					rows[meitavMazik].mazik.opinions.push('רבי ישמעאל segun un צד');
					suitableMazik.at(-1).mazik.opinions.push('רבי ישמעאל segun un צד');
					return;
				} else if (suitableMazik.length === 0) {
					rows[meitavMazik].mazik.opinions.push('רבי ישמעאל segun un צד');
					updateMsg(
						'Segun un צד (para רבי ישמעאל) los campos se consideran como cualquier otro objeto',
						'red'
					);
					return;
				}
			}
		})();
		rows.forEach((row) => {
			row.mazik.opinions = row.mazik.opinions;
		});
		console.log(rows);
	}
	function createFnSort(mazikOrNizak) {
		return function sortRows(sorted) {
			let arr;
			if (mazikOrNizak === 'mazik') {
				arr = rows.map((row) => row.mazik);
			} else if (mazikOrNizak === 'nizak') {
				arr = rows.map((row) => row.nizak);
			}
			arr.sort((a, b) => {
				return sorted.indexOf(a.type) - sorted.indexOf(b.type);
			});
			arr.forEach((e, i) => {
				if (mazikOrNizak === 'mazik') {
					rows[i].mazik = e;
				} else if (mazikOrNizak === 'nizak') {
					rows[i].nizak = e;
				}
			});
			rows = rows;
		};
	}
	function createBuyFn(mazikOrNizak) {
		return function buy() {
			if (mazikOrNizak === 'mazik') {
				const row = rows.find((row) => row.mazik.inactive);
				if (row) row.mazik = new Field();
				else rows.push({ mazik: new Field(), nizak: new FieldPlaceholder() });
			} else if (mazikOrNizak === 'nizak') {
				const row = rows.find((row) => row.nizak.inactive);
				if (row) row.nizak = new Field();
				else rows.push({ mazik: new FieldPlaceholder(), nizak: new Field() });
			}
			rows = rows;
		};
	}
	function addRow() {
		rows.push({ mazik: new FieldPlaceholder(), nizak: new FieldPlaceholder() });
		rows = rows;
	}
	function deleteRow() {
		rows.pop();
		rows = rows;
		console.log({ delete: rows });
	}
	function createDeleteFieldFn(mazikOrNizak) {
		return function deleteField(id) {
			if (mazikOrNizak === 'mazik') {
				rows.find((row) => row.mazik.type === id).mazik = new FieldPlaceholder();
			} else if (mazikOrNizak === 'nizak') {
				rows.find((row) => row.nizak.type === id).nizak = new FieldPlaceholder();
			}
			rows = rows;
		};
	}
</script>

<div class="column-container">
	<div on:click={deleteRow} class="flex-end">
		<Trash size="40" color="pink" />
	</div>
	<div class="flex">
		<Column
			sortFn={createFnSort('mazik')}
			buyFn={createBuyFn('mazik')}
			deleteFieldFn={createDeleteFieldFn('mazik')}
			entity="מזיק"
			fields={rows.map((e) => e.mazik)}
		/>
	</div>
	<div class="flex">
		<Column
			sortFn={createFnSort('nizak')}
			buyFn={createBuyFn('nizak')}
			deleteFieldFn={createDeleteFieldFn('nizak')}
			entity="ניזק"
			fields={rows.map((e) => e.nizak)}
		/>
	</div>
	<div on:click={addRow} class="flex-end">
		<Add size="40" color="pink" />
	</div>
</div>
<p class="msg column-container">Tip: Arrastra los campos para cambiar el caso</p>

<style>
	.flex {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.flex-end {
		display: flex;
		flex-direction: column-reverse;
		margin-bottom: 40px;
		z-index: 2;
	}
	.column-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* center */
		justify-content: center;
		/* gap: 10px; */
		text-align: center;
	}
</style>
