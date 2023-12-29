<template>
    <div class="mt-12 border-red-500 border p-4 rounded-lg bg-red-50 gap-x-8 flex items-center md:flex-row flex-col">
        <p class="flex-1 text-red-700 text-base font-medium">
            Are you sure you want to cancel your order? If your order has not yet been prepared by the
            restaurant,
            cancellation is free.However, if your order has already started being prepared, you may be charged
            for cancellation.
        </p>
        <button @click="handleCancelOrder" class="sm:px-8 px-6 sm:py-3 py-2 bg-red-600 rounded-md text-white md:mt-0 mt-4 flex items-center">
            <Icons name="exclamation-circle-fill" :size="20" :style="'fill-white mr-3'" />
            <span>Cancel Order</span>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { changeOrderStatus } from '../../../../services/request/OrderRequest';
import Icons from '../../../../components/Icons.vue';
import { useToastStore } from '../../../../stores/toast';

const router = useRouter();
const toastStore = useToastStore();

const props = defineProps({
    orderId: {
        type: String,
        required: true,
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

</script>


<style scoped></style>