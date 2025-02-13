<script setup lang="ts"></script>

<template>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__item">
				<NuxtLink class="navigation__link" to="/movies">Фильмы</NuxtLink>
			</li>

			<li class="navigation__item">
				<NuxtLink class="navigation__link" to="/series">Сериалы</NuxtLink>
			</li>

			<li class="navigation__item">
				<NuxtLink class="navigation__link" to="/shows">ТВ Шоу</NuxtLink>
			</li>
		</ul>
	</nav>
</template>
