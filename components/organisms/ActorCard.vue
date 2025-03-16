<script lang="ts" setup>
	import type { TActor } from "~/types/Actor";

	defineProps<{
		actor: TActor;
	}>();
</script>

<template>
	<article class="actor-card">
		<NuxtLink class="actor-card__link" :to="`/actor/${actor.staffId}`">
			<NuxtImg
				class="actor-card__img"
				:src="actor.posterUrl"
				:alt="actor.nameRu"
			/>
			<h4 class="actor-card__name">{{ actor.nameRu }}</h4>
			<p class="actor-card__proff">
				{{ deleteLastWord(actor.professionText) }}
			</p>
		</NuxtLink>
	</article>
</template>
