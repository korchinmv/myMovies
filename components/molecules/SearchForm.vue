<script lang="ts" setup>
	const router = useRouter();
	const searchQuery = ref<string>("");

	const handleSearch = (e: Event) => {
		e.preventDefault();
		if (searchQuery.value.trim()) {
			router.push({
				path: `/search/${searchQuery.value.trim().toLowerCase()}`,
			});

			searchQuery.value = "";
		}
	};
</script>

<template>
	<form class="search-form" action="#" @submit="handleSearch">
		<input
			class="search-form__input"
			v-model="searchQuery"
			type="text"
			placeholder="Найти фильм"
			required
		/>

		<button class="search-form__btn">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
				></path>
			</svg>
		</button>
	</form>
</template>
