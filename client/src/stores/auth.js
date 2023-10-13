import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TokenManager from '../services/tokenServices'
import { Login, Register, CheckAuth, deleteAccount, updateUser } from '../services/requestServices'

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
                console.log(err)
                error.value = err.response?.data.error
            })
    }

    const logout = () => {
        TokenManager.destroyToken()
        user.value = null
        isAuthenticated.value = false
        router.push({ name: 'Login' })
    }

    const signup = ({ email, password, fullName }) => {
        Register({ email, password, name: fullName })
            .then((response) => {
                router.push({ name: 'Login' })
            })
            .catch((err) => {
                console.log(err)
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
                    console.log(err)
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
                console.log(response)
                logout()
            })
            .catch((err) => {
                console.log(err)
                error.value = err.response.data.error
            })
    }

    const updateUserDetails = ({ name, email, oldPassword, newPassword, phone, address }) => {
        updateUser({ name, email, oldPassword, newPassword, phone, address })
            .then((response) => {
                user.value = response.data.user
            })
            .catch((err) => {
                console.log(err)
                error.value = err.response.data.error
            })
    }

    return {
        user,
        isAuthenticated,
        error,
        checkAuth,
        login,
        logout,
        signup,
        clearError,
        deleteAccountByUser,
        updateUserDetails
    }
})