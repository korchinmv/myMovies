<script lang="ts" setup>
	interface Props {
		mainTitleStrong: string;
		mainTitle?: string;
	}

	defineProps<Props>();
</script>

<template>
	<h1 class="main-title">
		<span class="main-title__span">{{ mainTitleStrong }}</span>
		{{ mainTitle && mainTitle }}
	</h1>
</template>
