import DefaultTheme from 'vitepress/theme'
import HeroShowcase  from './HeroShowcase.vue'
import HeroCarousel  from './HeroCarousel.vue'
import TrustBar      from './TrustBar.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('HeroShowcase',  HeroShowcase)
        app.component('HeroCarousel',  HeroCarousel)
        app.component('TrustBar',      TrustBar)
    }
}
