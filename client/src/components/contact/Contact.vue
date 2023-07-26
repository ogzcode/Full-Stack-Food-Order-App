<template>
    <main>
        <header class="row mt-40">
            <div class="max-w-[600px] mx-auto">
                <h2 class="col-12 text-center text-4xl font-normal mb-7 text-slate-800">Contact Page</h2>
                <p class="col-12 text-center text-slate-600">You may use <a rel="nofollow"
                        href="https://www.ltcclock.com/downloads/simple-contact-form/" target="_blank">Simple Contact
                        Form</a>
                    to send email to your inbox. You can modify and use this template for your website. Header image has a
                    parallax effect. Total 3 HTML pages included in this template.</p>
            </div>
        </header>
        <div class="bg-rose-400 h-px mx-20 my-40"></div>
        <div class="my-10">
            <h1 class="text-center text-rose-700 text-3xl">Our Address</h1>
            <p class="text-center mt-2 text-lg text-slate-600">You can reach us at these addresses</p>
            <div class="flex justify-center mt-12">
                <div class="shadow-lg w-[240px] p-8 mx-16 rounded">
                    <svg class="fill-green-500 text-4xl mx-auto my-4" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <span class="text-sm text-center block text-gray-400">1600 Amphitheatre Parkway, Mountain View, CA
                        94043, ABD</span>
                </div>
                <div class="shadow-lg w-[240px] p-8 mx-16 rounded">
                    <svg class="fill-blue-500 text-4xl mx-auto my-4" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    <span class="text-sm text-center block text-gray-400">0987 748 63 65</span>
                </div>
                <div class="shadow-lg w-[240px] p-8 mx-16 rounded">
                    <svg class="fill-fuchsia-500 text-4xl mx-auto my-4" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                    <span class="text-sm text-center block text-gray-400">email@com.tr</span>
                </div>
            </div>
            <div class="bg-rose-400 h-px mx-20 my-40"></div>
            <div class="my-20">
                <h1 class="text-center text-3xl text-slate-600">Contact Form</h1>
                <div class="flex justify-center mt-6">
                    <form class="w-1/2">
                        <div class="mb-4">
                            <label class="block text-gray-500 text-sm mb-1" for="name">Name</label>
                            <input
                                class="border border-gray-400 outline-0 w-full px-2 py-1 rounded text-gray-700 font-medium"
                                type="text" id="name" name="name" placeholder="Your name..">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-500 text-sm mb-1" for="email">Email</label>
                            <input
                                class="border border-gray-400 outline-0 w-full px-2 py-1 rounded text-gray-700 font-medium"
                                type="email" id="email" name="email" placeholder="Your email..">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-500 text-sm mb-1" for="subject">Subject</label>
                            <textarea rows="10"
                                class="border border-gray-400 outline-0 w-full px-2 py-1 rounded text-gray-700 font-medium"
                                id="subject" name="subject" placeholder="Write something.."></textarea>
                        </div>
                        <div class="text-center">
                            <button
                                class="block mx-auto mt-6 bg-sky-500 px-8 py-2 text-white font-medium shadow-lg shadow-sky-500/50">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
    name: 'Contact',
    components: {
    }
}
</script>

<style scoped></style>