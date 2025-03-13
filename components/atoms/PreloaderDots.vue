<template>
	<div class="preloader-dots">
		<div class="dot"></div>
		<div class="dot"></div>
		<div class="dot"></div>
	</div>
</template>

<style scoped>
	.preloader-dots {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	.dot {
		width: 12px;
		height: 12px;
		background-color: var(--accent-color);
		border-radius: 50%;
		animation: jump 0.6s infinite alternate;
	}

	.dot:nth-child(1) {
		animation-delay: 0s;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes jump {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-20px);
		}
	}
</style>
