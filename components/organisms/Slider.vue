<script setup lang="ts">
	const containerRef = ref(null);
	const swiper = useSwiper(containerRef, {
		slidesPerView: 5,
		spaceBetween: 32,
		pagination: {},
	});
</script>

<template>
	<swiper-container class="slider" ref="containerRef" :init="false">
		<swiper-slide class="slider__item"><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
		<swiper-slide><OrganismsMovieCard /></swiper-slide>
	</swiper-container>

	<div class="slider__controls">
		<button class="slider__button slider__button--prev" @click="swiper.prev()">
			Prev
		</button>
		<button class="slider__button slider__button--next" @click="swiper.next()">
			Next
		</button>
	</div>
</template>
