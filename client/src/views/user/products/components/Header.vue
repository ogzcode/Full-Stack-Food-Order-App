<template>
    <div class="flex justify-between items-center">
        <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
        <div>
            <input type="text" class="border border-slate-400 rounded w-[240px] p-2 outline-0 text-slate-800 text-sm transition focus:border-orange-400"
                placeholder="Search Products..." :value="props.value" @input="updateValue" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['update:value'])

const updateValue = (e) => {
    emits('update:value', e.target.value)
}

</script>

<style scoped>
input:focus {
    outline: 2px solid #fed7aa;
}
</style>