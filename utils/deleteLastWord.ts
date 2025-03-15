const deleteLastWord = (str: string): string =>
	str.slice(0, str.lastIndexOf(" "));

export default deleteLastWord;
