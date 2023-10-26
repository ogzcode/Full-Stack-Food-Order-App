export const selectedOption = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Canceled', value: 'canceled' }
]

export const getUpdedatedStatus = (status) => {
    switch (status) {
        case 'completed':
            return 'Completed'
        case 'pending':
            return 'Pending'
        case 'canceled':
            return 'Canceled'
        default:
            return 'Pending'
    }
}