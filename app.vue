<template>
	<Analytics />
	<UApp>
		<div class="mt-40 ml-40 flex gap-40 h-[100%] text-white">
			<div class="[&span]:text-red-500 [&>span]:font-bold max-w-[690px] w-[50%]">
				<header>
					<h1 class="text-7xl font-bold">Busted for <span>Cheating</span></h1>
					<h2 class="text-4xl"><span>Online exams</span> and web apps<br>know when you cheat.</h2>
				</header>
				<p class="mt-25 text-xl">
					Since <span>2011</span>, a small <span>JavaScript feature</span> has quietly allowed websites
					to<br><span>detect when you're actively viewing a tab</span>.<br>Originally meant for pausing videos or saving battery,
					it's now used by test platforms to catch cheaters switching tabs or becoming inactive.
				</p>
				<p class="text-xl mt-5">In just <span>a few lines of code</span>,<br>any website can know when you're <span>paying attention — or not.</span></p>
				<USeparator color="primary" class="mt-25" />
				<p class="text-xl mt-25">Made by <a href="https://petyxbron.cz">PetyXbron</a> © 2025 | <a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT License</a></p>
			</div>
			<div class="w-[50%]">
				<div>
					<div class="text-center">
						<h1 class="text-4xl"><span>Try it</span> yourself.</h1>
						<h2 class="text-xl">This logs every event about your view activity.</h2>
					</div>
					<div id="log" class="mt-5 w-full p-10 rounded-lg max-h-[64vh] min-h-[64vh] overflow-y-auto" style="background-color: #161A1D;">
						<div v-for="(change, index) in limitedChanges" :key="index" class="mb-2">
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

const getRelativeTime = (timestamp: number): string => {
	const seconds = Math.floor((Date.now() - timestamp) / 1000)
	return `${seconds}s ago`
}

// Event listeners
onMounted(() => {
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

	window.addEventListener('blur', () => {
		changes.value.unshift({
			time: Date.now(),
			event: 'Left tab or window'
		})
	})

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

onUnmounted(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})

const limitedChanges = computed(() => {
	return changes.value.slice(0, 50)
})
</script>