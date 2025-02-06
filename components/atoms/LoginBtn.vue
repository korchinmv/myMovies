<script setup lang="ts">
	defineProps({
		link: {
			type: String,
			default: "/",
		},
	});
</script>

<template>
	<NuxtLink class="button-primary" :to="link">
		<slot />
	</NuxtLink>
</template>
