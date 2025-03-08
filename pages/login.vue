<script setup lang="ts">
	definePageMeta({
		layout: "clear",
	});

	useSeoMeta({
		title: "myMovies - Вход",
		description: "myMovies - Вход",
	});

	const form = reactive({
		email: "",
		password: "",
	});
</script>

<template>
	<OrganismsSignForm>
		<template #form>
			<AtomsInput placeholder="Почта" v-model="form.email" />
			<AtomsInput
				placeholder="Пароль"
				v-model="form.password"
				type="password"
			/>
			<button class="form__btn button-primary">Войти</button>
		</template>
		<template #form-footer>
			<div class="sign-form__form-footer">
				Нет аккаунта?
				<NuxtLink class="sign-form__form-footer-link" to="/register"
					>Зарегистрироваться</NuxtLink
				>
			</div>
		</template>
	</OrganismsSignForm>
</template>
