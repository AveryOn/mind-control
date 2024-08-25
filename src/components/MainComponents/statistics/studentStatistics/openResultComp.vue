<template>
    <div class="statistic-block w-full h-max flex flex-column align-items-center py-3 mt-3">

        <!-- Спиннер загрузки -->
        <ProgressSpinner 
        v-if="props.isLoadingData" 
        style="width: 40px; height: 40px" 
        strokeWidth="4" 
        fill="transparent"
        animationDuration=".5s" 
        aria-label="Custom ProgressSpinner" 
        />

        <!-- СОДЕРЖИМОЕ  -->
        <div v-else class="w-full">
            <!-- Заголовок -->
            <div 
            class="result-header w-full flex align-items-center justify-content-center mb-3 px-2"
            :class="computeClasses"
            >
                <h2 class="font-light mr-auto" style="font-size: 1.3rem;">Результат по тесту -<span class="font-normal font-italic ml-1">{{ store.openResultStudent?.test.title }}</span></h2>
                <span class="light-text mr-4">{{ `( ${fromNow(store.openResultStudent?.createdAt)} )` }}</span>
                <span>{{ formattedDateByTemplate(store.openResultStudent?.createdAt) }}</span>
            </div>
    
            <!-- Информационная панель о результате -->
            <div class="info-panel w-full flex align-items-center justify-content-center gap-3 pb-3">
    
                <!-- Инфо о Дате проверки -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Проверено'">
                    <i class="pi pi-calendar-times" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{  formattedDateByTemplate(store.openResultStudent?.checkDate)  }}</span>
                </span>
    
                <!-- Инфо о Времени выполнения теста -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Время выполнения'">
                    <i class="pi pi-clock" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{ `${computeMinutesByMs(store.openResultStudent?.duration ?? 0)} мин.` }}</span>
                </span>
    
                <!-- Инфо о кол-ве верных ответов -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Верных ответов'">
                    <i class="pi pi-list-check" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{ `${store.openResultStudent?.successCount} / ${store.openResultStudent?.questionsCount}` }}</span>
                </span>
    
                <!-- Инфо о названии группы -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Группа'">
                    <i class="pi pi-bookmark" style="font-size: 1.7rem;"></i>
                    <span class="w-full font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {{ store.openResultStudent?.test.group.title }}
                    </span>
                </span>
            </div>

            <!-- Список вопросов и ответов -->
            <div class="w-full flex flex-column align-items-center gap-3 mt-3">
                <div 
                class="question-item px-3 py-2 flex flex-column" 
                :class="(computeStateAnswer(question.id).answer?.isCorrect)? 'success' : 'failed'"
                v-for="question in store.openResultStudent?.questions" 
                :key="question.id"
                >
                    <Badge class="no" :value="question.number" size="small"></Badge>

                    <!-- Текст Вопроса -->
                    <span class="ml-3 mb-1" style="font-size: 1rem">{{ question.question }}</span>

                    <!-- Подпись о количестве возможных вариантов ответа для данного вопроса -->
                    <span v-if="question.type !== 'text'" class="light-text ml-auto mx-auto mb-2">{{ `( ${computeSignTypeAnswer(question.type)} )` }}</span>

                    <!-- Checkbox Варианты ответа -->
                    <span 
                    class="checkbox-variant"
                    v-if="question.type === 'checkbox'" 
                    v-for="variant in question.checkboxAnswers"
                    >{{ variant.answer }}</span>

                    <!-- Radio Варианты ответа -->
                    <span 
                    class="checkbox-variant"
                    v-if="question.type === 'radio'" 
                    v-for="variant in question.radioAnswers"
                    >{{ variant.answer }}</span>

                    <!-- Ответ на вопрос -->
                    <div class="w-full flex flex-column mt-2 mx-3">
                        <span class="light-text mb-2">Ваш ответ:</span>

                        <!-- Checkbox ОТВЕТ -->
                        <div class="flex gap-1 flex-wrap" v-if="question.type === 'checkbox'" >
                            <Tag 
                            class="text-xs"
                            v-for="answer in JSON.parse(computeStateAnswer(question.id).answer?.answer!)"
                            :key="answer"
                            :value="answer"
                            ></Tag>
                        </div>

                        <!-- Обычный ОТВЕТ -->
                        <span v-else class="answer-text w-11 px-3">
                            {{ computeStateAnswer(question.id).answer?.answer }}
                        </span>
                    </div>

                    <!-- Значение ВЕРНО / НЕВЕРНО -->
                    <span 
                    class="state-question mx-auto w-full text-center"
                    :class="(computeStateAnswer(question.id).answer?.isCorrect)? 'success' : 'failed'"
                    >
                        {{ computeStateAnswer(question.id).isCorrect? 'Верно' : 'Не верно' }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { QuestionTypes } from '@/types/testTypes';
import { computeMinutesByMs, formattedDateByTemplate, fromNow } from '@/utils/timeUtils';
import { computed, defineProps } from 'vue';

const store = useMainStore();
const props = defineProps<{
    isLoadingData: boolean;
}>();

// Вычисление класса состояния результат (success | failed)
const computeClasses = computed(() => {
    try {
        const classList = { success: false, failed: false };
        if(store.openResultStudent?.isSuccess === true) {
            classList.success = true;
        }
        else {
            classList.failed = true;
        }
        return classList;
    } catch (err) {
        console.error('/src/components/MainComponents/statistics/studentStatistics/openResultComp.vue: computed[computeClasses] => ', err);
        throw err;
    }

});

// Вычисление того верный ли ответ на вопрос или нет
const computeStateAnswer = computed(() => {
    return (questionId: number | undefined) => {
        try {
            if (questionId) {
                const findedAnswer = store.openResultStudent?.answers.find((answer) => {
                    if (answer.questionId === questionId) return true;
                });
                return  { isCorrect: findedAnswer?.isCorrect, answer: findedAnswer };
            } 
            else return { isCorrect: false, answer: null };
        } catch (err) {
            console.error('/src/components/MainComponents/statistics/studentStatistics/openResultComp.vue: computed[computeStateAnswer] => ', err);
            throw err;
        }
    }
});

// Вычислить тип ответа (несколько ответов или один ответ) зависит от типа вопроса
const computeSignTypeAnswer = computed(() => {
    return (type: QuestionTypes) => {
        try {
            if(type === 'checkbox') return 'Несколько вариантов ответа';
            else if(type === 'radio') return 'Один вариант ответа';
            else return '';
        } catch (err) {
            console.error('/src/components/MainComponents/statistics/studentStatistics/openResultComp.vue: computed[computeSignTypeAnswer] => ', err);
            throw err;
        }
    }
});

</script>

<style scoped>
.result-header {
    background-color: rgba(212, 212, 212, 0.383);
}   
.result-header.success {
    background-color: var(--result-item-hover-bg-success);
}
.result-header.failed {
    background-color: var(--result-item-hover-bg-failed);
}
.info-panel {
    border-bottom: 1px dotted var(--basic-border-color);
}
.info-chunk {
    min-width: 4.8rem;
    max-width: 6rem;
    padding: 0.5rem;
    background-color: rgb(205, 252, 232);
    color: rgb(73, 73, 73);
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    user-select: none;
}
.question-item {
    position: relative;
    width: 500px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 3px;
    font-size: 0.9rem;
}
.question-item.success {
    border-top: 4px solid var(--success-color);
}
.question-item.failed {
    border-top: 4px solid var(--required-color);
}
.no {
    position: absolute;
    left: 1px;
    top: 1px;
}
.checkbox-variant {
    width: max-content;
    padding: 0.05rem 0.5rem;
    background-color: rgba(212, 212, 212, 0.383);
    border-radius: 3px;
    margin-left: 1.3rem;
    user-select: none;
    cursor: default;
    border: 1px dotted var(--basic-border-color);
}
.checkbox-variant + .checkbox-variant {
    margin-top: 0.2rem;
}

.answer-text {
    background-color: rgba(211, 245, 255, 0.383);
    border-bottom: 2px solid var(--basic-border-color);
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    text-wrap: pretty;

}

.state-question {
    border-radius: 4px;
    margin-top: 1rem;
    user-select: none;
    cursor: default;
}
.state-question.success {
    background-color: var(--result-item-hover-bg-success);
}
.state-question.failed {
    background-color: var(--result-item-hover-bg-failed);
}
</style>