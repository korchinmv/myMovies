<script lang="ts" setup>
	defineProps({
		pageTitle: {
			type: String,
		},
	});
</script>

<template>
	<h1 class="page-title">
		{{ pageTitle }}
	</h1>
</template>
