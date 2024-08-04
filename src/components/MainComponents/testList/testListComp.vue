<template>
    <div class="h-max">
        <testItemComp 
        :test-data="test"
        v-for="test in props.testList" 
        :key="test.id"/>
    </div>
</template>

<script setup lang="ts">
import type { Test } from '@/types/testTypes';
import testItemComp from './testItemComp.vue';
import { defineProps } from 'vue';

const props = defineProps<{
    testList: Test[];
}>()

</script>

<style scoped>

</style>