<script setup lang="ts">
	interface Props {
		page: number;
		total: number;
		totalPages: number;
		pageCount: number;
	}

	const props = defineProps<Props>();

	const emit = defineEmits<{
		(event: "update:page", value: number): void;
	}>();

	const pageReactive = computed({
		get: () => props.page,
		set: (value) => emit("update:page", value),
	});
</script>

<template>
	<UPagination
		:active-button="{ color: 'pink', variant: 'outline' }"
		:inactive-button="{ color: 'gray' }"
		size="lg"
		v-model="pageReactive"
		:page-count="props.pageCount"
		:total="props.total || 0"
		:totalPages="props.totalPages"
		:to="
			(page: number) => ({
				query: { page },
			})
		"
	/>
</template>
