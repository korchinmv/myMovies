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
					<NuxtLink class="header__signin button-primary" to="/login">
						<span class="button-primary__text">Войти</span>
					</NuxtLink>
				</div>
				<slot />
			</div>
		</div>
	</header>
</template>
