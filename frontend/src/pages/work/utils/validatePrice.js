export const validatePrice = (price) => {
	let isPassed = true;

	const regexPrice = /^\s*(?:[1-9]\d{0,4}(?:\.\d{3})*|0)(?:,\d{1,2})?$/g;

	if (regexPrice.test(price) === false) {
		isPassed = false;
	}

	return isPassed;
};
