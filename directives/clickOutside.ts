const clickOutsideMap = new WeakMap();

export const clickOutside = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		const isPassive = !binding.modifiers.noPassive;
		const clickOutsideEvent = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node;
			if (target && !(el === target || el.contains(target))) {
				if (typeof binding.value === "function") {
					binding.value(event);
				}
			}
		};

		clickOutsideMap.set(el, clickOutsideEvent);
		document.addEventListener("click", clickOutsideEvent, {
			passive: isPassive,
		});
		document.addEventListener("touchstart", clickOutsideEvent, {
			passive: isPassive,
		});
	},
	unmounted(el: HTMLElement) {
		const clickOutsideEvent = clickOutsideMap.get(el);
		if (clickOutsideEvent) {
			document.removeEventListener("click", clickOutsideEvent);
			document.removeEventListener("touchstart", clickOutsideEvent);
			clickOutsideMap.delete(el);
		}
	},
};
