<template>
    <div class="relative w-full h-full overflow-hidden">
        <div class="main-container">
            <topbarComp />
            <main class="main-content h-full mb-2 shadow-3 border-round-lg">
                <div class="mc-block-light mb-8 h-full flex border-round-lg shadow-3">
                    <!-- LEFT SIDE -->
                    <navPanelComp />

                    <!-- RIGHT SIDE (ROUTER) -->
                    <main class="w-full h-full flex items-center justify-center">
                        <RouterView />
                    </main>
                </div>
            </main>
        </div>
        <img class="main-img-bg" src="@/assets/main-bg.jpg" alt="Main Image Background">
    </div>
</template>

<script setup lang="ts">
import topbarComp from '@/components/MainComponents/topbarComp.vue';
import navPanelComp from '@/components/MainComponents/navPanelComp.vue';


</script>

<style scoped>
.main-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff2c;
    backdrop-filter: blur(4px);
}
.main-content {
    width: 98%;
    overflow: hidden;
    margin-top: 0.8rem;
}
.main-img-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

</style>