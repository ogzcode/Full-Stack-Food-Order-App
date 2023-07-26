import { defineStore } from "pinia";
import { ref } from "vue";

import ApiService from "../services/apiServices";

export const useUsersStore = defineStore("users", () => {
    const users = ref([]);
    const errors = ref("");

    function setUsers(newUsers) {
        users.value = newUsers;
    }

    function clearUser() {
        users.value = [];
    }

    function setError(error) {
        errors.value = error;
    }

    async function getAllUsers() {
        try {
            const response = await ApiService.get("/users/getAllUsers");
            setUsers(response.data);
        }
        catch (error) {
            console.log(error);
            setError(error.response.data.error);
        }
    }

    return {
        users,
        setUsers,
        clearUser,
        getAllUsers
    };
});