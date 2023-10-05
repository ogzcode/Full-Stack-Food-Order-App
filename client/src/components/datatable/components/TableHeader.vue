<template>
    <thead class= "border-b">
        <tr>
            <th scope="col" class="p-4">
                <input type="checkbox" v-model="check" @change="dataTableStore.selectAll(check)" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
            </th>
            <th v-for="column in dataTableStore.headers" 
                :key="column.key" 
                :style="{ width: column.width }"
                @click="handleSort(column.key, column.sortEnabled)"
                class="px-4 py-2 text-left text-slate-600 font-semibold tracking-wider cursor-pointer"
                scope="col"
            >
                {{ column.columnName }}

                <span v-if="columnLabelAndOrder.columnName === column.key" class="inline-block align-middle">
                    <span v-if="columnLabelAndOrder.order === 'asc'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path
                                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>
                    </span>
                    <span v-else-if="columnLabelAndOrder.order === 'desc'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path
                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </span>
                </span>
            </th>
        </tr>
    </thead>
</template>

<script setup>
import { ref } from 'vue';
import { useDataTable } from "../../../stores/useDataTable"


const dataTableStore = useDataTable();

const columnLabelAndOrder = ref({
    columnName: '',
    order: ''
})

const check = ref(false);

const handleSort = (columnName, sortEnabled) => {
    if (!sortEnabled) return;

    if (columnLabelAndOrder.value.columnName === columnName) {
        columnLabelAndOrder.value.order = columnLabelAndOrder.value.order === 'asc' ? 'desc' : 'asc';
    }
    else {
        columnLabelAndOrder.value.columnName = columnName;
        columnLabelAndOrder.value.order = 'asc';
    }

    dataTableStore.sort(columnLabelAndOrder.value);
}
</script>

<style scoped>

</style>