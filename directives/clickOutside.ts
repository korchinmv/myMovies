export const clickOutside = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		el.clickOutsideEvent = function (event: MouseEvent) {
			if (!(el === event.target || el.contains(event.target as Node))) {
				binding.value(event);
			}
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el: HTMLElement) {
		document.body.removeEventListener("click", el.clickOutsideEvent);
	},
};
