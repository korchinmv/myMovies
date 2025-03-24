export const useMobileFilter = defineStore("mobileFilter", {
	state: () => ({
		isShowMobileFilter: false as boolean,
	}),
	actions: {
		showMobileFilter(): void {
			this.isShowMobileFilter = true;
		},
		hideMobileFilter(): void {
			this.isShowMobileFilter = false;
		},
	},
});
