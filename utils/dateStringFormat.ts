const dateStringFormat = (date: string) => {
	const [year, month, day] = date.substring(0, 10).split("-");
	const formattedDate = `${month}.${day}.${year} г.`;
	return formattedDate;
};

export default dateStringFormat;
