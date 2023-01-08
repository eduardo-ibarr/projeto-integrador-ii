export const validateText = (text) => {
	let isPassed = false;

	let hasLess3SameChar = true;
	let hasLess2WhiteSpaces = true;

	const regexMore3SameChar = /([A-zÀ-úç\s])\1\1+/gi;
	const regexMore2WhiteSpaces = /\s{2,}/g;

	if (regexMore3SameChar.test(text)) {
		hasLess3SameChar = false;
	}

	if (regexMore2WhiteSpaces.test(text)) {
		hasLess2WhiteSpaces = false;
	}

	if (hasLess3SameChar && hasLess2WhiteSpaces && isNaN(text)) {
		isPassed = true;
	}

	return isPassed;
};
