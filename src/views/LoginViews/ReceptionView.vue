<template>
    <div class="relative flex align-items-center h-full overflow-hidden">
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

</script>

<style scoped>
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