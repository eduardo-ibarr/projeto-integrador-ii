export const validateAddress = (address) => {
	let isPassed = false;

	let isValidLength = true;
	let hasLess3SameChar = true;
	let hasLess2WhiteSpaces = true;
	let hasMoreThan2Words = true;

	const regexMin2Max180Char = /^([A-zÀ-úç\s]){2,180}$/gi;
	const regexMore3SameChar = /([A-zÀ-úç\s])\1\1+/gi;
	const regexMore2WhiteSpaces = /\s{2,}/g;
	const regexMore2Words = /([A-zÀ-úç\s]+\s?\b){2,}/g;

	if (regexMin2Max180Char.test(address) === false) {
		isValidLength = false;
	}

	if (regexMore2Words.test(address) === false) {
		hasMoreThan2Words = false;
	}

	if (regexMore3SameChar.test(address)) {
		hasLess3SameChar = false;
	}

	if (regexMore2WhiteSpaces.test(address)) {
		hasLess2WhiteSpaces = false;
	}

	if (
		isValidLength &&
		hasLess3SameChar &&
		hasLess2WhiteSpaces &&
		hasMoreThan2Words
	) {
		isPassed = true;
	}

	return isPassed;
};
