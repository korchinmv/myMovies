<script lang="ts" setup></script>

<template>
	<div class="layout">
		<OrganismsHeader />
		<OrganismsMobileMenu />

		<main class="main">
			<div class="container">
				<slot />
			</div>
		</main>

		<footer class="footer">footer</footer>
	</div>
</template>
