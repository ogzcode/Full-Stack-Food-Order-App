<template>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <FormInput label="Product Name" :value="name" v-model:value="name" required />
        <div class="mb-4 relative">
            <label class="text-sm block mb-1 text-zinc-600">Product Description</label>
            <textarea class="border border-zinc-400 rounded w-full p-2 text-zinc-600 transition focus:border-orange-400"
                v-model="description" rows="4" required></textarea>
        </div>
        <div class="mb-4">
            <label class="text-sm block mb-1 text-zinc-600">Product Price</label>
            <input type="text"
                class="border border-zinc-400 rounded w-full p-2 text-zinc-600 transition focus:border-orange-400"
                :value="price" @input="handleChangePrice" required />
        </div>

        <div class="mb-4">
            <label class="text-sm block mb-1 text-zinc-600">Upload file</label>
            <input
                class="border border-zinc-400 rounded w-full p-2 text-zinc-600 transition focus:border-orange-400 hover:border-orange-400"
                type="file" name="image" @change="handleFileChange" />
        </div>
        <div class="flex justify-end mb-1">
            <button :disabled="!name || !description || !price || (!props.selectedProduct && !file)"
                class="text-base px-3 font-medium py-1 rounded bg-sky-500 text-white disabled:bg-sky-400 disabled:cursor-not-allowed" type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FormInput from "../../../auth/components/FormInput.vue";

const name = ref('');
const description = ref('');
const price = ref(0);
const file = ref(null);

const emits = defineEmits(["onSubmit"]);

const props = defineProps({
    selectedProduct: {
        type: Object,
        default: null
    }
})

onMounted(() => {
    if (props.selectedProduct) {
        name.value = props.selectedProduct.name;
        description.value = props.selectedProduct.description;
        price.value = props.selectedProduct.price;
    }
})

const handleFileChange = (e) => {
    file.value = e.target.files[0]
}

const handleChangePrice = (e) => {
    const inputValue = e.target.value;
    if (!/^\d+$/.test(inputValue)) {
        price.value = "0";
        e.target.value = "0";
        return;
    }

    price.value = parseInt(inputValue);
}

const handleSubmit = () => {
    const formData = new FormData();
    formData.append('id', props.selectedProduct ? props.selectedProduct.id : null);
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('price', parseInt(price.value));
    formData.append('image', file.value);

    emits("onSubmit", formData);

    name.value = '';
    description.value = '';
    price.value = 0;
    file.value = null;
}

</script>

<style scoped>
input[type=file]::file-selector-button {
    display: none;
}

textarea:focus,
input:focus {
    outline: 2px solid #fed7aa;
}
</style>