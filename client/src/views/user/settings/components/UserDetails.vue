<template>
    <div class="bg-white p-8 shadow rounded-lg mb-8">
        <h2 class="text-slate-700 text-xl font-medium tracking-wide mb-4">User Details</h2>
        <form @submit.prevent="handleSubmit" class="grid md:grid-cols-2 grid-cols-1 gap-x-8">
            <div class="md:col-span-1 col-span-2">
                <FormInput label="First Name" v-model:value="firstName" :value="firstName">
                    <template v-if="firstName === ''" #error>
                        <p class="text-xs text-red-500">First name is required</p>
                    </template>
                </FormInput>
            </div>

            <div class="md:col-span-1 col-span-2">
                <FormInput label="Last Name" v-model:value="lastName" :value="lastName">
                    <template v-if="lastName === ''" #error>
                        <p class="text-xs text-red-500">Last name is required</p>
                    </template>
                </FormInput>
            </div>

            <div class="md:col-span-1 col-span-2">
                <FormInput label="User Name" v-model:value="username" :value="username">
                    <template v-if="username === ''" #error>
                        <p class="text-xs text-red-500">User name is required</p>
                    </template>
                </FormInput>
            </div>

            <div class="md:col-span-1 col-span-2">
                <FormInput label="Email" v-model:value="email" :value="email" type="email">
                    <template v-if="email === ''" #error>
                        <p class="text-xs text-red-500">Email is required</p>
                    </template>
                </FormInput>
            </div>

            <div class="col-span-2">
                <FormInput label="Phone Number" v-model:value="phone" :value="phone">
                    <template v-if="phone === ''" #error>
                        <p class="text-xs text-red-500">Phone number is required</p>
                    </template>
                </FormInput>
            </div>

            <div class="col-span-2 mb-4 relative">
                <label class="text-sm block mb-1 text-zinc-600">Address</label>
                <textarea class="border border-zinc-400 rounded w-full p-2 text-zinc-600 transition focus:border-orange-400"
                    v-model="address" rows="5"
                    placeholder="123 Main Street, Apt. 4B, Cityville, ABC 12345, Country"></textarea>
                <template v-if="address === ''">
                    <p class="text-xs text-red-500">Address is required</p>
                </template>
            </div>

            <div class="my-4">
                <button class="text-sm tracking-wide font-semibold px-6 py-2 bg-sky-500 text-white rounded ">Update
                    Profile</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUserDetails } from '../../../../services/request/UserRequest';
import { useToastStore } from '../../../../stores/toast';
import { useAuth } from '../../../../stores/auth';

import FormInput from '../../../auth/components/FormInput.vue';
import { updateUser } from '../../../../services/request/UserRequest';

const authStore = useAuth();
const toastStore = useToastStore();

const username = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');

onMounted(() => {
    getUserDetails()
        .then((res) => {
            const user = res.data.user;

            username.value = user.username;
            firstName.value = user.firstName;
            lastName.value = user.lastName;
            email.value = user.email;
            phone.value = user.phone;
            address.value = user.address;
        })
        .catch((err) => {
            console.log(err);
        });
});

const handleSubmit = () => {
    updateUser({
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        address: address.value
    })
        .then((res) => {
            toastStore.showToast("success", "User details updated successfully");
            authStore.updateUser(res.data.user);
        })
        .catch((err) => {
            toastStore.showToast("error", "Unable to update user details");
        });
}

</script>

<style scoped>
textarea:focus {
    outline: 2px solid #fed7aa;
}
</style>