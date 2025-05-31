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
	app: {
		head: {
			title: 'BFC',
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/media/bfc.ico' },
			],
			meta: [
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'theme-color', content: '#BA181B' },
			],
		},
	},
	seo: {
		meta: {
			ogType: 'website',
			ogUrl: `https://${process.env.domain || 'example.com'}`,
			ogTitle: 'Busted for Cheating!',
			ogSiteName: 'Online exams know when you cheat',
			ogImage: '/media/bfc2.png',
			ogDescription: "Web apps can tell when you're not paying attention — or trying to cheat. Busted for Cheating reveals how simple browser features can expose your behavior during online tests.",
		},
	},
	site: {
		url: `https://${process.env.domain || 'example.com'}`,
		name: 'Busted for Cheating',
	},
})
