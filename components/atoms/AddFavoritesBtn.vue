<script setup lang="ts">
	defineProps({
		text: {
			type: String,
		},
	});
</script>

<template>
	<button class="add-favorites-btn">
		<Icon
			class="add-favorites-btn__icon"
			name="material-symbols:heart-plus-outline-rounded"
			size="30px"
		/>
		<span class="add-favorites-btn__text" v-if="text">{{ text }}</span>
	</button>
</template>
