<template>
    <div id="login-container" class="login-container relative w-full h-full flex flex-column align-items-center justify-content-center">
        <h1 class="form-title mb-4">
            Войти
            <i class="pi pi-sign-in ml-1" style="font-size: 1.3rem; color: var(--basic-color-fg); font-weight: 900"></i>
        </h1>

        <form @submit.prevent class="w-5 flex flex-column align-items-center justify-content-center">
            <!-- Login -->
            <InputGroup class="mb-4 shadow-2 border-round-lg">
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText 
                placeholder="Логин" 
                v-model="login"
                :invalid="isInvalidLogin"
                />
                <InputGroupAddon>
                    <i class="pi pi-question-circle light-text cursor-pointer" v-tooltip.right="`- мин. 3 символа \n - запрещены спецсимволы`"></i>
                </InputGroupAddon>
            </InputGroup>

            <!-- Password -->
            <InputGroup class="mb-3 shadow-2 border-round-lg">
                <InputGroupAddon>
                    <i class="pi pi-key"></i>
                </InputGroupAddon>
                <InputText 
                placeholder="Пароль" 
                type="password"
                v-model="password"
                :invalid="isInvalidPassword"
                />
                <InputGroupAddon>
                    <i class="pi pi-question-circle light-text cursor-pointer" v-tooltip.right="'мин. 6 символов'"></i>
                </InputGroupAddon>
            </InputGroup>
            <!-- CONFIRM BUTTON -->
            <Button 
            class="ml-auto" 
            icon="pi pi-send" 
            text 
            raised 
            :loading="isLoadingConfirmData"
            @click="handlerConfirmForm"
            />
            <p class="mt-3 mr-auto">Нет учетной записи? <a class="link ml-2" @click="handlerOpenLogup">Создайте её!</a></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { onMounted, ref, type Ref } from 'vue';
import { loginApi } from '@/api/authApi';
import type { LoginInputData } from '@/types/apiTypes';
import { useMainStore } from '@/stores/mainStore';
import { hasSpecSymbols } from '@/utils/validation';

const store = useMainStore();
const router = useRouter();

const login: Ref<string> = ref('');
const password: Ref<string> = ref('');
const isInvalidLogin: Ref<boolean> = ref(false);
const isInvalidPassword: Ref<boolean> = ref(false);
const isLoadingConfirmData: Ref<boolean> = ref(false);



function validationForm(): boolean {
    try {
        let isValid = true;
        if(!login) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        if(login.value.length < 3) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        if(hasSpecSymbols(login.value)) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        if(!password) {
            isInvalidPassword.value = true;
            isValid = false;
        }
        return isValid;
    } catch (err) {
        console.error('/src/views/LoginViews/LoginView.vue: handlerConfirmForm => ', err);
        throw err;
    }
}

async function handlerConfirmForm(): Promise<void> {
    isLoadingConfirmData.value = true;
    try {
        if(validationForm()) {
            const dataMe: LoginInputData = await loginApi({ login: login.value, password: password.value });
            if(dataMe) {
                localStorage.setItem('user_data', JSON.stringify(dataMe));
                store.isAuth = true;
                store.userData = dataMe;
                router.push({ name: 'main' });
            }
        }
    } catch (err) {
        console.error('/src/views/LoginViews/LoginView.vue: handlerConfirmForm => ', err);
        throw err;
    } finally {
        isLoadingConfirmData.value = false;
    }
}

function handlerOpenLogup() {
    gsap.to('#login-container', { duration: .2, delay: 0, transform: 'translateY(-100%)' }).then(() => {
        router.push({ name: 'logup' });
    });
}

onMounted(async () => {
    gsap.to('#login-container', { duration: .2, delay: 0.3, transform: 'translateY(0%)' })
});


</script>

<style scoped>
.form-title {
    font-size: 2.4rem;
    color: var(--basic-color-fg);
}
#login-container {
    transform: translateY(-100%);
}
</style>