import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TokenManager from '../services/tokenServices'
import { Login, Register } from '../services/requestServices'

export const useAuth = defineStore('auth', () => {
    const router = useRouter()
    const user = ref(null)
    const isAuthenticated = ref(false)
    const error = ref(null)

    const clearError = () => {
        error.value = null
    }

    const login = ({ email, password }) => {
        Login({ email, password })
            .then((response) => {
                console.log(response)
                TokenManager.saveToken(response.data.token)
                user.value = response.data.user
                isAuthenticated.value = true
                router.push({ name: 'AdminHome' })
            })
            .catch((err) => {
                console.log(err)
                error.value = err.response.data.error
            })
    }

    const logout = () => {
        TokenManager.removeToken()
        user.value = null
        isAuthenticated.value = false
        router.push({ name: 'Login' })
    }

    const register = ({ email, password, fullName }) => {
        Register({ email, password, fullName })
            .then((response) => {
                console.log(response)
                router.push({ name: 'Login' })
            })
            .catch((err) => {
                error.value = err.response.data.error
            })
    }

    const checkAuth = () => {
        if (TokenManager.getToken() && !isAuthenticated.value) {
            isAuthenticated.value = true
        }
        else {
            isAuthenticated.value = false
        }
    }

    return {
        user,
        isAuthenticated,
        error,
        checkAuth,
        login,
        logout,
        register,
        clearError
    }
})