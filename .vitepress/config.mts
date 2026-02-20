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
                        { text: 'Framework Bridges', link: '/core/framework-bridges' },
                        { text: 'Permissions', link: '/core/permissions' }
                    ]
                },
                {
                    text: 'Developer API',
                    items: [
                        { text: 'Exports & Methods', link: '/core/developer-api' },
                        { text: 'Client Events', link: '/core/events' }
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
                },
                {
                    text: 'Technical',
                    items: [
                        { text: 'NUI & WebSockets', link: '/dashboard/developer-api' },
                        { text: 'Database Schema', link: '/dashboard/database-schema' }
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
