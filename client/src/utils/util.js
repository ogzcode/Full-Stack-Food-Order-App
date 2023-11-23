export const selectedOption = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' }
]

export const getUpdatedStatus = (status) => {
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

export const formatDateAndGetData = (data) => {
    const copyData = [...data];

    copyData.forEach((item) => {
        const date = new Date(item.createdAt);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        item.createdAt = `${day}-${month}-${year}`;
    });

    return copyData;
}

export const convertCurrncy = (value) => {
    return `$${value}`;
}

export const getOrderStatusStyle = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-yellow-100 text-yellow-800';
    }
}