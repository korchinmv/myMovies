<template>
	<div class="sign-form">
		<MoleculesLogo class="sign-form__logo" />

		<form class="sign-form__form" action="#">
			<slot name="form"></slot>
		</form>

		<slot name="form-footer"></slot>
	</div>
</template>
