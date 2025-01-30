// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/scss/main.scss"],
	modules: [
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@nuxt/image",
		"@nuxtjs/google-fonts",
		"@vee-validate/nuxt",
		"nuxt-swiper",
	],
	googleFonts: {
		families: {
			"Open+Sans": true,
			Ubuntu: true,
		},
	},
});
