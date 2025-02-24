<script setup lang="ts">
	interface Tab {
		title: string;
		name: string;
	}

	defineProps<{
		tabs: Tab[];
	}>();

	const emit = defineEmits<{
		(e: "tab-change", index: number): void;
	}>();

	const activeTab = ref<number>(0);

	const selectTab = (index: number) => {
		activeTab.value = index;
		emit("tab-change", index);
	};
</script>

<template>
	<ul class="tabs">
		<li
			class="tabs__item"
			v-for="(tab, index) in tabs"
			:key="index"
			:class="{ active: activeTab === index }"
			@click="selectTab(index)"
		>
			<button class="tabs__button">
				{{ tab.title }}
			</button>
		</li>
	</ul>
</template>
