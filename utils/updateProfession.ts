const updateProfession = (professionKey: string) => {
	if (professionKey === "ACTOR") {
		return professionKey.replace("ACTOR", "Актер");
	}
	if (professionKey === "DIRECTOR") {
		return professionKey.replace("DIRECTOR", "Режисер");
	}
};

export default updateProfession;
