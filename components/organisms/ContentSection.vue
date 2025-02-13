<template>
	<section class="content-section">
		<div class="content-section__head">
			<div class="container">
				<slot name="title"></slot>
			</div>
		</div>

		<div class="content-section__body">
			<div class="container">
				<div class="content-section__inner">
					<ul class="content-section__list">
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--content" />
						</li>
					</ul>

					<slot name="link" />
				</div>
			</div>
		</div>
	</section>
</template>
