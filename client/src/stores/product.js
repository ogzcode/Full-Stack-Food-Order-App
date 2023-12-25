import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const products = ref([])

    const setProducts = (newProducts) => {
        products.value = [...newProducts]
    }

    const reset = () => {
        products.value = []
    }

    const addProduct = (newProduct) => {
        products.value = [...products.value, newProduct]
    }

    const deleteProduct = (id) => {
        products.value = products.value.filter(product => product.id !== id)
    }

    const searchProduct = (query, filter=null) => {
        let copy = products.value.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))

        if (filter === 'favorite') {
            return copy.filter(product => product?.isFavority === true)
        }

        return copy;
    }

    const updateProduct = (updatedProduct) => {
        const index = products.value.findIndex(product => product.id === updatedProduct.id)
        products.value[index] = updatedProduct
    }

    return {
        products,
        reset,
        setProducts,
        addProduct,
        deleteProduct,
        searchProduct,
        updateProduct
    }
})