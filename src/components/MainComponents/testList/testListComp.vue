<template>
    <div class="h-max">
        <testItemComp 
        v-for="test in props.testList" 
        :test-data="test"
        :key="test.id"
        @click="() => handlerOpenTest(test)"
        />
    </div>
</template>

<script setup lang="ts">
import type { Test } from '@/types/testTypes';
import testItemComp from './testItemComp.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    testList: Test[];
}>();

const emit = defineEmits({
    openTest: (test: Test) => true,
});

function handlerOpenTest(test: Test) {
    try {
        emit('openTest', test);
    } catch (err) {
        console.error('/src/components/MainComponents/testList/testListComp.vue: handlerOpenTest => ', err);
        throw err;
    }
}

</script>

<style scoped>

</style>