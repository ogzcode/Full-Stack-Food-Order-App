<template>
    <template v-if="!commentStatus">
        <CommentForm :product-id="productId" @close-dialog="$emit('closeDialog')" />
    </template>
    <div class="max-h-[440px] sm:w-[600px] w-full overflow-y-auto order-scroll pr-2">
        <template v-if="comments.length > 0" v-for="(comment, i) in comments" :key="i">
            <div class="bg-zinc-50 border border-zinc-400 p-4 rounded-md mb-4 relative">
                <div class="pb-4 mb-4 flex justify-between items-center border-b border-zinc-200">
                    <CommentHeader :username="comment.user.username" :createdAt="comment.createdAt"
                        :rating="comment.rating" />
                    <div v-if="isUserComment(comment)">
                        <IconBtn @click="handleDeleteComment(comment.id)" severity="red" iconName="trash-fill"
                            iconStyle="fill-red-500" :iconSize="16" btnStyle="w-18 h-18" />
                        <IconBtn severity="indigo" iconName="pencil-fill" iconStyle="fill-indigo-500" :iconSize="16"
                            btnStyle="w-18 h-18" />

                    </div>
                </div>
                <p class="text-sm font-medium text-zinc-700">
                    {{ comment.content }}
                </p>
            </div>
        </template>
        <template v-else>
            <p class="bg-zinc-100 py-4 px-2 text-zinc-500 font-normal rounded-lg text-left">No comments yet.</p>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getComments, deleteComment } from "../../../../services/request/CommentRequest.js"
import IconBtn from "../../../../components/IconBtn.vue"
import { useAuth } from "../../../../stores/auth.js"
import CommentForm from './CommentForm.vue';
import { useToastStore } from '../../../../stores/toast';
import CommentHeader from './CommentHeader.vue';

const authStore = useAuth();
const toastStore = useToastStore();

const comments = ref([]);
const commentStatus = ref(true);

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['closeDialog']);

onMounted(() => {
    getComments(props.productId).then((res) => {
        comments.value = res.data.comments;
        commentStatus.value = res.data.userCommentStatus;
    });
});

const isUserComment = (comment) => {
    return authStore.user.id === comment.user.id;
}

const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
        .then(() => {
            emits('closeDialog');
            toastStore.showToast('success', 'Comment deleted successfully');
        })
        .catch(err => {
            toastStore.showToast('error', err.message);
        })
}
</script>

<style></style>