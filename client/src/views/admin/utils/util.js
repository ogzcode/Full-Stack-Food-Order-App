export const getOrderStatusStyle = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Processing':
            return 'bg-blue-100 text-blue-800';
        case 'Completed':
            return 'bg-green-100 text-green-800';
        case 'Canceled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-yellow-100 text-yellow-800';
    }
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