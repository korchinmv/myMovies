<script setup lang="ts">
	const isActiveButton = ref<boolean>(false);

	const toggleActiveButton = () => {
		return (isActiveButton.value = !isActiveButton.value);
	};
</script>

<template>
	<div class="categories">
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
					<NuxtLink class="categories__link" to="/genres">Жанры</NuxtLink>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/actors">Актеры</NuxtLink>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/premieres">Премьеры</NuxtLink>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/top">Топ 250</NuxtLink>
				</li>
			</ul>

			<ul class="categories__list">
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/films">Фильмы</NuxtLink>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/series">Сериалы</NuxtLink>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/mini-series"
						>Мини сериалы</NuxtLink
					>
				</li>
				<li class="categories__item">
					<NuxtLink class="categories__link" to="/tv-show">ТВ Шоу</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>
