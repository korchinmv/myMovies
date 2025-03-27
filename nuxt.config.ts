// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/scss/main.scss"],
	plugins: ["~/plugins/useClickOutside.ts", "~/plugins/useFancybox.ts"],
	app: {
		head: {
			script: [
				{
					src: "https://kinobox.tv/kinobox.min.js",
					async: true,
					defer: true,
				},
			],
		},
	},
	modules: [
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@nuxt/image",
		"@nuxtjs/google-fonts",
		"@vee-validate/nuxt",
		"nuxt-swiper",
		"@nuxt/icon",
		"nuxt-rating",
		"@nuxt/ui",
	],
	runtimeConfig: {
		public: {
			apiKey: process.env.API_KEY,
			baseUrl: process.env.BASE_URL,
			serverUrl: process.env.SERVER_URL,
		},
	},
	googleFonts: {
		families: {
			"Open+Sans": true,
			Ubuntu: true,
		},
	},
	image: {
		dir: "public",
		inject: true,
		quality: 80,
	},
});
