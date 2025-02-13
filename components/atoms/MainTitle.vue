<script lang="ts" setup>
	defineProps({
		mainTitleStrong: {
			type: String,
			required: true,
		},
		mainTitle: {
			type: String,
		},
	});
</script>

<template>
	<h1 class="main-title">
		<span class="main-title__span">{{ mainTitleStrong }}</span> {{ mainTitle }}
	</h1>
</template>
