<script setup lang="ts">
	const isActiveButton = ref<boolean>(false);
	const toggleActiveButton = () => {
		isActiveButton.value = !isActiveButton.value;
	};

	const closeMenu = (): void => {
		isActiveButton.value = false;
	};
</script>

<template>
	<div class="categories" v-click-outside="closeMenu">
		<button
			class="categories__btn"
			:class="{ 'categories__btn--active': isActiveButton }"
			@click="toggleActiveButton"
		>
			<span class="categories__btn-line long"></span>
			<span class="categories__btn-line short"></span>
		</button>

		<div class="categories__menu">
			<ul class="categories__list">
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/genres"
						>Жанры</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/actors"
						>Актеры</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/premieres"
						>Премьеры</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/top"
						>Топ 250</NuxtLink
					>
				</li>
			</ul>

			<ul class="categories__list">
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/movies"
						>Фильмы</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/series"
						>Сериалы</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink
						class="categories__link"
						@click="closeMenu"
						to="/mini-series"
						>Мини сериалы</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" @click="closeMenu" to="/shows"
						>ТВ Шоу</NuxtLink
					>
				</li>
			</ul>
		</div>
	</div>
</template>
