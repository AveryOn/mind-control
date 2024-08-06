<template>
    <span v-if="isLoadingData" class="stub-loading-app fixed right-0 bottom-0 left-0 top-0 flex align-items-center justify-content-center">
        <i class="loading-icon pi pi-hourglass" style="font-size: 5rem"></i>
    </span>
    <div v-else class="relative flex align-items-center h-full overflow-hidden">
        <div class="relative w-full h-full overflow-hidden">
            <header class="reception-header absolute border-round-sm px-3 py-2">
                <h1 class="header-title">
                    Welcome to Mind Control!
                </h1>
                
            </header>
            <img class="reception-img-bg" src="@/assets/reception_bg.jpg" alt="Reception Image Background">
        </div>
        <div class="reception-right-panel-rotate shadow-4 border-round-sm flex align-items-center justify-content-center">
        </div>
        <div class="reception-right-panel-content flex flex-column align-items-center justify-content-center">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isLoadingData = ref(false);

onMounted(() => {
    isLoadingData.value = true;
    setTimeout(() => {
        isLoadingData.value = false;
    }, 0);
})

</script>

<style scoped>
.stub-loading-app {
    background-color: white;
    z-index: 99999999;
}
.loading-icon {
    animation: blink 3s infinite;
    color:rgb(199, 199, 163);
}
@keyframes blink {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.reception-header {
    top: 5%;
    left: 5%;
    background-color: #06060625;
    backdrop-filter: blur(5px);
}
.header-title {
    font-weight: 700;
    font-size: 2.8rem;
    color: rgba(175, 255, 219, 0.763);

    font-family: var(--font);
}
.reception-img-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}
.reception-right-panel-rotate {
    width: 45%;
    height: 120%;
    right: -2%;
    top: -5%;
    position: absolute;
    transform: rotate(5deg);
    z-index: 3;
    color: var(--basic-fg);
    background-color: var(--basic-bg);
    /* background-color: rgba(255, 255, 255, 0.7); */
    backdrop-filter: blur(10px);
}
.reception-right-panel-content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 45%;
    z-index: 5;
}
</style>