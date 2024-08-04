<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 py-4">
            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <welcomeTestListComp v-if="false"/>

            <!-- СПИСОК ТЕСТОВ -->
            <testListComp :test-list="testList"/> 
        </section>

    </div>
</template>

<script setup lang="ts">
import welcomeTestListComp from '@/components/MainComponents/testList/welcomeTestListComp.vue';
import testListComp from '@/components/MainComponents/testList/testListComp.vue';
import { ref, type Ref } from 'vue';
import type { Test } from '@/types/testTypes';

const testList: Ref<Test[]> = ref<Test[]>([
    { 
        id: 1,
        title: 'Tested Test',
        summary: 'Something Tested Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },
    { 
        id: 2,
        title: 'Second Test',
        summary: 'Something Second Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },
    { 
        id: 3,
        title: 'Third Test',
        summary: 'Something Third Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },

]);

</script>

<style scoped>
    
</style>