<template>
    <div class="mx-10 px-10 pt-10 border-t">
        <h2 class="font-ubuntu font-semibold text-2xl text-slate-800">Siparişler</h2>
        <div class="">
            <table class="table-auto w-full">
                <thead class="">
                    <tr class="text-left border-b border-b-slate-300">
                        <th class="py-4 text-slate-500 font-normal">Sipariş No</th>
                        <th class="py-4 text-slate-500 font-normal">Müşteri</th>
                        <th class="py-4 text-slate-500 font-normal">Toplam Tutar</th>
                        <th class="py-4 text-slate-500 font-normal">Sipariş Tarihi</th>
                        <th class="py-4 text-slate-500 font-normal text-right">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id" class="text-slate-600 even:bg-slate-50">
                        <td class="py-4 px-2">{{ order.id }}</td>
                        <td class="py-4 px-2">{{ order.customer }}</td>
                        <td class="py-4 px-2">{{ order.total }}</td>
                        <td class="py-4 px-2">{{ order.date }}</td>
                        <td class="py-4 px-2 flex justify-end">
                            <button class="table-btn bg-sky-500 hover:bg-sky-600">
                                <svg class="fill text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                </svg>
                            </button>
                            <button class="table-btn bg-green-500 hover:bg-green-600">
                                <svg class="fill text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                </svg>
                            </button>
                            <button class="table-btn bg-red-500 hover:bg-red-600">
                                <svg class="fill text-sm" xmlns="http://www.w3.org/2000/svg" height="1em"
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

<script>
import { ref } from 'vue';

export default {
    name: 'Orders',
    setup() {
        const orders = ref([
            {
                id: 1,
                customer: 'Mehmet',
                total: 100,
                date: '12.12.2021'
            },
            {
                id: 2,
                customer: 'Ayşe',
                total: 75,
                date: '15.12.2021'
            },
            {
                id: 3,
                customer: 'Ali',
                total: 200,
                date: '18.12.2021'
            },
            {
                id: 4,
                customer: 'Fatma',
                total: 50,
                date: '20.12.2021'
            },
            {
                id: 5,
                customer: 'Ahmet',
                total: 120,
                date: '22.12.2021'
            },
            {
                id: 6,
                customer: 'Zeynep',
                total: 90,
                date: '25.12.2021'
            },
            {
                id: 7,
                customer: 'Murat',
                total: 180,
                date: '28.12.2021'
            },
            {
                id: 8,
                customer: 'Elif',
                total: 60,
                date: '30.12.2021'
            },
            {
                id: 9,
                customer: 'Cem',
                total: 150,
                date: '02.01.2022'
            },
            {
                id: 10,
                customer: 'Aysel',
                total: 85,
                date: '05.01.2022'
            }
        ]);

        return {
            orders
        }
    }
}
</script>

<style scoped>
.table-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 6px;
}

.fill {
    fill: white;
}
</style>
