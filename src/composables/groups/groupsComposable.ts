import type { GroupTest } from "@/types/testTypes";
import { hasSpecSymbols } from "@/utils/validation";
import { createNewGroup } from '@/api/groupsApi';
import { useMainStore } from "@/stores/mainStore";
import { ref } from "vue";
import { useRouter } from "vue-router";


// Необходим для работы GroupsView.vue страницы отрисовки групп
export default function useGroupsView() {

// #########################################   COMPOSABLES   #########################################
    const router = useRouter();
    const store = useMainStore();
    
// #########################################   DATA   #########################################
    const isInvalidTitleInp = ref(false);
    const errorMsgInp = ref('');
    const isLoadingCreationGroup = ref(false);
    const isLoadingData = ref(false);
    const isShowCreateGroup = ref(false);
    const titleGroup = ref('');
    

// #########################################   METHODS   #########################################
    // Сброс ошибок
    function clearErrors() {
        try {
            errorMsgInp.value = '';
            isInvalidTitleInp.value = false;
        } catch (err) {
            console.error('@/composables/groups/groupsComposable.ts: clearErrors => ', err);
            throw err;
        }
    }
    
    // Функция валидации формы создания новой группы
    function validationForm(): boolean {
        try {
            let isValid = true;
            if(hasSpecSymbols(titleGroup.value, '@_-. ')) {
                isInvalidTitleInp.value = true;
                isValid = false;
                errorMsgInp.value = `Не допустимы спецсимволы`;
            }
            if(titleGroup.value.length < 3) {
                isInvalidTitleInp.value = true;
                isValid = false;
                errorMsgInp.value = 'Поле не может содержать мменее 3 символов';
            }
            if(!titleGroup.value) {
                isInvalidTitleInp.value = true;
                isValid = false;
                errorMsgInp.value = 'Обязательное поле';
            }
            return isValid;
        } catch (err) {
            console.error('@/composables/groups/groupsComposable.ts: validationForm => ', err);
            throw err;
        }
    }
    
    // Обработчик создания новой группы
    async function handlerCreateGroup () {
        try {
            isLoadingCreationGroup.value = true;
            if(validationForm()) {
                const { data, meta } = await createNewGroup(titleGroup.value); 
                store.groups.push(data.group);
                titleGroup.value = '';
                isShowCreateGroup.value = false;
            }
        } catch (err) {
            console.error('@/composables/groups/groupsComposable.ts: handlerCreateGroup => ', err);
            throw err;
        } finally {
            isLoadingCreationGroup.value = false;
        }
    }
    
    // Обработчик открытия группы (переход на новую страницу)
    function handlerOpenGroup(group: GroupTest) {
        try {
            router.push({ name: 'groupTests', params: { groupId: group.id } });
            store.opennedGroup = group;
        } catch (err) {
            console.error('@/composables/groups/groupsComposable.ts: handlerOpenGroup => ', err);
            throw err;
        }
    }

    return {
        // Composable
        store,
        // Data
        isInvalidTitleInp,
        errorMsgInp,
        isLoadingCreationGroup,
        isShowCreateGroup,
        titleGroup,
        // Methods
        clearErrors,
        handlerCreateGroup,
        handlerOpenGroup,
    }
}