<template>
    <div class="relative w-full h-full overflow-hidden">
        <span v-if="isLoadingData" class="stub-loading-app fixed right-0 bottom-0 left-0 top-0 flex align-items-center justify-content-center">
            <i class="loading-icon pi pi-hourglass" style="font-size: 5rem"></i>
        </span>
        <div v-else class="main-container">
            <topbarComp />
            <main class="main-content h-full mb-2 shadow-3 border-round-lg">
                <div class="mc-block-light mb-8 h-full flex border-round-lg shadow-3">
                    <!-- LEFT SIDE -->
                    <navPanelComp />

                    <!-- RIGHT SIDE (ROUTER) -->
                    <main class="w-full h-full overflow-hidden flex items-center justify-center">
                        <RouterView />
                    </main>
                </div>
            </main>
        </div>
        <img class="main-img-bg" src="@/assets/main-bg.jpg" alt="Main Image Background">
    </div>
</template>

<script setup lang="ts">
import topbarComp from '@/components/MainComponents/topbarComp.vue';
import navPanelComp from '@/components/MainComponents/navPanelComp.vue';
import { onBeforeMount, ref } from 'vue';
import type { UserData } from '@/types/usersType';
import { getMeData, getUsers } from '@/api/usersApi';
import { getGroups } from '@/api/groupsApi';
import { type FetchedUserData } from '@/types/apiTypes';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';

const store = useMainStore();
const router = useRouter();
const isLoadingData = ref(false);


async function initUserData() {
    try {
        let userDataReady: UserData;
        // Изначальная попытка получить данные пользователя из localStorage
        let userDataStorage: any = localStorage.getItem('user_data');
        if(userDataStorage) {
            userDataReady = JSON.parse(userDataStorage);
            store.userData = userDataReady;
            
            store.appRole = userDataReady.role;
            store.isAuth = true;
        } 
        // Если в localStorage нет данных пользователя то идет получение их с сервера
        else {
            const { data: { user }, meta }: FetchedUserData = await getMeData();
            if(!user) throw 'Не удалось получить данные пользователя';
            localStorage.setItem('user_data', JSON.stringify(user));
            store.userData = user;
            store.appRole = user.role;
            store.isAuth = true;
        }
    } catch (err) {
        console.error('/src/views/MainViews/MainView.vue: onBeforeMount => ', err);
        router.push({ name: 'reception' });
        throw err;
    }
}

onBeforeMount( async () => {
    // Получение данных пользователя
    isLoadingData.value = true;
    initUserData()
        // Получение списка групп
        .then(() => getGroups())
        .then(({ data, meta }) => store.groups = data.groups)
        // Получение списка пользователей
        .then(() => {
            if(store.appRole === 'teacher') {
                return getUsers(1, 20)
            } 
            else return null;
        })
        .then((response) => {
            if(response) {
                const { data, meta } = response;
                store.students = data.users
            }
        })
        .finally(() => {
            setTimeout(() => {
                isLoadingData.value = false;
            }, 500);
        })
        .catch((err) => {
            console.error('/src/views/MainViews/MainView.vue: onBeforeMount => ', err);
        });
});
</script>

<style scoped>

.main-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff2c;
    backdrop-filter: blur(4px);
}
.main-content {
    width: 98%;
    overflow: hidden;
    margin-top: 0.8rem;
}
.main-img-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

</style>