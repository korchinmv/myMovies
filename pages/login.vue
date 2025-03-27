<script setup lang="ts">
	import { Field, Form } from "vee-validate";
	import { useLoginValidation } from "~/composables/useAuthValidation";
	import { useAuthComposable } from "~/composables/useAuthComposable";

	const { schema } = useLoginValidation();
	const { login, error, isLoading, redirectPath } = useAuthComposable();
	const successMessage = ref<string | null>(null);
	const errorMessage = ref<string | null>(null);

	definePageMeta({
		layout: "clear",
		auth: false,
	});

	useSeoMeta({
		title: "myMovies - Вход",
		description: "myMovies - Вход",
	});

	const onSubmit = async (values: any) => {
		const { email, password } = values;
		const result = await login({ email, password });

		if (result.success) {
			successMessage.value = "Вход выполнен успешно!"; // Устанавливаем сообщение
			await navigateTo(redirectPath.value || "/profile", { replace: true });
		} else {
			errorMessage.value = "Не удалось войти";
			console.log(error.value);
		}
	};
</script>

<template>
	<OrganismsSignForm class="fade-in">
		<template #form>
			<ClientOnly>
				<Form
					class="sign-form__form"
					:validation-schema="schema"
					@submit="onSubmit"
				>
					<Field name="email" v-slot="{ field, errors }">
						<AtomsInputBlock
							:modelValue="field.value"
							@update:modelValue="field.onInput"
							placeholder="Почта"
							:error="errors[0]"
						/>
					</Field>

					<Field name="password" v-slot="{ field, errors }">
						<AtomsInputBlock
							:modelValue="field.value"
							@update:modelValue="field.onInput"
							placeholder="Пароль"
							:error="errors[0]"
							type="password"
						/>
					</Field>

					<div class="sign-form__success-message" v-if="successMessage">
						{{ successMessage }}
					</div>

					<button
						class="form__btn button-primary"
						type="submit"
						:disabled="isLoading"
					>
						<span v-if="!isLoading">Войти</span>
						<span v-else>Обработка...</span>
					</button>

					<div class="sign-form__error-message" v-if="error">
						{{ error }}
					</div>
				</Form>
			</ClientOnly>
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
