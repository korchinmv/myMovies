<script lang="ts" setup>
	import { useMobileMenu } from "~/store/useMobileMenu";
	import { storeToRefs } from "pinia";

	const mobileStore = useMobileMenu();
	const { isShowMobileMenu } = storeToRefs(mobileStore);
</script>

<template>
	<div class="mobile-menu" :class="{ 'mobile-menu--active': isShowMobileMenu }">
		<MoleculesSearchForm class="mobile-menu__search" />

		<nav class="mobile-menu__nav">
			<ul class="mobile-menu__nav-list">
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/movies">Фильмы</NuxtLink>
				</li>
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/series"
						>Сериалы</NuxtLink
					>
				</li>
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/collections"
						>Подборки</NuxtLink
					>
				</li>
			</ul>

			<ul class="mobile-menu__nav-list">
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/premieres"
						>Премьеры</NuxtLink
					>
				</li>
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/top">Топ 250</NuxtLink>
				</li>
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/genres">Жанры</NuxtLink>
				</li>
				<li class="mobile-menu__nav-item">
					<NuxtLink class="mobile-menu__nav-link" to="/news"
						>Новости кино</NuxtLink
					>
				</li>
			</ul>
		</nav>
	</div>
</template>
