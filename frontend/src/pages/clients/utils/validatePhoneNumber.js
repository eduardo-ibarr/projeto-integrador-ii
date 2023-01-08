export const validatePhoneNumber = (phoneNumber) => {
	let isPassed = true;

	let increasingNumbers = 0;
	let decreasingNumbers = 0;

	const regexMore5SameNumbers = /([0-9])\1{5,}/g;

	if (regexMore5SameNumbers.test(phoneNumber)) {
		isPassed = false;
	}

	for (let i = 0; i < phoneNumber.length - 1; i++) {
		if (phoneNumber[i] > phoneNumber[i + 1]) {
			increasingNumbers++;
		}
	}

	for (let i = 0; i < phoneNumber.length - 1; i++) {
		if (phoneNumber[i] < phoneNumber[i + 1]) {
			decreasingNumbers++;
		}
	}

	if (increasingNumbers > 5 || decreasingNumbers > 5 || isNaN(phoneNumber)) {
		isPassed = false;
	}

	return isPassed;
};
