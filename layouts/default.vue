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
