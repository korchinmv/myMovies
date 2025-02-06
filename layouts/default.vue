<script lang="ts" setup>
	import { OrganismsFooter } from "#components";
</script>

<template>
	<div class="layout">
		<OrganismsHeader />
		<OrganismsMobileMenu />

		<main class="main">
			<div class="container">
				<slot />
			</div>
		</main>

		<OrganismsFooter />
	</div>
</template>
