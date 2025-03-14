<script setup lang="ts">
	defineProps<{
		className?: string;
	}>();

	const containerRef = ref<null>(null);
	const swiper = useSwiper(containerRef, {
		breakpoints: {
			1440: {
				slidesPerView: 5,
				spaceBetween: 32,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			990: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			375: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
</script>

<template>
	<div class="slider-wrapper">
		<div class="controls">
			<button class="controls__button" @click="swiper.prev()">
				<Icon name="material-symbols:arrow-back" size="20px" />
			</button>
			<button class="controls__button" @click="swiper.next()">
				<Icon name="material-symbols:arrow-forward" size="20px" />
			</button>
		</div>

		<ClientOnly>
			<swiper-container :class="[className, 'slider']" ref="containerRef">
				<slot />
			</swiper-container>
		</ClientOnly>
	</div>
</template>
