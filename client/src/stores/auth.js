import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "../services/tokenServices.js";
import ApiService from "../services/apiServices.js";

export const useAuthStore = defineStore("auth", () => {
    const router = useRouter();
    const errors = ref("");
    const user = ref({});
    const isAuthenticated = ref(!!getToken());

    function setAuth(authUser) {
        isAuthenticated.value = true;
        setToken(authUser.token);
        user.value = authUser.user;
        errors.value = "";
    }

    function setError(error) {
        errors.value = error;
    }

    function logout() {
        user.value = {};
        isAuthenticated.value = false;
        removeToken();
        errors.value = {};
    }

    async function login(credentials) {
        try {
            const response = await ApiService.post("/auth/login", credentials);
            setAuth(response.data);
            router.push("/");
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    async function register(credentials) {
        try {
            const response = await ApiService.post("/auth/register", credentials);
            router.push("/login");
        } catch (error) {
            setError(error.response.data.errors);
        }
    }

    function verifyAuth() {
        if (getToken()) {
            ApiService.setHeader();
            ApiService.get("/user")
                .then(({ data }) => {
                    setAuth(data);
                })
                .catch((error) => {
                    setError(error.response.data.errors);
                    logout();
                });
        }
        else {
            logout();
        }
    }

    return {
        errors,
        user,
        isAuthenticated,
        setError,
        register,
        logout,
        login,
        verifyAuth
    };
});