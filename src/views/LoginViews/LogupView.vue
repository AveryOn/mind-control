<template>
    <div id="logup-container" class="relative w-full h-full flex flex-column align-items-center justify-content-center">
        <h1 class="form-title mb-5">
            Создать аккаунт
            <i class="pi pi-user-plus ml-1" style="font-size: 1.6rem; color: var(--basic-color-fg); font-weight: 900"></i>
        </h1>

        <form @submit.prevent class="w-5 flex flex-column align-items-center justify-content-center">
            <!-- Name -->
            <IconField class="w-full mb-4">
                <InputText class="input w-full" placeholder="Ваше имя" />
                <InputIcon class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
            </IconField>

            <!-- Login -->
            <IconField class="w-full mb-4">
                <InputText class="input w-full" placeholder="Логин" />
                <InputIcon class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
            </IconField>

            <!-- Password -->
            <IconField class="w-full mb-4">
                <InputText class="input w-full" placeholder="Придумайте пароль" :type="isShowPassword? 'password' : 'text'" v-model="formData.password"/>
                <InputIcon v-if="!formData.password" class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
                <InputIcon v-else @click="isShowPassword = !isShowPassword" class="input-icon-eye" :class="(isShowPassword)? 'pi pi-eye-slash' : 'pi pi-eye'"/>
            </IconField>

            <!-- Repeat Password -->
            <IconField class="w-full mb-4">
                <InputText class="input w-full" placeholder="Повторите пароль" :type="isShowPassword? 'password' : 'text'" v-model="repeatPassword"/>
                <InputIcon v-if="!repeatPassword" class="pi pi-asterisk" style="color: var(--required-color); font-size: small" v-tooltip.bottom="'Обязательное поле'"/>
                <InputIcon v-else @click="isShowPassword = !isShowPassword" class="input-icon-eye" :class="(isShowPassword)? 'pi pi-eye-slash' : 'pi pi-eye'"/>
            </IconField>

            <Button class="ml-auto" icon="pi pi-send" text raised />
            <p class="mt-3 mr-auto">Уже есть учетная запись? <a class="link ml-2" @click="handlerOpenLogin">Войти!</a></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { onMounted, ref, type Ref } from 'vue';

const router = useRouter();

const isShowPassword = ref(false);

const formData = ref({
    name: null as null | string,
    login: null as null | string,
    password: null as null | string,
});
const repeatPassword: Ref<null | string> = ref(null);

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