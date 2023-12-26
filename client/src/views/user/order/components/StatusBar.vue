<template>
    <div class="border border-zinc-300 rounded-lg h-40 flex items-center px-16 mb-12">
        <div class="w-full h-2 rounded-full bg-zinc-100 relative flex justify-between items-center">
            <div class="absolute w-1/2 h-full bg-orange-500"></div>
            <div class="w-10 h-10 rounded-full bg-orange-500 flex justify-center items-center z-10 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-check2 fill-white"
                    viewBox="0 0 16 16">
                    <path
                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Received</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-orange-500 flex justify-center items-center z-10 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-check2 fill-white"
                    viewBox="0 0 16 16">
                    <path
                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Prepared</span>
            </div>
            <div class="w-10 h-10 rounded-full border-dashed border-2 border-orange-400 bg-zinc-100 block z-10 relative">
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Cargo</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>