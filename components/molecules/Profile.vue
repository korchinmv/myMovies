<script setup lang="ts">
	import { useAuth } from "~/store/useAuth";

	const auth = useAuth();
	const { user } = storeToRefs(auth);
</script>

<template>
	<div class="profile">
		<NuxtLink class="profile__link" to="/profile">
			<span class="profile__name" v-if="user">{{ user.name }}</span>
		</NuxtLink>
	</div>
</template>
