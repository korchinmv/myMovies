<script lang="ts" setup>
	import { useMobileMenu } from "~/store/useMobileMenu";
	import { useMobileFilter } from "~/store/useMobileFilter";
	import { storeToRefs } from "pinia";

	const mobileStore = useMobileMenu();
	const filterStore = useMobileFilter();
	const { isShowMobileMenu } = storeToRefs(mobileStore);

	const clickButton = () => {
		mobileStore.toggleMobileMenu();
		filterStore.hideMobileFilter();
	};
</script>

<template>
	<button
		class="burger-btn"
		:class="{ 'burger-btn--active': isShowMobileMenu }"
		@click="clickButton"
	>
		<span class="burger-btn__line"></span>
		<span class="burger-btn__line"></span>
		<span class="burger-btn__line"></span>
	</button>
</template>
