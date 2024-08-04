import type { Role } from '@/types/appTypes';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {

    const appRole: Ref<Role> = ref<Role>('student');

    return {
        appRole,
    }
})
