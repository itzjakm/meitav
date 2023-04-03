<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka&display=swap');

	:global(body) {
		background-color: #333;
		font-family: 'Fredoka', cursive;
		color: white;
	}
	:global(.column) {
		display: flex;
		flex-direction: column;
		/* gap: 10px; */
	}
	/* Set gray background color to odd divs inside column */
	/* Two pairs of constrasting grays */
	/*  */
	:global(.column > div:nth-child(odd)) {
		background-color: #636363;
	}
	:global(.column > div:nth-child(even)) {
		background-color: #acacac;
	}
</style>
