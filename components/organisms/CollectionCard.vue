<script setup lang="ts">
	interface Props {
		name: string;
		image: string;
		url: string;
	}

	const props = defineProps<Props>();
	console.log(props.image);
</script>

<template>
	<article class="collection-card">
		<NuxtLink class="collection-card__cover" :to="url">
			<div class="collection-card__overlay">
				<img
					class="collection-card__img"
					v-if="image"
					:src="image"
					:alt="name"
				/>

				<Icon
					class="collection-card__play"
					name="solar:play-circle-outline"
					size="40px"
				/>
			</div>

			<h3 class="collection-card__title">{{ name }}</h3>
		</NuxtLink>
	</article>
</template>
