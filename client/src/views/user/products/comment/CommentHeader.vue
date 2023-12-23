<template>
    <div>
        <div class="flex items-end mb-2">
            <span class="text-zinc-700 tracking-wide font-semibold text-lg mr-4 leading-none">{{
                props.username
            }}</span>
            <span class="text-xs text-zinc-500 italic font-normal self-end leading-none">{{
                formatDate(props.createdAt)
            }}</span>
        </div>
        <div class="flex gap-px">
            <template v-for="(star, j) in 5" :key="j">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-star-fill"
                    :class="getStarColor(star, props.rating)" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate } from '../../../../utils/util';

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const getStarColor = computed(() => (star, rating) => {
    return star <= rating ? 'text-orange-500' : 'text-slate-300';
});
</script>

<style scoped></style>