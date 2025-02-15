<script setup lang="ts">
	definePageMeta({
		layout: "sign",
	});

	useSeoMeta({
		title: "myMovies - Регистрация",
		description: "myMovies - Регистрация",
	});

	const form = reactive({
		email: "",
		password: "",
		repeatPassword: "",
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
			<AtomsInput
				placeholder="Повторите пароль"
				v-model="form.repeatPassword"
				type="password"
			/>
			<button class="form__btn button-primary">Зарегистрироваться</button>
		</template>
		<template #form-footer>
			<div class="sign-form__form-footer">
				Есть аккаунт?
				<NuxtLink class="sign-form__form-footer-link" to="/login"
					>Войти</NuxtLink
				>
			</div>
		</template>
	</OrganismsSignForm>
</template>
