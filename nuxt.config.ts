// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/fonts',
		'@nuxt/ui',
		'@nuxtjs/color-mode',
		'@nuxtjs/seo',
		'@nuxt/icon',
	],
	devServer: {
		port: 5007,
	},
	css: ['~/assets/css/main.css'],
})
