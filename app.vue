<template>
	<Analytics />
	<UApp>
		<div class="2xl:mt-35 2xl:mx-30 lg:mt-10 lg:mx-10 flex text-white 2xl:gap-40 lg:gap-10">
			<div class="w-[50%]">
				<header>
					<div class="flex items-center gap-5">
						<h1 class="font-bold text-7xl lg:text-6xl">Busted for <span>Cheating</span></h1>
						<img src="/media/bfc-eye.webp" height="100px" width="100px" />
					</div>
					<h2 class="text-xl lg:text-2xl"><span>Online exams</span> and web apps<br>know when you cheat.</h2>
				</header>
				<div class="2xl:mt-25 lg:mt-7 2xl:text-xl lg:text-lg">
					<p>
						Since <span>2011</span>, a small <span>JavaScript feature</span> has quietly allowed websites
						to<br><span>detect when you're actively viewing a tab</span>.<br>Originally meant for pausing videos or saving battery,
						it's now used by test platforms to catch cheaters switching tabs or becoming inactive.
					</p>
					<p class="2xl:mt-5 lg:mt-4">In just <span>a few lines of code</span>,<br>any website can know when you're <span>paying attention — or not.</span></p>
				</div>
				<USeparator color="primary" class="2xl:mt-25 lg:mt-4" />
				<footer class="2xl:mt-25 lg:mt-4 flex items-center">
					<p class="2xl:text-xl lg:text-lg">
						Made by <a href="https://github.com/PetyXbron">PetyXbron</a> © 2025
						| <a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT</a>
						|
					</p>
					<a href="https://github.com/PetyXbron/BustedForCheating" target="_blank"><Icon name="akar-icons:github-fill" size="20px" class="ml-2" /></a>
					<a href="https://dsc.gg/azator" target="_blank"><Icon name="akar-icons:discord-fill" size="20px" class="ml-2" /></a>
					<a href="https://twitter.com/intent/tweet?text=I%20just%20found%20BFC!%20Check%20it%20out!&url=https%3A%2F%2Fbfc.arim.dev&hashtags=education,cheating,chatgpt,ai" target="_blank"><Icon name="akar-icons:x-fill" size="20px" class="ml-2" /></a>
				</footer>
			</div>
			<div class="w-[50%]">
				<div>
					<div class="text-center">
						<h1 class="2xl:text-4xl lg:text-xl"><span>Try it</span> yourself.</h1>
						<h2 class="2xl:text-xl lg:text-sm">This logs every event about your view activity.</h2>
					</div>
					<div id="log" class="2xl:p-10 lg:p-3 mt-5 w-full rounded-lg max-h-[64vh] min-h-[64vh] overflow-y-auto" style="background-color: #161A1D;">
						<div v-for="(change, index) in limitedChanges" :key="index" class="2xl:text-base lg:text-xs mb-2">
							<span style="color: #D3D3D3 !important">[{{ getRelativeTime(change.time) }}]</span> <span>{{ change.event }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</UApp>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
const changes = ref<Array<{ time: number, event: string }>>([])
const timer = ref<ReturnType<typeof setInterval>>()

// Function to get relative time in seconds
const getRelativeTime = (timestamp: number): string => {
	const seconds = Math.floor((Date.now() - timestamp) / 1000)
	return `${seconds}s ago`
}

// Event listeners
onMounted(() => {
	// Log first event
	changes.value.unshift({
		time: Date.now(),
		event: 'Opened the page'
	})

	// Add 1 second interval
	timer.value = setInterval(() => {
		if (changes.value.length > 0) {
			changes.value = [...changes.value]
		}
	}, 1000)

	// Leave tab or window event
	window.addEventListener('blur', () => {
		changes.value.unshift({
			time: Date.now(),
			event: 'Left tab or window'
		})
	})

	// Return to tab or window event
	window.addEventListener('focus', () => {
		changes.value.unshift({
			time: Date.now(),
			event: 'Returned to tab or window'
		})
	})


	// Another way to detect tab visibility changes
	/* document.addEventListener('visibilitychange', () => {
		changes.value.unshift({
			time: Date.now(),
			event: document.hidden ? 'switched tabs' : 'returned to tab'
		})
	})*/
})

// Cleanup event listeners
onUnmounted(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})

// Limitting the number of changes displayed
const limitedChanges = computed(() => {
	return changes.value.slice(0, 50)
})
</script>