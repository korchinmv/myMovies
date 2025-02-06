<script setup lang="ts">
	import { MoleculesSocialsList } from "#components";
</script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__content">
				<div class="footer__content-left">
					<MoleculesLogo class="footer__logo" />
					<p class="footer__text">
						Ваш личный мир кино, где вы можете смотреть любимые фильмы и сериалы
						прямо из дома. Наш сервис предлагает огромный каталог новинок и
						классиков из разных жанров, а также удобный интерфейс для
						комфортного просмотра.
					</p>
				</div>

				<div class="footer__content-right">
					<MoleculesSocialsList />
				</div>
			</div>

			<p class="footer__name">Вэб-разработчик Корчин М. В. 2025 год</p>
		</div>
	</footer>
</template>
