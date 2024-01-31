<template>
    <div class="mt-12 border-red-500 border p-4 rounded-lg bg-red-50 gap-x-8 flex items-center md:flex-row flex-col">
        <p class="flex-1 text-red-700 text-base font-medium">
            Are you sure you want to cancel your order? If your order has not yet been prepared by the
            restaurant,
            cancellation is free.However, if your order has already started being prepared, you may be charged
            for cancellation.
        </p>
        <button @click="handleDeleteDialog(true)"
            class="sm:px-8 px-6 sm:py-3 py-2 bg-red-600 rounded-md text-white md:mt-0 mt-4 flex items-center">
            <Icons name="exclamation-circle-fill" :size="20" :style="'fill-white mr-3'" />
            <span>Cancel Order</span>
        </button>
    </div>
    <Dialog headerTitle="Cancel Order" :show="showDeleteDialog" @close="handleDeleteDialog(false)" @submit="handleCancelOrder"
        submit-text="OK" submit-type="danger">
        <template v-slot:body>
            <p class="text text-slate-500">
                Are you sure you want to cancel this order?
            </p>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { changeOrderStatus } from '../../../../services/request/OrderRequest';
import Icons from '../../../../components/Icons.vue';
import { useToastStore } from '../../../../stores/toast';
import Dialog from '../../../../components/Dialog.vue';

const showDeleteDialog = ref(false);

const router = useRouter();
const toastStore = useToastStore();

const props = defineProps({
    orderId: {
        type: Number,
        default: '',
    },
});

const handleCancelOrder = async () => {
    try {
        await changeOrderStatus({
            orderId: props.orderId,
            status: 'cancelled',
        });
        toastStore.showToast('success', 'Order cancelled successfully');
        router.push('/user/products');
    } catch (err) {
        toastStore.showToast('error', err.response.data.message);
        console.log(err);
    }
}

const handleDeleteDialog = (value) => {
    showDeleteDialog.value = value
}
</script>


<style scoped></style>