export const validateRG = (rg) => {
	let isPassed = true;

	let increasingNumbers = 0;
	let decreasingNumbers = 0;

	const regexRG =
		/^[0-9]{2,3}[.-\s]?[0-9]{2,3}[.-\s]?[0-9]{3}[.-\s]?[A-Za-z0-9]{1}$/g;
	const regexMore5SameNumbers = /([0-9])\1{5,}/g;

	if (regexRG.test(rg) === false) {
		isPassed = false;
	}

	if (regexMore5SameNumbers.test(rg)) {
		isPassed = false;
	}

	for (let i = 0; i < rg.length - 1; i++) {
		if (rg[i] > rg[i + 1]) {
			increasingNumbers++;
		}
	}

	for (let i = 0; i < rg.length - 1; i++) {
		if (rg[i] < rg[i + 1]) {
			decreasingNumbers++;
		}
	}

	if (increasingNumbers > 7 || decreasingNumbers > 7) {
		isPassed = false;
	}

	return isPassed;
};
