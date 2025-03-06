<script lang="ts" setup>
	import type { TNews } from "~/types/News";
	import dateStringFormat from "~/utils/dateStringFormat";

	defineProps({
		news: {
			type: Object as PropType<TNews>,
			required: true,
		},
	});
</script>

<template>
	<article class="news-card">
		<a class="news-card__link" :href="news.url" target="_blank">
			<NuxtImg class="news-card__img" :src="news.imageUrl" :alt="news.title" />

			<div class="news-card__info">
				<h3 class="news-card__title">
					{{ news.title }}
				</h3>

				<p class="news-card__descr">
					{{ news.description }}
				</p>

				<span class="news-card__date">{{
					dateStringFormat(news.publishedAt)
				}}</span>
			</div>
		</a>
	</article>
</template>
