import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const products = ref([])

    const setProducts = (newProducts) => {
        products.value = [...newProducts]
    }

    const addProduct = (newProduct) => {
        products.value = [...products.value, newProduct]
    }

    const deleteProduct = (id) => {
        products.value = products.value.filter(product => product.id !== id)
    }

    const searchProduct = (query) => {
        return products.value.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    }

    const updateProduct = (updatedProduct) => {
        const index = products.value.findIndex(product => product.id === updateProduct.id)
        products.value[index] = updatedProduct
    }

    return {
        products,
        setProducts,
        addProduct,
        deleteProduct,
        searchProduct,
        updateProduct
    }
})