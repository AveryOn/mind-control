<template>
    <div 
    class="w-full h-full overflow-auto flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты <span class="nest-piece">></span> Новый тест</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="relative h-full w-full overflow-auto flexflex-column align-items-center">

            <!-- TIME LINE -->
            <div 
            class="absolute top-0 right-0 left-0 w-10 mx-auto overflow-hidden flex align-items-center" 
            style="height: 12%;"
            >
                <Timeline :value="steps" layout="horizontal" class="px-4 w-full">
                    <template #marker="slotProps">
                        <span 
                        class="timeline-event flex h-8 mx-1" 
                        :class="computeStylesTimelineEvent(slotProps.item)"
                        @click="() => updateStep(slotProps.item?.id)"
                        >
                            <i class="pi pi-step-forward-alt"></i>
                        </span>
                    </template>
                    <template></template>
                    <template #content="slotProps">
                        <span class="timeline-signature" @click="() => updateStep(slotProps.item?.id)" :class="computeStylesTimelineEvent(slotProps.item)">
                            {{ slotProps.item.step }}
                        </span>
                    </template>
                </Timeline>
            </div>

            <!-- BODY -->
            <div 
            class="absolute bottom-0 right-0 left-0 overflow-auto w-full flex flex-column align-items-center justify-content-center px-4" 
            style="height: 88%;">
                <Carousel
                class="h-hull w-full m-auto overflow-auto flex flex-column justify-content-center"
                :value="forms" 
                :numVisible="1" 
                :numScroll="1" 
                :page="currentStep-1" 
                @update:page="(page) => updateStep(page+1)"
                >
                <template #item="slotProps">
                    <nameTestForm 
                    v-if="slotProps.index === 0" 
                    @update-test-name="(value) => handlerUpdateTestName(value)"
                    @next-step="updateStep(currentStep+1)"
                    :initial-test-name="initialData?.title"
                    />
                    <summaryTestForm 
                    v-if="slotProps.index === 1"
                    @update-test-summary="(value) => handlerUpdateTestSummary(value)"
                    @next-step="updateStep(currentStep+1)"
                    :initial-test-summary="initialData?.summary"
                    />
                    <groupTestForm 
                    v-if="slotProps.index === 2"
                    @update-test-group="(group) => handlerUpdateTestGroup(group)"
                    @next-step="updateStep(currentStep+1)"
                    :initial-test-group="initialData?.group"
                    />
                    <participantsTestForm 
                    v-if="slotProps.index === 3"
                    @update-test-participants="(participants) => handlerUpdateTestParticipants(participants)"
                    @next-step="updateStep(currentStep+1)"
                    :initial-test-participants="initialData?.participants"
                    />
                    <questionsTestForm 
                    v-if="slotProps.index === 4" 
                    @append-question="handlerAppendQuestion"
                    @update-question="(data: Question) => handlerUpdateQuestion(data)"
                    @confirm-creation-test="handlerConfirmCreateTest"
                    :questions="questions"
                    :is-loading-create="isLoadingCreate"
                    />
                </template>
            </Carousel>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef, type Ref, onMounted } from "vue";
import nameTestForm from "@/components/MainComponents/createTest/nameTestForm.vue";
import summaryTestForm from "@/components/MainComponents/createTest/summaryTestForm.vue";
import groupTestForm from "@/components/MainComponents/createTest/groupTestForm.vue";
import participantsTestForm from "@/components/MainComponents/createTest/participantsTestForm.vue";
import questionsTestForm from "@/components/MainComponents/createTest/questionsTestForm.vue";
import { type GroupTest, type GroupTestInput, type Participant, type ParticipantInput, type Question, type Test, type TestCreate } from "@/types/testTypes";

const currentStep = ref(1);
const questions: Ref<Question[]> = ref([]);
const steps = ref([
    { id: 1, step: 'Название', isComplete: false, isError: false },
    { id: 2, step: 'Описание', isComplete: false, isError: false },
    { id: 3, step: 'Группа', isComplete: false, isError: false },
    { id: 4, step: 'Участники', isComplete: false, isError: false },
    { id: 5, step: 'Вопросы', isComplete: false, isError: false },
]);
const forms = ref([
    { id: 1, label: 'title' },
    { id: 2, label: 'summary' },
    { id: 3, label: 'group' },
    { id: 4, label: 'participants' },
    { id: 5, label: 'questions' },
]);
const initialData: Ref<TestCreate | null> = ref(null);
const isLoadingCreate = ref<boolean>(false);


type TimelineEvent = { id: number, step: string | number, isComplete: boolean, isError: boolean };
type StylesTimelineEvent = { complete: boolean, current: boolean, error: boolean };

const computeStylesTimelineEvent: ComputedRef<(event: TimelineEvent) => StylesTimelineEvent> = computed(() => {
    return (event: TimelineEvent) => {
        const readyClassList: StylesTimelineEvent = { complete: false, current: false, error: false };
        if(event.id === currentStep.value) readyClassList.current = true;
        if(event.isComplete === true) readyClassList.complete = true;
        if(event.isError === true) readyClassList.error = true;
        return readyClassList;
    }
});

function updateStep(stepId: number) {
    setTimeout(() => {
        currentStep.value = stepId;
        updateStepState();
    }, 150)
}

function handlerConfirmCreateTest() {
    try {
        isLoadingCreate.value = true;
        let isError = false;
        if(!initialData) return;
        if(!initialData.value?.title) {
            steps.value[0].isError = true;
            isError = true;
        }
        if(!initialData.value?.group) {
            steps.value[2].isError = true;
            isError = true;
        }
        if(!questions.value.length) {
            steps.value[4].isError = true;
            isError = true;
        }
        if(isError === true) return;
        
        // ВЫПОЛНЯЕТСЯ ЗАПРОС

    } catch (err) {
        console.error('views/MainViews/CreateTestView: handlerConfirmCreateTest => ', err);
        throw err;
    } finally {
        isLoadingCreate.value = false;
    }
}

function handlerAppendQuestion(newQuestion: Question) {
    questions.value.push(newQuestion);
    updateDraftNewTestLS(undefined, undefined, undefined, undefined, questions.value);
}

function handlerUpdateTestName(testName: string) {
    try {
        updateDraftNewTestLS(undefined, testName.trim());
    } catch (err) {
        console.error('views/MainViews/CreateTestView: handlerUpdateTestName => ', err);
        throw err;
    }
}

function handlerUpdateTestSummary(testSummary: string) {
    try {
        updateDraftNewTestLS(testSummary.trim());
    } catch (err) {
        console.error('views/MainViews/CreateTestView: handlerUpdateTestSummary => ', err);
        throw err;
    }
}

function handlerUpdateTestGroup(group: GroupTestInput | GroupTest) {
    try {
        updateDraftNewTestLS(undefined, undefined, group);
    } catch (err) {
        console.error('views/MainViews/CreateTestView: handlerUpdateTestGroup => ', err);
        throw err;
    }
}

function handlerUpdateTestParticipants(participants: ParticipantInput[] | Participant[]) {
    try {
        updateDraftNewTestLS(undefined, undefined, undefined, participants);
    } catch (err) {
        console.error('views/MainViews/CreateTestView: handlerUpdateTestParticipants => ', err);
        throw err;
    }
}

function handlerUpdateQuestion(data: Question) {
    // questions.value.forEach((question) => {
    //     if(question.number === data.number) {
            // question.question = data.question;
            // question.radioAnswers = data.radioAnswers;
            // question.checkboxAnswers = data.checkboxAnswers;
            // question.type = data.type;
    //     }
    // });
    questions.value[data.number-1].question = data.question;
    questions.value[data.number-1].radioAnswers = data.radioAnswers;
    questions.value[data.number-1].checkboxAnswers = data.checkboxAnswers;
    questions.value[data.number-1].type = data.type;
    updateDraftNewTestLS(undefined, undefined, undefined, undefined, questions.value);
}

function createDraftNewTestLS(): TestCreate {
    try {
        let draftNewTest = localStorage.getItem('draft_new_test');
        if(!draftNewTest) {
            let newTestData: TestCreate = {
                title: null,
                summary: null,
                group: null,
                participants: [],
                questions: [],
            }
            localStorage.setItem('draft_new_test', JSON.stringify(newTestData));
            return newTestData;
        }
        return JSON.parse(draftNewTest) as TestCreate;
    } catch (err) {
        console.error('views/MainViews/CreateTestView: createDraftNewTestLS => ', err);
        throw err;
    }
}

function updateDraftNewTestLS(
    summary?: string | null, 
    title?: string | null, 
    group?: GroupTestInput | null, 
    participants?: ParticipantInput[] | [],
    questions?: Question[] | []
): TestCreate {
    try {
        const testDataDraft = createDraftNewTestLS();
        if(summary !== undefined) {
            testDataDraft.summary = summary;
            steps.value[1].isError = false;
        }
        if(title !== undefined) {
            testDataDraft.title = title;
            steps.value[0].isError = false;
        }
        if(group !== undefined) {
            testDataDraft.group = group;
            steps.value[2].isError = false;
        }
        if(participants !== undefined) {
            testDataDraft.participants = participants;
            steps.value[3].isError = false;
        }
        if(questions !== undefined) {
            testDataDraft.questions = questions;
            steps.value[4].isError = false;
        }
        localStorage.setItem('draft_new_test', JSON.stringify(testDataDraft));
        initialData.value = testDataDraft;
        return testDataDraft;
    } catch (err) {
        console.error('views/MainViews/CreateTestView: createDraftNewTestLS => ', err);
        throw err;
    }
}

function initStepState(): number {
    try {
        const draftTestStep = localStorage.getItem('draft_test_step');
        if(!draftTestStep) {
            localStorage.setItem('draft_test_step', currentStep.value + '');
            return 1;
        }
        return +draftTestStep;
    } catch (err) {
        console.error('views/MainViews/CreateTestView: initStepState => ', err);
        throw err;
    }
}

function updateStepState(): number {
    try {
        localStorage.setItem('draft_test_step', currentStep.value + '');
        return currentStep.value;
    } catch (err) {
        console.error('views/MainViews/CreateTestView: updateStepState => ', err);
        throw err;
    }
}
onMounted(() => {
    currentStep.value = initStepState();
    try {
        const draftTestData = createDraftNewTestLS();
        initialData.value = draftTestData;
        if(initialData.value.questions) {
            questions.value = initialData.value.questions;
        }
    } catch (err) {
        console.error('views/MainViews/CreateTestView: mounted[createDraftNewTestLS] => ', err);
        throw err;
    }
});

</script>

<style scoped>
    
</style>