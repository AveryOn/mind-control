<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты</h1>

        <Select 
        class="w-15rem mt-2 ml-auto mr-5" 
        v-model="selectedGroup" 
        :options="store.groups" 
        optionLabel="title"
        placeholder="Выберите группу"
        @change="(event) => router.push({ name: 'groupTests', params: { groupId: event.value.id } })"
        />

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 pb-4 pt-3">
            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <welcomeTestListComp v-if="false"/>

            <!-- СПИСОК ТЕСТОВ -->
            <testListComp 
            @open-test="(test) => handlerOpenTest(test)"
            :test-list="store.tests"
            /> 
        </section>

    </div>
</template>

<script setup lang="ts">
import welcomeTestListComp from '@/components/MainComponents/testList/welcomeTestListComp.vue';
import testListComp from '@/components/MainComponents/testList/testListComp.vue';
import { watch, ref, type Ref, onMounted } from 'vue';
import type { GroupTest, Test } from '@/types/testTypes';
import { useMainStore } from '@/stores/mainStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useMainStore();
const selectedGroup = ref<GroupTest | null>(null);

watch(() => route.params.groupId, (newValue) => {
    console.log(+newValue);
});

function initSelectedGroup(groupId: string | string[] | undefined) {
    try {
        if(groupId) {
        store.groups.forEach((group) => {
            if(group.id === +groupId) {
                selectedGroup.value = group;
            }
        });
    }
    } catch (err) {
        console.error('views/MainViews/TestsView.vue: initSelectedGroup => ', err);
        throw err;
    }
}

function handlerOpenTest(test: Test) {
    try {
        store.opennedTest = test;
        router.push({ name: 'opennedTest', params: { testId: test.id } });
    } catch (err) {
        console.error('/src/views/MainViews/TestsView.vue: handlerOpenTest => ', err);
        throw err;
    }
}

onMounted(() => {
    initSelectedGroup(route.params.groupId);
})

</script>

<style scoped>
    
</style>