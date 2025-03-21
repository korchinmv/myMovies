<script setup lang="ts">
	const route = useRoute();
</script>

<template>
	<h2>{{ route.params.id }}</h2>
</template>
