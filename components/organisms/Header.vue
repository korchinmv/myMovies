<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper">
				<div class="header__left">
					<MoleculesLogo />
					<MoleculesCategories class="header__categories" />
				</div>

				<MoleculesNavigation class="header__navigation" />

				<div class="header__actions">
					<MoleculesSearchForm class="header__search" />
					<AtomsAddFavoritesBtn class="header__favorites" />
					<AtomsLoginBtn class="header__signin" />
					<AtomsBurgerBtn class="header__burger" />
				</div>
				<slot />
			</div>
		</div>
	</header>
</template>
