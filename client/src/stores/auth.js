import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TokenManager from '../services/tokenServices'
import { Login, Register, CheckAuth } from "../services/request/AuthRequest"
import { deleteAccount, updateUser } from "../services/request/UserRequest"

export const useAuth = defineStore('auth', () => {
    const router = useRouter()
    const user = ref(null)
    const isAuthenticated = ref(false)
    const error = ref(null)
    const loading = ref(false)

    const clearError = () => {
        error.value = null
    }

    const setLoading = (value) => {
        loading.value = value
    }

    const login = ({ email, password }) => {
        setLoading(true);
        Login({ email, password })
            .then((response) => {
                TokenManager.saveToken(response.data.token)
                user.value = response.data.user
                isAuthenticated.value = true
                
                if (user.value.role === 'admin') {
                    router.push({ name: 'AdminHome' })
                }
                else {
                    router.push({ name: 'UserHome' })
                }
            })
            .catch((err) => {
                error.value = err.response?.data.error
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const logout = () => {
        TokenManager.destroyToken()
        user.value = null
        isAuthenticated.value = false
        router.push({ name: 'Login' })
    }

    const signup = ({ email, password, username }) => {
        Register({ email, password, username })
            .then((response) => {
                router.push({ name: 'Login' })
            })
            .catch((err) => {
                error.value = err.response.data.error
            })
    }

    const checkAuth = () => {
        if (TokenManager.getToken() && (!isAuthenticated.value && !user.value)) {
            isAuthenticated.value = true
            CheckAuth()
                .then((response) => {
                    user.value = response.data.user
                    if (user.value.role === 'admin') {
                        router.push({ name: 'AdminHome' })
                    }
                    else {
                        router.push({ name: 'UserHome' })
                    }
                })
                .catch((err) => {
                    error.value = err.response.data.error
                })
        }
        else {
            isAuthenticated.value = false
        }
    }

    const deleteAccountByUser = (password) => {
        deleteAccount(password)
            .then((response) => {
                logout()
            })
            .catch((err) => {
                error.value = err.response.data.error
            })
    }

    //Değiştirilecek
    const updateUserDetails = ({ name, email, oldPassword, newPassword, phone, address }) => {
        updateUser({ name, email, oldPassword, newPassword, phone, address })
            .then((response) => {
                user.value = response.data.user
            })
            .catch((err) => {
                error.value = err.response.data.error
            })
    }

    return {
        user,
        isAuthenticated,
        loading,
        error,
        checkAuth,
        login,
        logout,
        signup,
        clearError,
        setLoading,
        deleteAccountByUser,
        updateUserDetails
    }
})