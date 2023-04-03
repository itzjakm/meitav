//field class
export const Field = (function () {
	const freeTypes = [
		'Apples',
		'Cucumbers',
		'Cucumbers2',
		'Grapes',
		'Grapes2',
		'Lemons',
		'Lemons2',
		'Lemons3',
		'Mangos',
		'Mangos2',
		'Peaches',
		'Peaches2',
		'Pineapples',
		'Pineapples2',
		'Strawberries',
		'Tomatoes',
		'Tomatoes2',
		'Watermelons'
	];
	const usedTypes = [];
	return class Field {
		constructor() {
			this.opinions = [];
			/* If freeTypes is empty refiil it */
			if (freeTypes.length === 0) {
				freeTypes.push(...usedTypes);
				usedTypes.length = 0;
			}
			this.type = freeTypes.splice(Math.floor(Math.random() * freeTypes.length), 1)[0];
			usedTypes.push(this.type);
		}
	};
})();
export const FieldPlaceholder = (function () {
	let id = 0;
	return class FieldPlaceholder {
		constructor() {
			this.opinions = [];
			this.type = id++ + '';
			this.inactive = true;
		}
	};
})();
