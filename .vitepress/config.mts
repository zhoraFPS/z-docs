import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Z-Docs",
    description: "Official Documentation for Z-Core & Dashboard",

    // Base path for GitHub Pages deployment (repo name)
    base: '/z-docs/',

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Dashboard', link: '/dashboard/getting-started' },
            { text: 'Core', link: '/core/introduction' }
        ],

        sidebar: {
            '/dashboard/': [
                {
                    text: 'Z-Dashboard',
                    items: [
                        { text: 'Getting Started', link: '/dashboard/getting-started' },
                        { text: 'Configuration', link: '/dashboard/configuration' },
                        { text: 'Features', link: '/dashboard/features' }
                    ]
                }
            ],
            '/core/': [
                {
                    text: 'Z-Core Framework',
                    items: [
                        { text: 'Introduction', link: '/core/introduction' },
                        { text: 'Installation', link: '/core/installation' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/zhoraFPS' },
            { icon: 'discord', link: 'https://discord.gg/yourdiscord' }
        ],

        search: {
            provider: 'local'
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Z-Core'
        }
    }
})
