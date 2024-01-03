<template>
    <div class="w-[320px] flex flex-col justify-between border border-zinc-300 rounded-xl relative transition hover:border-orange-500">
        <div class="absolute right-4 top-4">
            <button ref="menuBtnRef" class="bg-slate-100 rounded-full p-2 text-slate-600 hover:bg-slate-200"
                @click="toggleAction">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </button>
        </div>
        <div class="p-4">
            <img :src="getImgURL" class="" />
        </div>
        <div class="px-8 py-4 flex justify-between items-center">
            <div class="w-1/2">
                <p class="text-slate-800 font-semibold text-xl text-ellipsis mb-2">{{ props.name }}</p>
                <p class="text-slate-500 font-light text-sm mt-1 text-ellipsis">{{ props.description }}</p>
            </div>
            <div>
                <p class="font-bold text-orange-600 text-xl text-right mb-2">${{ props.price }}</p>
                <CommentDialogBtn :product-rating="props.rating" @on-open-comment-dialog="$emit('open-comment-dialog')" />
            </div>
        </div>
        <div ref="menuRef" class="absolute bottom-full right-0 flex gap-x-2 mb-2" v-if="showAction">
            <button @click="$emit('update')" class="text-white bg-sky-500 p-2 rounded-full">
                <Icons name="pencil" :size="20" />
            </button>
            <button @click="$emit('delete')" class="text-white bg-red-500 p-2 rounded-full">
                <Icons name="trash" :size="20" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, Comment } from "vue";
import Icons from "../../../components/Icons.vue";
import CommentDialogBtn from "../../user/products/components/CommentDialogBtn.vue"

const showAction = ref(false);
const menuRef = ref(null);
const menuBtnRef = ref(null);

const emits = defineEmits(["delete", "update", "open-comment-dialog"]);

const props = defineProps({
    image: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: Number
    }
});

const getImgURL = computed(() => {
    return "http://localhost:3000/public/docs/" + props.image;
});

const toggleAction = () => {
    showAction.value = !showAction.value;
};

const handleClickOutside = (event) => {
    if (menuRef.value && menuBtnRef.value && !menuBtnRef.value.contains(event.target) && !menuRef.value.contains(event.target)) {
        showAction.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>

<style scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
