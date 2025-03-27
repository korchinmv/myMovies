<script setup lang="ts">
	import { Field, Form } from "vee-validate";
	import { useRegisterValidation } from "~/composables/useAuthValidation";
	import { useAuthComposable } from "~/composables/useAuthComposable";

	const { schema } = useRegisterValidation();
	const { register, error, isLoading, redirectPath } = useAuthComposable();
	const successMessage = ref<string | null>(null);
	const errorMessage = ref<string | null>(null);

	definePageMeta({
		layout: "clear",
		auth: false,
	});

	useSeoMeta({
		title: "myMovies - Регистрация",
		description: "myMovies - Регистрация",
	});

	const onSubmit = async (values: any) => {
		const { email, name, password } = values;
		const result = await register({ email, name, password });

		if (result.success) {
			successMessage.value = "Регистрация прошла успешно!";
			await navigateTo(redirectPath.value || "/profile", { replace: true });
		} else {
			errorMessage.value = "Не удалось зарегистрироваться";
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

					<Field name="name" v-slot="{ field, errors }">
						<AtomsInputBlock
							:modelValue="field.value"
							@update:modelValue="field.onInput"
							placeholder="Ваше имя"
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

					<div class="sign-form__success-message" v-if="successMessage">
						{{ successMessage }}
					</div>

					<button
						class="form__btn button-primary"
						type="submit"
						:disabled="isLoading"
						v-else
					>
						<span v-if="!isLoading">Зарегистрироваться</span>
						<span v-else>Обработка...</span>
					</button>

					<div class="sign-form__error-message" v-if="errorMessage">
						{{ errorMessage }}
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
