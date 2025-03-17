<script setup lang="ts">
	import { Field, Form } from "vee-validate";
	import * as yup from "yup";

	definePageMeta({
		layout: "clear",
	});

	useSeoMeta({
		title: "myMovies - Регистрация",
		description: "myMovies - Регистрация",
	});

	// Схема валидации с использованием Yup
	const schema = yup.object({
		email: yup
			.string()
			.required("Почта обязательна")
			.email("Введите корректный email"),
		password: yup
			.string()
			.required("Пароль обязателен")
			.min(6, "Пароль должен содержать не менее 6 символов"),
		repeatPassword: yup
			.string()
			.required("Повторите пароль")
			.oneOf([yup.ref("password")], "Пароли не совпадают"),
	});

	const errorMessage = ref<string | null>(null);
	const successMessage = ref<string | null>(null);

	// Функция для отправки данных на сервер
	const onSubmit = async (values: any) => {
		errorMessage.value = null;
		successMessage.value = null;

		try {
			// Отправка данных на сервер
			const response = await $fetch(
				"https://d81e510e2cfa1428.mokky.dev/register",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: values.email,
						password: values.password,
					}),
				}
			);

			// Обработка успешной регистрации
			successMessage.value = "Регистрация прошла успешно!";
			console.log("Успешная регистрация:", response);

			// Перенаправление на страницу входа
			setTimeout(() => {
				navigateTo("/login");
			}, 3000);
		} catch (error: any) {
			// Обработка ошибок
			if (error.data?.message) {
				errorMessage.value = error.data.message;
			} else {
				errorMessage.value = "Ошибка сети. Попробуйте позже.";
			}
			console.error("Ошибка регистрации:", error);
		}
	};
</script>

<template>
	<OrganismsSignForm>
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

					<Field name="repeatPassword" v-slot="{ field, errors }">
						<AtomsInputBlock
							:modelValue="field.value"
							@update:modelValue="field.onInput"
							placeholder="Повторите пароль"
							:error="errors[0]"
							type="password"
						/>
					</Field>

					<button type="submit" class="form__btn button-primary">
						Зарегистрироваться
					</button>

					<div v-if="errorMessage" class="error-message">
						{{ errorMessage }}
					</div>
					<div v-if="successMessage" class="success-message">
						{{ successMessage }}
					</div>
				</Form>
			</ClientOnly>
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

<style scoped>
	.error-message {
		color: red;
		margin-top: 10px;
	}

	.success-message {
		color: green;
		margin-top: 10px;
	}
</style>
