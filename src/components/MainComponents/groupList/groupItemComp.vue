<template>
    <div class="group-item flex flex-column align-items-center py-3">
        <h1 class="text-center px-2">{{ props.groupData.title }}</h1>
    </div>
</template>

<script setup lang="ts">
import type { GroupTest } from '@/types/testTypes';
import { defineProps } from 'vue';

const props = defineProps<{
    groupData: GroupTest;
}>();

</script>

<style scoped>
.group-item {
    width: 180px;
    height: 200px;
    background-color: var(--group-item-bg);
    box-shadow: var(--shadow);
    border-radius: 5px;
    transition: all 0.7s ease;
    cursor: pointer;
    border-top: 5px solid var(--basic-color-fg);
}
.group-item:hover {
    transition: all 0.7s ease;
    background-color: var(--group-item-hover-bg);
}
.group-item h1 {
    font-weight: normal;
    font-size: 1.4rem;
}
</style>