import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router/index';
import { createPinia } from 'pinia'

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// Styles
import './styles/main.css';
import '../node_modules/primeflex/primeflex.css';
// Components
import primeComponents from '@/components/primevue_components';


const app = createApp(App);

primeComponents.forEach((component) => {
    app.component(component.name, component);
});

app.use(createPinia());
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
        },
    }
});
app.mount('#app');


