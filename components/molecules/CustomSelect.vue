<script setup lang="ts">
	interface Option {
		id: number | string;
		optionName: string;
	}

	defineProps<{
		options: Option[];
		modelValue: string | number;
		placeholder?: string;
	}>();

	const emit = defineEmits<{
		(e: "update:modelValue", value: string | number): void;
	}>();

	const isOpen = ref(false);
	const selectedOption = ref<Option | null>(null);

	const toggleDropdown = () => {
		isOpen.value = !isOpen.value;
	};

	const closeSelect = (): void => {
		isOpen.value = false;
	};

	const selectOption = (option: Option) => {
		selectedOption.value = option;
		emit("update:modelValue", option.id);
		isOpen.value = false;
	};
</script>

<template>
	<div
		class="custom-select"
		:class="{ active: isOpen }"
		v-click-outside="closeSelect"
	>
		<div class="custom-select__selected" @click="toggleDropdown">
			{{
				selectedOption
					? firstWordUppercase(selectedOption.optionName)
					: placeholder
			}}
			<slot />
		</div>

		<ul class="custom-select__options">
			<li
				class="custom-select__option"
				v-for="option in options"
				:key="option.id"
				@click="selectOption(option)"
			>
				{{ firstWordUppercase(option.optionName) }}
			</li>
		</ul>
	</div>
</template>
