<template>
	<section class="content-section">
		<div class="content-section__head">
			<div class="container">
				<div class="content-section__head-wrapper">
					<slot name="title"></slot>
					<slot name="text"></slot>
				</div>
			</div>
		</div>

		<div class="content-section__body">
			<div class="container">
				<div class="content-section__inner">
					<ul class="content-section__list">
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
						<li class="content-section__item">
							<OrganismsMovieCard class="movie-card--genre" />
						</li>
					</ul>

					<slot name="link" />
				</div>
			</div>
		</div>
	</section>
</template>
