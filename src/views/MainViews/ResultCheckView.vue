<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            Тесты <span class="nest-piece">></span> 
            Проверка <span class="nest-piece">></span> 
            {{ store.openResultForCheck?.test.title }} <span class="nest-piece">></span> 
            Ученики <span class="nest-piece">></span> 
            {{ store.openResultForCheck?.student.name }}
        </h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 pb-4 pt-3">
            <div class="relative h-full overflow-auto flex flex-column align-items-center py-6">
                <questionItemByResultComp 
                v-for="(question, index) in store.openResultForCheck?.questions" 
                @update-result-item="(updatedAnswer: Answer) => handlerUpdateAnswer(updatedAnswer)"
                :key="question.id"
                :answer-data="store.openResultForCheck?.answers[index]!"
                :question-data="question"
                :draft-item-data="determineDraftItem(store.openResultForCheck?.answers[index]!.id!)"
                />
                
                <div class="mt-5 mb-2" style="width: 600px;">
                    <h3 class="light-text mb-2 ml-2">Обязательная оценка результата</h3>
                    <Select 
                    class="w-full shadow-3"
                    v-model="isSuccessTest" 
                    :options="testResults" 
                    option-label="label" 
                    option-value="value" 
                    placeholder="Оценка результата" 
                    />
                </div>

                <!-- ACTIONS -->
                <div class="mt-5 flex" style="width: 600px;">
                        <Dialog v-model:visible="isShowConfirmDialog" modal :header="'Вы уверены, что хотите завершить проверку теста?'" :style="{ width: '38rem' }">
                            <div class="flex justify-content-end gap-2 pr-2">
                                <Button type="button" label="Отмена" severity="secondary" text raised @click="isShowConfirmDialog = false"></Button>
                                <Button type="button" label="Да" text raised @click="handlerConfirmCheckingTest"></Button>
                            </div>
                        </Dialog>
                        <Button
                        class="w-full"
                        label="Завершить проверку" 
                        text 
                        raised 
                        icon="pi pi-upload"
                        icon-pos="right"
                        :loading="isLoadingConfirmChecking"
                        :disabled="draftResultCheck.length < store.openResultForCheck?.questions.length! || isSuccessTest === null"
                        @click="isShowConfirmDialog = true"
                        />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { checkResultTchr, getResultByIdTchr } from '@/api/resultsApi';
import questionItemByResultComp from '@/components/MainComponents/resultsCheck/questionItemByResultComp.vue';
import { useMainStore } from '@/stores/mainStore';
import type { Answer } from '@/types/testTypes';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useMainStore();
const route = useRoute();
const router = useRouter();

const isSuccessTest = ref(null);
const testResults = ref([{ label: 'Тест пройден', value: true }, { label: 'Тест не пройден', value: false }]);
const isLoadingConfirmChecking: Ref<boolean> = ref<boolean>(false);
const isShowConfirmDialog = ref(false);
const draftResultCheck: Ref<LocalAnswer[]> = ref([])
const keyStorageDraft = ref('');
type LocalAnswer = { id: number; questionId: number; isCorrect: boolean; };

function determineDraftItem(answerId: number) {
    try {
        if(answerId) {
            return draftResultCheck.value.find((item) => item.id === answerId);
        } 
        return null;
    } catch (err) {
        console.error('/src/views/MainViews/ResultCheckView.vue: determineDraftItem => ', err);
        throw err;
    }
}

async function handlerConfirmCheckingTest() {
    isLoadingConfirmChecking.value = true;
    try {
        if(typeof isSuccessTest.value === 'boolean') {
            const { data, meta } = await checkResultTchr({
                check_date:  (new Date()).toISOString(),
                is_success: isSuccessTest.value,
                result_answers: draftResultCheck.value,
                result_id: +route.params.resultId,
                test_id: +route.params.testId, 
            });
            localStorage.removeItem(keyStorageDraft.value);
            router.push({ name: 'tests' }).then(() => window.location.reload());
        }
    } catch (err) {
        console.error('/src/views/MainViews/ResultCheckView.vue: handlerConfirmCheckingTest => ', err);
        throw err;
    } finally {
        isLoadingConfirmChecking.value = false;
        isShowConfirmDialog.value = false;
        // router.push({ name: 'opennedTest', params: { testId: store.openResultForCheck?.testId } });
    }
}

function getDraftResultTestCheck(): LocalAnswer[] {
    try {
        let rawData = localStorage.getItem(keyStorageDraft.value);
        if(!rawData) {
            localStorage.setItem(keyStorageDraft.value, JSON.stringify([]));
            return [];
        } else {
            return JSON.parse(rawData) as LocalAnswer[];
        }
    } catch (err) {
        console.error('/src/views/MainViews/ResultCheckView.vue: getDraftResultTestCheck => ', err);
        throw err;
    }
}

function updateDraftArray({ id, questionId, isCorrect }: Answer, draftArray: LocalAnswer[]): LocalAnswer[] {
    try {
        if(!draftArray.length) {
            console.log('!draftArray.length');
            draftArray.push({ id, questionId, isCorrect });
            return draftArray;
        } 
        else {
            let isFinded: boolean = false;
            const updatedDraft = draftArray.map((item) => {
                if(item.id === id) {
                    isFinded = true;
                    return { id, questionId, isCorrect };
                }
                return item;
            });
            console.log(isFinded, updatedDraft);
            if(isFinded) return updatedDraft;
            else{
                updatedDraft.push({ id, questionId, isCorrect });
                return updatedDraft;
            }
        }
    } catch (err) {
        console.error('/src/views/MainViews/ResultCheckView.vue: updateDraftArray => ', err);
        throw err;
    }
}
function handlerUpdateAnswer(updatedAnswer: Answer) {
    try {
        let result = getDraftResultTestCheck();
        draftResultCheck.value = updateDraftArray(updatedAnswer, result);
        localStorage.setItem(keyStorageDraft.value, JSON.stringify(draftResultCheck.value));
    } catch (err) {
        console.error('/src/views/MainViews/ResultCheckView.vue: handlerUpdateAnswer => ', err);
        throw err;
    }
}

onMounted(async () => {
    try {
        // Поулчение результата
        const { data: { result }, meta } = await getResultByIdTchr({ testId: +route.params.testId, resultId: +route.params.resultId })
        store.openResultForCheck = result;
        keyStorageDraft.value = `draft_result_${store.openResultForCheck?.id}_test_${store.openResultForCheck?.testId}_check`;
    } catch (err) {
        throw err;
    }
    draftResultCheck.value = getDraftResultTestCheck();
});

</script>

<style scoped>

</style>