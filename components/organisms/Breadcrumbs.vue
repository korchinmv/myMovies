<script setup lang="ts">
	defineProps<{
		breadcrumbs: { label: string }[];
	}>();
</script>

<template>
	<UBreadcrumb class="breadcrumbs text-red-200" :links="breadcrumbs">
		<template #default="{ link, isActive, index }">
			<span
				:class="{ 'text-white': isActive }"
				class="md:text-lg text-sm duration-300 ease-in hover:text-white font-thin"
			>
				{{ link.label }}</span
			>
		</template>

		<template #divider>
			<Icon name="ic:outline-keyboard-double-arrow-right" size="20" />
		</template>
	</UBreadcrumb>
</template>
