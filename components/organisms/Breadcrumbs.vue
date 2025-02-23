<script setup lang="ts">
	defineProps<{
		breadcrumbs: { label: string }[];
	}>();
</script>

<template>
	<UBreadcrumb class="breadcrumbs" :links="breadcrumbs">
		<template #default="{ link, isActive }">
			<span
				class="md:text-lg text-sm duration-300 ease-in hover:text-[#ff55a5] font-thin"
				:class="{ 'text-[#ff55a5]': isActive }"
			>
				{{ link.label }}</span
			>
		</template>

		<template #divider>
			<Icon name="ic:outline-keyboard-double-arrow-right" size="20" />
		</template>
	</UBreadcrumb>
</template>
