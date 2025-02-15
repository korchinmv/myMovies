<script setup lang="ts">
	defineProps<{
		modelValue: string;
		placeholder?: string;
		type?: string;
	}>();

	const emit = defineEmits<{
		(e: "update:modelValue", value: string): void;
	}>();

	const updateValue = (event: Event) => {
		const target = event.target as HTMLInputElement;
		emit("update:modelValue", target.value);
	};
</script>

<template>
	<input
		class="input"
		autocomplete="on"
		@input="updateValue"
		:value="modelValue"
		:placeholder="placeholder"
		:type="type"
	/>
</template>
