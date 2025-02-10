<script lang="ts" setup>
	import { OrganismsHeroSection } from "#components";

	useSeoMeta({
		title: "myMovie - смотреть фильмы, сериалы онлайн в хорошем качестве",
		description: "myMovie - смотреть фильмы, сериалы онлайн в хорошем качестве",
	});
</script>

<template>
	<OrganismsHeroSection bgImage="img/bg/bg-main-page.jpeg">
		<OrganismsSlider />
	</OrganismsHeroSection>

	<div>
		<div class="container"></div>
	</div>
</template>
