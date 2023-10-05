<template>
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white py-8 px-8">
        <div class="flex justify-between items-center mb-4">
            <div class="relative">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" v-model="dataTableStore.searchQuery" @input="dataTableStore.searchItems()"
                    placeholder="Search..."
                    class="block p-2 pl-10 text-sm text-slate-900 border border-slate-300 rounded-md w-80 bg-slate-50 outline-0" />
            </div>
            <div>
                <slot name="headerActions"></slot>
            </div>
        </div>
        <table class="w-full text-sm text-left text-slate-500">
            <TableHeader />
            <TableBody>
                <template v-for="(_, name) in $slots" v-slot:[name]="{ data }">
                    <slot :name="name" :data="data">
                        {{ data[name] }}
                    </slot>
                </template>
            </TableBody>
        </table>
        <TableFooter />
    </div>
</template>

<script setup>
import { useDataTable } from "../../stores/useDataTable"

import TableHeader from './components/TableHeader.vue';
import TableBody from './components/TableBody.vue';
import TableFooter from './components/TableFooter.vue';

const dataTableStore = useDataTable();

</script>

<style scoped></style>