// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/fonts',
		'@nuxt/ui',
		'@nuxtjs/seo',
		'@nuxt/icon',
		'nuxt-gtag'
	],
	devServer: {
		port: 5007,
	},
	css: ['~/assets/css/main.css'],
	icon: {
		serverBundle: {
			collections: ['akar-icons']
		},
	},
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
			ogImage: '/media/bfc-cropped.webp',
			ogDescription: "Web apps can tell when you're not paying attention — or trying to cheat. Busted for Cheating reveals how simple browser features can expose your behavior during online tests.",
		},
	},
	site: {
		url: `https://${process.env.domain || 'example.com'}`,
		name: 'Busted for Cheating',
	},
	gtag: {
		enabled: !import.meta.dev,
		initCommands: [
			['consent', 'default', {
				ad_user_data: 'denied',
				ad_personalization: 'denied',
				ad_storage: 'denied',
				analytics_storage: 'denied',
				wait_for_update: 500,
			}],
		]
	},
})
