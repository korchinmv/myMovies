<script lang="ts" setup>
	import { useMobileMenu } from "~/store/useMobileMenu";
	import { storeToRefs } from "pinia";

	const mobileStore = useMobileMenu();
	const { isShowMobileMenu } = storeToRefs(mobileStore);
</script>

<template>
	<button
		class="burger-btn"
		:class="{ 'burger-btn--active': isShowMobileMenu }"
		@click="mobileStore.toggleMobileMenu"
	>
		<span class="burger-btn__line"></span>
		<span class="burger-btn__line"></span>
		<span class="burger-btn__line"></span>
	</button>
</template>
