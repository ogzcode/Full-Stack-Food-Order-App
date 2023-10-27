export const selectedOption = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' }
]

export const getUpdedatedStatus = (status) => {
    switch (status) {
        case 'completed':
            return 'Completed'
        case 'pending':
            return 'Pending'
        case 'cancelled':
            return 'Cancelled'
        default:
            return 'Pending'
    }
}