<script setup>
	const images = [
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
	];

	onMounted(() => {
		console.log("Fancybox is available:", window.Fancybox); // Проверка доступности Fancybox
	});
</script>
<template>
	<div>
		<a
			v-for="(img, index) in images"
			:key="index"
			:href="img.img"
			data-fancybox="gallery"
		>
			<img :src="img.img" />
		</a>
	</div>
</template>
