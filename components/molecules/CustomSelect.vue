<script setup lang="ts">
	interface Option {
		id: number;
		genre?: string;
		country?: string;
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
					? firstWordUppercase(selectedOption.genre || selectedOption.country)
					: placeholder
			}}
			<Icon
				class="custom-select__icon"
				name="material-symbols:arrow-drop-down"
				size="20px"
			/>
		</div>

		<ul class="custom-select__options">
			<li
				class="custom-select__option"
				v-for="option in options"
				:key="option.id"
				@click="selectOption(option)"
			>
				{{ firstWordUppercase(option.genre || option.country) }}
			</li>
		</ul>
	</div>
</template>
