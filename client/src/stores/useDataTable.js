import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import arraySort from 'array-sort';

export const useDataTable = defineStore("data-table", () => {
    const realData = ref([])
    const headers = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const searchQuery = ref('');
    const initData = ref([]);
    const selectedItems = ref([]);

    const setSelectedItems = (item) => {
        if (selectedItems.value.includes(item)) {
            const index = selectedItems.value.indexOf(item);
            if (index > -1) {
                selectedItems.value.splice(index, 1);
            }
        }
        else {
            selectedItems.value.push(item);
        }
    }

    const selectAll = (check) => {
        if (check) {
            selectedItems.value = [...initData.value];
        } else {
            selectedItems.value = [];
        }
    }

    const init = (data, header) => {
        realData.value = data;
        headers.value = header;
        initData.value = data;
    }

    const setData = (data) => {
        realData.value = data;
    }

    const setHeaders = (data) => {
        headers.value = data;
    }

    const setItemsPerPage = (page) => {
        itemsPerPage.value = page;
    }

    const sort = ({ columnName, order }) => {
        arraySort(initData.value, columnName, { reverse: order === 'desc' });
    }

    const totalItems = computed(() => initData.value.length);

    const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const pageChange = (page) => {
        currentPage.value = page;
    }

    const setFirstPage = () => {
        currentPage.value = 1;
    }

    const setLastPage = () => {
        currentPage.value = pageCount.value;
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }

    const nextPage = () => {
        if (currentPage.value < pageCount.value) {
            currentPage.value++;
        }
    }

    const searchItems = () => {
        if (searchQuery.value.length > 0) {
            initData.value = realData.value.filter((item) => {
                return Object.keys(item).some((key) => {
                    return String(item[key]).toLowerCase().includes(searchQuery.value.toLowerCase());
                });
            });
        } else {
            initData.value = realData.value;
        }
    }

    const dataToDisplay = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return initData.value.slice(start, end);
    });

    const deleteItem = (item) => {
        const index = realData.value.indexOf(item);
        const index2 = initData.value.indexOf(item);
        if (index > -1) {
            realData.value.splice(index, 1);
            initData.value.splice(index2, 1);
        }
    }

    const addItem = (item) => {
        const existItem = initData.value.find((i) => i.id === item.id);

        if (existItem) {
            let index1 = initData.value.indexOf(existItem);
            let index2 = realData.value.indexOf(existItem);

            initData.value[index1] = item;
            realData.value[index2] = item;
        }
        else {
            realData.value.push(item);
            initData.value.push(item);
        }
    }

    const filterByStatus = (status) => {
        if (status === 'all') {
            initData.value = realData.value;
        }
        else {
            initData.value = realData.value.filter((item) => item.status === status);
        }
    }


    return {
        headers,
        currentPage,
        initData,
        itemsPerPage,
        totalItems,
        pageCount,
        searchQuery,
        dataToDisplay,
        selectedItems,
        setSelectedItems,
        selectAll,
        searchItems,
        init,
        setData,
        setHeaders,
        sort,
        setItemsPerPage,
        pageChange,
        setFirstPage,
        setLastPage,
        prevPage,
        nextPage,
        deleteItem,
        addItem,
        filterByStatus
    }
});