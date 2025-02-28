export default defineNuxtPlugin(async (nuxtApp) => {
	if (process.client) {
		const { Fancybox } = await import("@fancyapps/ui");
		await import("@fancyapps/ui/dist/fancybox/fancybox.css");
		nuxtApp.provide("fancybox", Fancybox.bind("[data-fancybox]"));
	}
});
