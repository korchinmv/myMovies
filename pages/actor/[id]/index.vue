<script setup lang="ts">
	const activeTabIndex = ref<number>(0);
	const tabs = [{ title: "Фильмы" }, { title: "Факты" }];
	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};
</script>

<template>
	<div class="actor">
		<OrganismsHeroSection bgImage="/img/bg/actor-page.jpg">
			<AtomsPageTitle class="actor__title" pageTitle="Киану Ривз" />
			<div class="actor__wrapper">
				<NuxtImg
					class="actor__img"
					src="https://i.pinimg.com/originals/ad/9a/83/ad9a83897c09edb216578229a45307c7.jpg"
					alt="actor"
					width="240"
				/>

				<ul class="actor__content-list">
					<li class="actor__content-item">
						<span class="actor__content-text">Карьера:</span>
						<span class="actor__content-text">Актер, Продюсер, Сценарист</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Всего фильмов:</span>
						<span class="actor__content-text">274</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Родился:</span>
						<span class="actor__content-text">02.09.1964</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Умер:</span>
						<span class="actor__content-text">02.09.1964</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Место рождения:</span>
						<span class="actor__content-text">Бейрут, Ливан</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Место смерти:</span>
						<span class="actor__content-text">Бейрут, Ливан</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Возраст:</span>
						<span class="actor__content-text">59 лет</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Рост:</span>
						<span class="actor__content-text">186 см</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Муж/жена:</span>
						<span class="actor__content-text">-</span>
					</li>
					<li class="actor__content-item">
						<span class="actor__content-text">Награды:</span>
						<span class="actor__content-text">1</span>
					</li>
				</ul>
			</div>
		</OrganismsHeroSection>
		<OrganismsContentSection>
			<template #head-content>
				<MoleculesTabs
					class="actor__tabs"
					:tabs="tabs"
					@tab-change="onTabChange"
				/>
			</template>

			<template #body-content>
				<MoleculesTabsContent :active-tab-index="activeTabIndex">
					<template #tab1>
						<h2>Фильмы</h2>
					</template>

					<template #tab2>
						<h2>Факты</h2>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
