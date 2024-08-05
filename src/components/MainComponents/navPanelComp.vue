<template>
    <aside class="nav-panel w-max h-full py-1 flex flex-column align-items-center">
        <ul classs="menu w-full">

            <!-- СТАТИСТИКА -->
            <li 
            class="menu-item" 
            @click="router.push({ name: 'statistics' })" 
            v-tooltip.right="'Статистика'"
            :class="(route.name === 'statistics')? 'selected' : ''"
            >
                <i class="pi pi-chart-bar menu-item-icon"></i>
                <span class="menu-item-label" v-show="expandMenu">Статистика</span>
            </li>

            <!-- ГРУППЫ -->
            <li 
            class="menu-item" 
            @click="router.push({ name: 'groups' })" 
            v-tooltip.right="'Группы'"
            :class="(route.name === 'groups')? 'selected' : ''"
            >
                <i class="pi pi-bookmark menu-item-icon"></i>
                <span class="menu-item-label" v-show="expandMenu">Группы</span>
            </li>

            <!-- ТЕСТЫ -->
            <li 
            class="menu-item" 
            @click="router.push({ name: 'tests' })" 
            v-tooltip.right="'Тесты'"
            :class="(route.name === 'tests')? 'selected' : ''"
            >
                <i class="pi pi-list menu-item-icon"></i>
                <span class="menu-item-label" v-show="expandMenu">Тесты</span>
            </li>

            <!-- УЧЕНИКИ -->
            <li 
            class="menu-item" 
            @click="router.push({ name: 'students' })" 
            v-tooltip.right="'Ученики'"
            :class="(route.name === 'students')? 'selected' : ''"
            >
                <i class="pi pi-users menu-item-icon"></i>
                <span class="menu-item-label" v-show="expandMenu">Ученики</span>
            </li>

        </ul>
        <Button 
        class="mt-auto ml-auto mr-2 mb-2" 
        :icon="expandMenu? 'pi pi-slack' : 'pi pi-expand'"
        @click="toggleMenuExpanded"
        text 
        raised 
        aria-label="Save" 
        />
    </aside>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import gsap from 'gsap';

const route = useRoute();
const router = useRouter();

const expandMenu = ref(false);


function toggleMenuExpanded(): void {
    // При скрытии
    if(expandMenu.value === true) {
        gsap.to('.menu-item-label', { duration: .2, marginLeft: '0rem', width: '0', opacity: '0' })
            .then(() => expandMenu.value = false);
    }
    // При разворачивании
    else if(expandMenu.value === false) {
        expandMenu.value = true
        gsap.to('.menu-item-label', { duration: .15, marginLeft: '0.6rem', width: 'auto', opacity: '1' })
    }
}

</script>

<style scoped>
.nav-panel {
    border-right: 1px solid var(--basic-border-color);
}
.menu-item {
    display: flex;
    align-items: center;
    height: max-content;
    background-color: var(--nav-item-bg);
    color: var(--nav-item-fg);
    padding: .5rem .8rem;
    margin: 0 .3rem;
    margin-bottom: 0.2rem;
    border-radius: 5px;
    transition: all .3s ease;
    cursor: pointer;
    overflow: hidden;
}
.menu-item:hover {
    background-color: var(--nav-item-hover-bg);
    transition: all .3s ease;
}
.menu-item.selected {
    background-color: var(--nav-item-hover-bg);
}
.menu-item-icon {
    font-size: 1.3rem;
}
.menu-item-label {
    width: 0;
    font-size: 1.14rem;
    margin-left: 0rem; /* 0.6rem; */
    opacity: 0;
    word-break: break-all;
    white-space: nowrap;
}
</style>