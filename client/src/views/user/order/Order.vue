<template>
    <div class="sm:p-12 p-6">
        <template v-if="order">
            <status-bar :status="order?.status" />
            <details-table :order-products="order.products" />
            <address-and-payment-details :addressDetails="addressDetails" :paymentDetails="paymentDetails" />
            <cancel-message :order-id="order.id" />
        </template>
        <template v-else>
            <info-message />
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import StatusBar from './components/StatusBar.vue'
import DetailsTable from './components/DetailsTable.vue'
import AddressAndPaymentDetails from './components/AddressAndPaymentDetails.vue'
import CancelMessage from './components/CancelMessage.vue'
import InfoMessage from './components/InfoMessage.vue'

import { getUserPendingOrder } from '../../../services/request/OrderRequest'
import { useToastStore } from '../../../stores/toast'

const order = ref(null)
const addressDetails = ref(null)
const paymentDetails = ref(null)
const toastStore = useToastStore()

onMounted(() => {
    getUserPendingOrder()
        .then((res) => {
            order.value = res.data.order;

            if (res.data.userDetails) {
                addressDetails.value = res.data.userDetails;
                paymentDetails.value = {
                    orderNo: res.data.order.orderNo,
                    paymentType: res.data.order.paymentType,
                    total: res.data.order.totalPrice,
                }
            }
        })
        .catch((err) => {
            toastStore.showToast('error', err.response.data.message)
        })
})
</script>

<style scoped></style>