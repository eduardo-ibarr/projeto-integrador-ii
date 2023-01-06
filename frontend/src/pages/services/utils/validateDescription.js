export const validateDescription = (description) => {
	let isPassed = false;

	let isValidLength = true;
	let hasLess3SameChar = true;
	let hasLess2WhiteSpaces = true;

	const regexMin2Max100Char = /^([A-zÀ-úç\s]){2,250}$/gi;
	const regexMore3SameChar = /([A-zÀ-úç\s])\1\1+/gi;
	const regexMore2WhiteSpaces = /\s{2,}/g;

	if (regexMin2Max100Char.test(description) === false) {
		isValidLength = false;
	}

	if (regexMore3SameChar.test(description)) {
		hasLess3SameChar = false;
	}

	if (regexMore2WhiteSpaces.test(description)) {
		hasLess2WhiteSpaces = false;
	}

	if (isValidLength && hasLess3SameChar && hasLess2WhiteSpaces) {
		isPassed = true;
	}

	return isPassed;
};
