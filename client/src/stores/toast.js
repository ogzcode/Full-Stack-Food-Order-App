import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore("toast", () => {
    const show = ref(false)
    const message = ref('')
    const type = ref('success');


    const showToast = (toastType, toastMessage) => {
        if (show.value) return;

        show.value = true
        message.value = toastMessage
        type.value = toastType
    }

    const hideToast = () => {
        show.value = false
        message.value = ''
        type.value = 'success'
    }

    const getToastStyle = () => {
        switch (type.value) {
            case 'success':
                return 'bg-emerald-500'
            case 'error':
                return 'bg-red-500'
            case 'warning':
                return 'bg-amber-500'
            case 'info':
                return 'bg-indigo-500'
            default:
                return 'bg-green-500'
        }
    }

    return {
        show,
        message,
        type,
        showToast,
        hideToast,
        getToastStyle
    }
})