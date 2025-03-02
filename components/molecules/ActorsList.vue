<script setup lang="ts">
	const actors = [
		{
			staffId: 7836,
			nameRu: "Киану Ривз",
			nameEn: "Keanu Reeves",
			description: "Neo",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_7836.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 9838,
			nameRu: "Лоренс Фишбёрн",
			nameEn: "Laurence Fishburne",
			description: "Morpheus",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_9838.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 6226,
			nameRu: "Кэрри-Энн Мосс",
			nameEn: "Carrie-Anne Moss",
			description: "Trinity",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_6226.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 7836,
			nameRu: "Киану Ривз",
			nameEn: "Keanu Reeves",
			description: "Neo",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_7836.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 9838,
			nameRu: "Лоренс Фишбёрн",
			nameEn: "Laurence Fishburne",
			description: "Morpheus",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_9838.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 6226,
			nameRu: "Кэрри-Энн Мосс",
			nameEn: "Carrie-Anne Moss",
			description: "Trinity",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_6226.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 7836,
			nameRu: "Киану Ривз",
			nameEn: "Keanu Reeves",
			description: "Neo",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_7836.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 9838,
			nameRu: "Лоренс Фишбёрн",
			nameEn: "Laurence Fishburne",
			description: "Morpheus",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_9838.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 6226,
			nameRu: "Кэрри-Энн Мосс",
			nameEn: "Carrie-Anne Moss",
			description: "Trinity",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_6226.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 7836,
			nameRu: "Киану Ривз",
			nameEn: "Keanu Reeves",
			description: "Neo",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_7836.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 9838,
			nameRu: "Лоренс Фишбёрн",
			nameEn: "Laurence Fishburne",
			description: "Morpheus",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_9838.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
		{
			staffId: 6226,
			nameRu: "Кэрри-Энн Мосс",
			nameEn: "Carrie-Anne Moss",
			description: "Trinity",
			posterUrl:
				"https://st.kp.yandex.net/images/actor_iphone/iphone360_6226.jpg",
			professionText: "Актеры",
			professionKey: "ACTOR",
		},
	];
</script>

<template>
	<ul class="actors-list">
		<li class="actors-list__item" v-for="actor in actors" :key="actor.staffId">
			<OrganismsActorCard :actor="actor" />
		</li>
	</ul>
</template>
