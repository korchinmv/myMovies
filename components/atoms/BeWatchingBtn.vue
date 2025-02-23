<script setup lang="ts">
	defineProps({
		text: {
			type: String,
		},
	});
</script>

<template>
	<button class="be-watching-btn">
		<Icon name="ph:bookmark-simple" size="30px" />
		<span class="be-watching-btn__text" v-if="text">{{ text }}</span>
	</button>
</template>
