module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"airbnb-base",
		"plugin:vue/essential",
		"plugin:vue/vue3-recommended",
		"plugin:nuxt/recommended",
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {},
	settings: {
		"import/resolver": {
			nuxt: {
				extensions: [".js", ".vue"],
			},
		},
	},
};
