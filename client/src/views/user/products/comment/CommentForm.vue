<template>
    <div class="mb-8 pr-2">
        <div class="mb-4">
            <label class="text-sm mb-1 block text-slate-500">Comment</label>
            <textarea v-model="comment" class="border border-slate-400 rounded-lg w-full p-2 outline-0 text-zinc-700 focus:border-orange-400"
                rows="5"></textarea>
        </div>
        <div class="flex justify-between items-center">
            <div class="flex">
                <template v-for="(star, i) in 5" :key="i">
                    <button class="m-px" @click="handleSelectedStar(star)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-star-fill" :class="getStarColor(i)" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522
                                        3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389
                                        2.256z" />
                        </svg>
                    </button>
                </template>
            </div>
            <button @click="handleSubmitComment"
                class="px-8 py-1 text-white bg-orange-600 rounded">Send</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToastStore } from '../../../../stores/toast';
import { createComment } from "../../../../services/request/CommentRequest.js"

const toastStore = useToastStore()

const comment = ref('')
const selectedStar = ref(0)

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['closeDialog'])

const handleSelectedStar = (star) => {
    selectedStar.value = star
}

const handleSubmitComment = () => {
    const reqData = {
        productId: props.productId,
        comment: comment.value,
        rating: selectedStar.value
    }
    createComment(reqData)
        .then(() => {
            comment.value = ''
            selectedStar.value = 0
            emits('closeDialog')
            toastStore.showToast('success', 'Comment added successfully')
        })
        .catch(err => {
            toastStore.showToast('error', err.message)
        })
}

const getStarColor = computed(() => (index) => {
    return index < selectedStar.value ? 'text-orange-500' : 'text-slate-300';
});
</script>

<style scoped>
textarea:focus {
    outline: 2px solid #fed7aa;
}
</style>