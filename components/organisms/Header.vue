<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper">
				<MoleculesLogo />
				<MoleculesCategories class="header__categories" />
				<MoleculesNavigation />
				<slot />
			</div>
		</div>
	</header>
</template>
