import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router/index';
import { createPinia } from 'pinia'

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
// Styles
import './styles/main.css';
import '../node_modules/primeflex/primeflex.css';
// Components
import primeComponents from '@/components/primevue_components';
// Services
import primeServices from './services/primeServices';


const app = createApp(App);

primeComponents.forEach((component) => {
    app.component(component.name, component);
});

primeServices.forEach((plugin) => {
    app.use(plugin);
})

app.directive('tooltip', Tooltip);


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


