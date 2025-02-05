export const useMobileMenu = defineStore("mobileMenu", {
	state: () => ({
		isShowMobileMenu: false as boolean,
	}),
	actions: {
		toggleMobileMenu() {
			this.isShowMobileMenu = !this.isShowMobileMenu;
		},
	},
});
