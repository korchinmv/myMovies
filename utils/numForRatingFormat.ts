const numForRatingFormat = (
	num: number | string,
	coefficient = 10.75
): number => {
	const parsedNum = typeof num === "string" ? Number(num) : num;

	if (isNaN(parsedNum)) {
		console.error("Invalid number provided:", num);
		return 0;
	}

	return parsedNum / coefficient;
};

export default numForRatingFormat;
