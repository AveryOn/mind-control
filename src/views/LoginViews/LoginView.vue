<template>
    <div id="login-container" class="login-container relative w-full h-full flex flex-column align-items-center justify-content-center">
        <h1 class="form-title mb-4">
            Войти
            <i class="pi pi-sign-in ml-1" style="font-size: 1.3rem; color: var(--basic-color-fg); font-weight: 900"></i>
        </h1>

        <form @submit.prevent class="w-5 flex flex-column align-items-center justify-content-center">
            <!-- Login -->
            <InputGroup class="mb-4 shadow-2">
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText placeholder="Логин" />
            </InputGroup>

            <!-- Password -->
            <InputGroup class="mb-3 shadow-2">
                <InputGroupAddon>
                    <i class="pi pi-key"></i>
                </InputGroupAddon>
                <InputText placeholder="Пароль" />
            </InputGroup>
            <Button class="ml-auto" icon="pi pi-send" text raised />
            <p class="mt-3 mr-auto">Нет учетной записи? <a class="link ml-2" @click="handlerOpenLogup">Создай её!</a></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { onMounted } from 'vue';

const router = useRouter();

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