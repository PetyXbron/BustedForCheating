<template>
	<Analytics />
	<SpeedInsights />
	<UApp>
		<div class="flex items-center min-h-screen">
			<div class="flex flex-col mt-15 md:mt-0 md:flex-row 2xl:mx-30 xl:mx-10 mx-6 text-white 2xl:gap-20 xl:gap-10 lg:gap-5 md:gap-3">
				<div class="md:w-[50%]">
					<header>
						<div class="md:flex hidden items-center gap-5">
							<h1 class="font-bold 2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl">Busted for <span>Cheating</span></h1>
							<img src="/media/bfc-eye.webp" class="h-10 2xl:h-15 xl:h-15 lg:h-10 md:h-8" alt="Logo" />
						</div>
						<div class="md:hidden text-center items-center">
							<img src="/media/bfc-eye.webp" class="h-10 mx-auto" alt="Logo" />
							<h1 class="font-bold text-4xl">Busted for <span>Cheating</span></h1>
						</div>
						<h2 class="text-center md:text-left text-xl xl:text-2xl md:text-base mt-5 md:mt-0"><span>Online exams</span> and web apps know when you cheat.</h2>
					</header>
					<div class="mt-15 md:mt-25 2xl:text-xl xl:text-xl md:text-base text-base">
						<p>
							Since <span>2011</span>, a small <span>JavaScript feature</span> has quietly allowed websites
							to<br><span>detect when you're actively viewing a tab</span>.<br>Originally meant for pausing videos or saving battery,
							it's now used by test platforms to catch cheaters switching tabs or becoming inactive.
						</p>
						<p class="mt-10">In just <span>a few lines of code</span>,<br>any website can know when you're <span>paying attention — or not.</span></p>
					</div>
					<USeparator color="primary" class="mt-15 md:mt-[5%]" />
					<footer class="md:flex hidden items-center mt-28">
						<p class="2xl:text-xl xl:text-xl">
							Made by <a href="https://github.com/PetyXbron">PetyXbron</a> © 2025
							| <a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT</a>
							|
						</p>
						<a href="https://github.com/PetyXbron/BustedForCheating" target="_blank">
							<Icon name="akar-icons:github-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
						</a>
						<a href="https://dsc.gg/azator" target="_blank">
							<Icon name="akar-icons:discord-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
						</a>
						<a href="https://twitter.com/intent/tweet?text=I%20just%20found%20BFC!%20Check%20it%20out!&url=https%3A%2F%2Fbfc.arim.dev&hashtags=education,cheating,chatgpt,ai" target="_blank">
							<Icon name="akar-icons:x-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
						</a>
					</footer>
				</div>
				<div class="mt-15 md:mt-0 md:w-[50%]">
					<div>
						<div class="text-center">
							<h1 class="text-2xl 2xl:text-4xl xl:text-3xl md:text-2xl"><span>Try it</span> yourself.</h1>
							<h2 class="2xl:text-xl xl:text-lg md:text-base">This logs every event about your view activity.</h2>
						</div>
						<div id="log" class="p-10 xl:p-6 md:p-4 mt-5 w-full rounded-lg max-h-[64vh] min-h-[64vh] overflow-y-auto" style="background-color: #161A1D;">
							<div v-for="(change, index) in limitedChanges" :key="index" class="2xl:text-base xl:text-base lg:text-sm md:text-sm mb-2">
								<span style="color: #D3D3D3 !important">[{{ getRelativeTime(change.time) }}]</span> <span>{{ change.event }}</span>
							</div>
						</div>
					</div>
					<div class="block md:hidden">
						<USeparator color="primary" class="mt-15 md:mt-[5%]" />
						<footer class="flex justify-center items-center my-28">
							<p class="2xl:text-xl xl:text-xl">
								Made by <a href="https://github.com/PetyXbron">PetyXbron</a> © 2025
								| <a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT</a>
								|
							</p>
							<a href="https://github.com/PetyXbron/BustedForCheating" target="_blank">
								<Icon name="akar-icons:github-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
							</a>
							<a href="https://dsc.gg/azator" target="_blank">
								<Icon name="akar-icons:discord-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
							</a>
							<a href="https://twitter.com/intent/tweet?text=I%20just%20found%20BFC!%20Check%20it%20out!&url=https%3A%2F%2Fbfc.arim.dev&hashtags=education,cheating,chatgpt,ai" target="_blank">
								<Icon name="akar-icons:x-fill" size="20px" class="ml-2 xl:ml-1 flex justify-center" />
							</a>
						</footer>
					</div>
				</div>
			</div>
		</div>
	</UApp>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
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

	document.title = 'BFC | Tab active'

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
		document.title = 'BFC | Tab closed'
	})

	// Return to tab or window event
	window.addEventListener('focus', () => {
		changes.value.unshift({
			time: Date.now(),
			event: 'Returned to tab or window'
		})
		document.title = 'BFC | Tab active'
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