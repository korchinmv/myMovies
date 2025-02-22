<script lang="ts" setup>
	defineProps({
		bgImage: {
			type: String,
			required: true,
		},
	});
</script>

<template>
	<section
		class="hero-section"
		:style="`background: url(${bgImage}) no-repeat center / cover`"
	>
		<div class="container">
			<div class="hero-section__wrapper">
				<slot />
			</div>
		</div>
	</section>
</template>
