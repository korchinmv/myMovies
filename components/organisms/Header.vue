<script setup lang="ts">
	import { useAuth } from "~/store/useAuth";

	const authStore = useAuth();
	const { isAuth } = storeToRefs(authStore);
</script>

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

					<NuxtLink class="header__favorites" to="/favorites" v-if="isAuth">
						<Icon
							class="header__favorites-icon"
							size="30"
							name="ph:heart-bold"
						/>
					</NuxtLink>

					<AtomsLoginBtn
						class="header__signin signin-btn"
						link="/login"
						v-if="!isAuth"
					>
						<span class="button-primary__text signin-btn__text">Вход</span>
						<Icon class="signin-btn__icon" name="fluent:arrow-exit-20-filled" />
					</AtomsLoginBtn>

					<MoleculesProfile class="header__profile" v-else />

					<AtomsBurgerBtn class="header__burger" />
				</div>
				<slot />
			</div>
		</div>
	</header>
</template>
