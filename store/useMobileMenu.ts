export const useMobileMenu = defineStore("mobileMenu", {
	state: () => ({
		isShowMobileMenu: false as boolean,
	}),
	actions: {
		toggleMobileMenu(): void {
			this.isShowMobileMenu = !this.isShowMobileMenu;
		},
	},
});
