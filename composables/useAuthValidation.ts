import * as yup from "yup";

export const useRegisterValidation = () => {
	const schema = yup.object({
		email: yup
			.string()
			.required("Почта обязательна")
			.email("Введите корректный email"),
		name: yup.string().required("Имя обязательно"),
		password: yup
			.string()
			.required("Пароль обязателен")
			.min(6, "Пароль должен содержать не менее 6 символов"),
		repeatPassword: yup
			.string()
			.required("Повторите пароль")
			.oneOf([yup.ref("password")], "Пароли не совпадают"),
	});

	return { schema };
};

export const useLoginValidation = () => {
	const schema = yup.object({
		email: yup
			.string()
			.required("Почта обязательна")
			.email("Введите корректный email"),
		password: yup
			.string()
			.required("Пароль обязателен")
			.min(6, "Пароль должен содержать не менее 6 символов"),
	});

	return { schema };
};
