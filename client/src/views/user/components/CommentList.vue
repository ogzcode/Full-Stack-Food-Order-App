<template>
    <div class="max-h-[400px] overflow-y-auto order-scroll pr-2">
        <template v-if="comments.length > 0" v-for="(comment, i) in comments">
            <div class="bg-slate-50 border border-slate-300 p-4 rounded-md mb-4">
                <div class="flex justify-between items-center">
                    <div class="mb-4">
                        <p class="text-slate-800 tracking-wide font-medium">{{ comment.user.name }}</p>
                        <p class="text-xs text-slate-400 italic font-light">{{ formatDate(comment.createdAt) }}</p>
                    </div>
                    <div class="flex">
                        <template v-for="(star, i) in 5" :key="i">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-star-fill" :class="getStarColor(star, comment.rating)" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </template>
                    </div>
                </div>
                <p class="text-sm tracking-wide text-slate-600">
                    {{ comment.content }}
                </p>
            </div>
        </template>
        <template v-else>
            <p class="bg-slate-100 py-4 px-2 text-slate-500 font-light text-left">No comments yet.</p>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { formatDate } from "../utils/util"
import { getComments } from '../../../services/requestServices';

const comments = ref([]);

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['update:modelValue']);

const getStarColor = computed(() => (star, rating) => {
    return star <= rating ? 'text-orange-500' : 'text-slate-300';
});

onMounted(() => {
    getComments(props.productId).then((res) => {
        comments.value = res.data.comments;
        emits('update:modelValue', res.data.userCommentStatus);
    });
});
</script>

<style></style>