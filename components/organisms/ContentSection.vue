<template>
	<section class="content-section">
		<div class="content-section__head">
			<div class="container">
				<div class="content-section__head-wrapper">
					<slot name="head-content" />
				</div>
			</div>
		</div>

		<div class="content-section__body">
			<div class="container">
				<div class="content-section__inner">
					<slot name="body-content" />

					<slot name="link" />
				</div>
			</div>
		</div>
	</section>
</template>
