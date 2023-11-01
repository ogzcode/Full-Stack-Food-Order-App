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

export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }