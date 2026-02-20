import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Z-Docs",
    description: "Official Documentation for Z-Core & Dashboard",
    base: '/z-docs/',

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Z-Core', link: '/core/introduction' },
            { text: 'Dashboard', link: '/dashboard/getting-started' }
        ],

        sidebar: {
            '/core/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/core/introduction' },
                        { text: 'Installation', link: '/core/installation' },
                        { text: 'Configuration', link: '/core/configuration' },
                        { text: 'Framework Bridges', link: '/core/framework-bridges' }
                    ]
                },
                {
                    text: 'Systems',
                    items: [
                        { text: 'Permissions', link: '/core/permissions' }
                    ]
                }
            ],
            '/dashboard/': [
                {
                    text: 'Z-Dashboard',
                    items: [
                        { text: 'Getting Started', link: '/dashboard/getting-started' },
                        { text: 'Live Map', link: '/dashboard/live-map' },
                        { text: 'Player Management', link: '/dashboard/player-management' },
                        { text: 'Economy & Vehicles', link: '/dashboard/economy-vehicles' },
                        { text: 'Security Logs', link: '/dashboard/security-logs' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/zhoraFPS' }
        ],

        search: {
            provider: 'local'
        }
    }
})
