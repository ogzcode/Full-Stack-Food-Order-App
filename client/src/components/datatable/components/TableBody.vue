<template>
    <tbody>
        <template v-for="(row, i) in dataTableStore.dataToDisplay" :key="i">
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="w-4 p-4">
                    <input 
                        type="checkbox" 
                        :checked="dataTableStore.selectedItems.includes(row)" 
                        @change="onChangeSelect(row)" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                </td>
                <template v-for="(column, j) in dataTableStore.headers" :key="j">
                    <td :style="{
                        minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
                        width: 'auto'
                    }" class="px-4 py-2">
                        <slot :name="column.key" :data="row">
                            {{ row[column.key] }}
                        </slot>
                    </td>
                </template>
            </tr>
        </template>
    </tbody>
</template>


<script setup>
import { useDataTable } from "../../../stores/useDataTable"

const dataTableStore = useDataTable();

const onChangeSelect = (row) => {
    dataTableStore.setSelectedItems(row);
}
</script>

<style scoped>

</style>