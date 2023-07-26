<template>
    <div class="mx-10 border-t">
        <div class="shadow-sm rounded p-6 mt-8 border border-slate-200">
            <table class="table-auto w-full">
                <thead class="">
                    <tr class="text-left border-b border-b-slate-300">
                        <th class="py-3 px-6 text-slate-600 font-normal text-base">Kullanıcı No</th>
                        <th class="py-3 px-6 text-slate-600 font-normal text-base">Email</th>
                        <th class="py-3 px-6 text-slate-600 font-normal text-base">Kullanıcı Adı</th>
                        <th class="py-3 px-6 text-slate-600 font-normal text-base">Rol</th>
                        <th class="py-3 px-6 text-slate-600 font-normal text-base text-center">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index" class="text-slate-700 even:bg-slate-100">
                        <td class="py-3 px-6">{{ index + 1 }}</td>
                        <td class="py-3 px-6">{{ user.username }}</td>
                        <td class="py-3 px-6">{{ user.email }}</td>
                        <td class="py-3 px-6">
                            <span :class="['px-2 py-1 rounded text-sm text-white' ,badge(user.role)]">{{ user.role.toLowerCase() }}</span>
                        </td>
                        <td class="py-2 px-2 flex justify-center">
                            <button class="table-btn rounded-md border border-sky-500">
                                <svg class="fill-sky-500 text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                </svg>
                            </button>
                            <button class="table-btn rounded-md border border-emerald-600">
                                <svg class="fill-emerald-600 text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                </svg>
                            </button>
                            <button class="table-btn rounded-md border border-red-600">
                                <svg class="fill-red-600 text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUsersStore } from '../../stores/users';
import { storeToRefs } from 'pinia';

const store = useUsersStore();

const { users } = storeToRefs(store);

onMounted(() => {
    store.getAllUsers();
});

const badge = (role) => {
    switch (role) {
        case 'ADMIN':
            return 'bg-red-600';
        case 'USER':
            return 'bg-emerald-500';
        default:
            return 'bg-gray-500';
    }
}

</script>

<style scoped>
.table-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 6px;
}

.fill {
    fill: white;
}
</style>
