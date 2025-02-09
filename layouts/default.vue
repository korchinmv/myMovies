<script lang="ts" setup>
	import { OrganismsFooter } from "#components";
</script>

<template>
	<div class="layout">
		<OrganismsHeader />
		<OrganismsMobileMenu />

		<main class="main">
			<slot />
		</main>

		<OrganismsFooter />
	</div>
</template>
