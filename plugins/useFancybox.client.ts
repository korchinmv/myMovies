import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default defineNuxtPlugin((nuxtApp) => {
	if (process.client) {
		nuxtApp.provide("fancybox", Fancybox.bind("[data-fancybox]"));
	}
});
