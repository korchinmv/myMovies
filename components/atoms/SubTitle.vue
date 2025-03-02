<script lang="ts" setup>
	interface Props {
		subtitle: string;
	}

	defineProps<Props>();
</script>

<template>
	<h3 class="subtitle">
		{{ subtitle }}
	</h3>
</template>
