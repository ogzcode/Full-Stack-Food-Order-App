<template>
    <div class="sm:p-12 p-6">
        <StatusBar />
        <DetailsTable />
        <AddressAndPaymentDetails />
        <CancelMessage />
    </div>
</template>

<script setup>
import StatusBar from './components/StatusBar.vue'
import DetailsTable from './components/DetailsTable.vue'
import AddressAndPaymentDetails from './components/AddressAndPaymentDetails.vue'
import CancelMessage from './components/CancelMessage.vue'
</script>

<style scoped></style>