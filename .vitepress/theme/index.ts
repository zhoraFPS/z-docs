import DefaultTheme from 'vitepress/theme'
import HeroShowcase from './HeroShowcase.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('HeroShowcase', HeroShowcase)
    }
}
