<template>
    <div class="mt-12 border-red-700 border p-4 rounded-lg bg-orange-50 gap-x-8 flex items-center md:flex-row flex-col">
        <p class="flex-1 text-red-900 text-base font-medium">
            Are you sure you want to cancel your order? If your order has not yet been prepared by the
            restaurant,
            cancellation is free.However, if your order has already started being prepared, you may be charged
            for cancellation.
        </p>
        <button class="sm:px-8 px-6 sm:py-3 py-2 bg-red-600 rounded-md text-white md:mt-0 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                class="bi bi-exclamation-circle-fill fill-white mr-3" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            <span>Cancel Order</span>
        </button>
    </div>
</template>

<script setup>

</script>


<style scoped></style>