<template>
    <div class="flex justify-between items-start mt-12 gap-x-12 gap-y-6 md:flex-nowrap flex-wrap">
        <div class="border border-zinc-300 rounded-lg md:w-1/2 w-full">
            <h1 class="text-slate-700 font-semibold border-b border-zinc-300 p-4">Shipping Address</h1>
            <div>
                <div class="px-4 py-2">
                    <p class="text-slate-700 text-base font-semibold mb-px">{{ props.addressDetails.userFullName }}</p>
                    <p class="text-sm text-slate-600 font-medium">{{ props.addressDetails.address }}</p>
                </div>
                <div class="px-4 py-2">
                    <p class="text-slate-700 text-base font-semibold mb-px">Email</p>
                    <p class="text-sm text-slate-600 font-medium">{{ props.addressDetails.email }}</p>
                </div>
                <div class="px-4 py-2">
                    <p class="text-slate-700 text-base font-semibold mb-px">Phone</p>
                    <p class="text-sm text-slate-600 font-medium">{{ props.addressDetails.phone }}</p>
                </div>
            </div>
        </div>
        <div class="border border-zinc-300 rounded-lg md:w-1/2 w-full">
            <h1 class="text-slate-700 font-semibold border-b border-zinc-300 p-4">Payment</h1>
            <div>
                <div class="px-4 py-2 flex justify-between border-b border-zinc-300">
                    <p class="text-slate-600 text-sm font-medium mb-px">Order No</p>
                    <p class="text-base text-slate-700 font-semibold">{{ props.paymentDetails.orderNo }}</p>
                </div>
                <div class="px-4 py-2 flex justify-between border-b border-zinc-300">
                    <p class="text-slate-600 text-sm font-medium mb-px">Shipping</p>
                    <p class="text-base text-slate-700 font-semibold">Free</p>
                </div>
                <div class="px-4 py-2 flex justify-between">
                    <p class="text-slate-600 text-sm font-medium mb-px">Payment Type</p>
                    <p class="text-base text-slate-700 font-semibold">{{ props.paymentDetails.paymentType.toUpperCase() }}</p>
                </div>
                <div class="px-4 py-4 flex justify-between border-t border-zinc-300">
                    <p class="text-slate-700 text-xl font-semibold mb-px">Total</p>
                    <p class="text-xl text-slate-700 font-semibold">${{ props.paymentDetails.total }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    addressDetails: {
        type: Object,
        required: true,
    },
    paymentDetails: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped></style>