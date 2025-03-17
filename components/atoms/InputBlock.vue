<script setup lang="ts">
	interface Props {
		modelValue: string;
		placeholder?: string;
		type?: string;
		error?: string;
	}

	withDefaults(defineProps<Props>(), {
		modelValue: "",
		placeholder: "",
		type: "text",
		error: "",
	});

	const emit = defineEmits<{
		(e: "update:modelValue", value: string): void;
	}>();

	const updateValue = (event: Event) => {
		const target = event.target as HTMLInputElement;
		emit("update:modelValue", target.value);
	};
</script>

<template>
	<div class="input-block">
		<input
			class="input-block__input"
			:class="{ 'input-block__input--error': error }"
			@input="updateValue"
			autocomplete="on"
			:value="modelValue"
			:placeholder="placeholder"
			:type="type"
		/>
		<div v-if="error" class="input-block__error-message">{{ error }}</div>
	</div>
</template>
