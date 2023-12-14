<template>
    <div class="md:py-20 py-10" id="services">
        <div class="flex flex-col items-center mb-16">
            <h1 class="font-bold text-3xl text-slate-800 mb-4 tracking-wide">Our Services</h1>
            <p class="lg:w-1/3 sm:w-2/3 text-center text-slate-800 tracking-wide font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ut cursus quam. Suspendisse potenti.
                Vestibulum dapibus sagittis enim ut scelerisque.
            </p>
        </div>
        <div class="flex justify-around flex-wrap mx-20 gap-8">
            <div class="services-card max-w-[360px] bg-zinc-50 p-8 rounded-2xl shadow hover:bg-orange-500">
                <div
                    class="w-[72px] h-[72px] bg-white rounded-full flex justify-center items-center mx-auto mb-8 fill-orange-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="bi bi-truck"
                        viewBox="0 0 16 16">
                        <path
                            d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                </div>
                <h1 class="text-center text-orange-900 tracking-wide font-bold text-xl mb-2">Fast delivery</h1>
                <p class="text-center text-orange-800/70 tracking-wide font-medium text-sm">
                    We deliver your orders as quickly as possible at our restaurant. Your order will be delivered to you
                    within an average of 30 minutes from the time you place your order.
                </p>
            </div>
            <div class="services-card max-w-[360px] bg-zinc-50 p-8 rounded-2xl shadow hover:bg-orange-500">
                <div
                    class="w-[72px] h-[72px] bg-white rounded-full flex justify-center items-center mx-auto mb-8 fill-orange-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="bi bi-basket2"
                        viewBox="0 0 16 16">
                        <path
                            d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z" />
                        <path
                            d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z" />
                    </svg>
                </div>
                <h1 class="text-center text-orange-900 tracking-wide font-bold text-xl mb-2">Fresh and delicious
                </h1>
                <p class="text-center text-orange-800/70 tracking-wide font-medium text-sm">
                    All ingredients used in our restaurant are fresh and delicious. We use the highest quality ingredients
                    when preparing our meals.
                </p>
            </div>
            <div class="services-card max-w-[360px] bg-zinc-50 p-8 rounded-2xl shadow hover:bg-orange-500">
                <div
                    class="w-[72px] h-[72px] bg-white rounded-full flex justify-center items-center mx-auto mb-8 fill-orange-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="bi bi-alarm" viewBox="0 0 16 16">
                        <path
                            d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                        <path
                            d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                    </svg>
                </div>
                <h1 class="text-center text-orange-900 tracking-wide font-bold text-xl mb-2">Quickly made</h1>
                <p class="text-center text-orange-800/70 text-sm font-medium">
                    Our food is made to order and served to you within minutes, so you can enjoy your meal as soon as
                    possible.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.services-card {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.services-card:hover p,
.services-card:hover h1 {
    color: white;
}
</style>