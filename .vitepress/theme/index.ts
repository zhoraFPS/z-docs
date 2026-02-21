import DefaultTheme    from 'vitepress/theme'
import HeroShowcase    from './HeroShowcase.vue'
import HeroCarousel    from './HeroCarousel.vue'
import TrustBar        from './TrustBar.vue'
import CodeWidget      from './CodeWidget.vue'
import ScreenshotFrame from './ScreenshotFrame.vue'
import SpotlightSection from './SpotlightSection.vue'
import CTABlock        from './CTABlock.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('HeroShowcase',    HeroShowcase)
        app.component('HeroCarousel',    HeroCarousel)
        app.component('TrustBar',        TrustBar)
        app.component('CodeWidget',      CodeWidget)
        app.component('ScreenshotFrame', ScreenshotFrame)
        app.component('SpotlightSection', SpotlightSection)
        app.component('CTABlock',        CTABlock)
    }
}
