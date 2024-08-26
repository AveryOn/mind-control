<template>
    <div id="logup-container" class="relative w-full h-full flex flex-column align-items-center justify-content-center">
        <Toast />
        <h1 class="form-title mb-5">
            Создать аккаунт
            <i class="pi pi-user-plus ml-1" style="font-size: 1.6rem; color: var(--basic-color-fg); font-weight: 900"></i>
        </h1>

        <form @submit.prevent @keyup.enter="handlerConfirmForm" class="w-5 flex flex-column align-items-center justify-content-center">
            <!-- Name -->
            <IconField class="w-full mb-4">
                <InputText 
                class="input w-full" 
                placeholder="Ваше имя" 
                v-model="formData.name"
                :invalid="isInvalidName"
                @update:model-value="isInvalidName = false"
                />
                <InputIcon class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
            </IconField>

            <!-- Login -->
            <IconField class="w-full mb-4">
                <InputText 
                class="input w-full" 
                placeholder="Логин" 
                v-model="formData.login"
                :invalid="isInvalidLogin" 
                @update:model-value="isInvalidLogin = false"
                />
                <InputIcon class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
            </IconField>

            <!-- Password -->
            <IconField class="w-full mb-4">
                <InputText 
                class="input w-full" 
                placeholder="Придумайте пароль" 
                :type="!isShowPassword? 'password' : 'text'" 
                v-model="formData.password"
                :invalid="isInvalidPassword"
                @update:model-value="isInvalidPassword = false"
                />
                <InputIcon v-if="!formData.password" class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
                <InputIcon v-else @click="isShowPassword = !isShowPassword" class="input-icon-eye" :class="(!isShowPassword)? 'pi pi-eye-slash' : 'pi pi-eye'"/>
            </IconField>

            <!-- Repeat Password -->
            <IconField class="w-full mb-4">
                <InputText 
                class="input w-full" 
                placeholder="Повторите пароль" 
                :type="!isShowPassword? 'password' : 'text'" 
                v-model="repeatPassword"
                :invalid="isInvalidRepeatPassword"
                @update:model-value="isInvalidRepeatPassword = false"
                />
                <InputIcon v-if="!repeatPassword" class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
                <InputIcon v-else @click="isShowPassword = !isShowPassword" class="input-icon-eye" :class="(!isShowPassword)? 'pi pi-eye-slash' : 'pi pi-eye'"/>
            </IconField>

            <Button 
            class="ml-auto" 
            icon="pi pi-send" 
            text 
            raised 
            @click="handlerConfirmForm"
            :loading="isLoadingConfirmData"
            />
            <p class="mt-3 mr-auto">Уже есть учетная запись? <a class="link ml-2" @click="handlerOpenLogin">Войти!</a></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { onMounted, ref, type Ref } from 'vue';
import { hasSpecSymbols } from '@/utils/validation';
import { logUpApi } from '@/api/authApi';
import type { LogUpInputData } from '@/types/apiTypes';
import { capitalizeText } from '@/utils/formatted';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();

const isLoadingConfirmData = ref(false);
const isShowPassword = ref(false);
const isInvalidName = ref(false);
const isInvalidLogin = ref(false);
const isInvalidPassword = ref(false);
const isInvalidRepeatPassword = ref(false);
const formData = ref({
    name: null as null | string,
    login: null as null | string,
    password: null as null | string,
});
const repeatPassword: Ref<null | string> = ref(null);

// Валидация формы
function validationForm(): boolean {
    try {
        let isValid = true;
        // VALIDATION NAME
        if(formData.value.name && hasSpecSymbols(formData.value.name, ' -')) {
            isInvalidName.value = true;
            isValid = false;
        }
        if(formData.value.name && formData.value.name.length < 3) {
            isInvalidName.value = true;
            isValid = false;
        }
        if(!formData.value.name) {
            isInvalidName.value = true;
            isValid = false;
        }
        // VALIDATION LOGIN
        if(!formData.value.login) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        if(formData.value.login && formData.value.login.length < 3) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        if(formData.value.login && hasSpecSymbols(formData.value.login)) {
            isInvalidLogin.value = true;
            isValid = false;
        }
        // VALIDATION PASSWORDS
        if(formData.value.password && formData.value.password.length < 6) {
            isInvalidPassword.value = true;
            isValid = false;
        }
        if(!formData.value.password) {
            isInvalidPassword.value = true;
            isValid = false;
        }
        if(repeatPassword.value !== formData.value.password) {
            isInvalidRepeatPassword.value = true;
            isValid = false;
        }
        return isValid;
    } catch (err) {
        console.error('/src/views/LoginViews/LogupView.vue: validationForm => ', err);
        throw err;
    }
}

// Подтверждение формы
async function handlerConfirmForm(): Promise<void> {
    isLoadingConfirmData.value = true;
    try {
        if(validationForm()) {
            const { data: { user }, meta }: LogUpInputData = await logUpApi({ 
                login: formData.value.login!, 
                password: formData.value.password!, 
                name: capitalizeText(formData.value.name!),
            });
            router.push({ name: 'login' }).then(() => window.location.reload());
        }
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось создать аккаунт', life: 3000 });
        console.error('/src/views/LoginViews/LogupView.vue: handlerConfirmForm => ', err);
        throw err;
    } finally {
        isLoadingConfirmData.value = false;
    }
}


function handlerOpenLogin() {
    gsap.to('#logup-container', { duration: .2, delay: 0, transform: 'translateY(-100%)' }).then(() => {
        router.push({ name: 'login' });
    });
}

onMounted(async () => {
    gsap.to('#logup-container', { duration: .2, delay: 0.3, transform: 'translateY(0%)' })
});
</script>

<style scoped>
.form-title {
    font-size: 2.4rem;
    color: var(--basic-color-fg);
}
#logup-container {
    transform: translateY(-100%);
}
.input-icon-eye {
    cursor: pointer;
}
</style>