<script setup lang="ts">
	import type { TMovie } from "~/types/Movie";
	import { useMobileMenu } from "~/store/useMobileMenu";
	import { useMobileFilter } from "~/store/useMobileFilter";

	interface Props {
		total: number;
		films: TMovie[];
	}

	defineProps<Props>();

	const mobileStore = useMobileMenu();
	const filterStore = useMobileFilter();

	const clickButton = () => {
		filterStore.showMobileFilter();
		mobileStore.hideMobileMenu();
	};
</script>

<template>
	<div class="films-info">
		<button class="films-info__btn" @click="clickButton">
			<Icon class="films-info__icon" name="hugeicons:filter" size="26px" />

			Фильтр
		</button>

		<div class="films-info__content">
			Показано:
			<span>{{ films.length }} из {{ total }}</span>
		</div>
	</div>
</template>
