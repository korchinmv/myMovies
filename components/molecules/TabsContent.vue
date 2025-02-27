<script setup lang="ts">
	defineProps({
		activeTabIndex: {
			type: Number,
			required: true,
		},
	});
</script>

<template>
	<ul>
		<li v-if="activeTabIndex === 0"><slot name="tab1"></slot></li>
		<li v-if="activeTabIndex === 1"><slot name="tab2"></slot></li>
		<li v-if="activeTabIndex === 2"><slot name="tab3"></slot></li>
		<li v-if="activeTabIndex === 3"><slot name="tab4"></slot></li>
	</ul>
</template>
