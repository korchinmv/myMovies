const currentDate = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today
		.toLocaleString("en-US", { month: "long" })
		.toUpperCase();

	return {
		currentYear,
		currentMonth,
	};
};

export default currentDate;
