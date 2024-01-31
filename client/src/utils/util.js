export const selectedOption = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: "Received", value: 'received'},
    { label: "Prepared", value: 'prepared'},
    { label: "Cargo", value: 'cargo'},
    { label: 'Cancelled', value: 'cancelled' }
]

export const getUpdatedStatus = (status) => {
    switch (status) {
        case 'completed':
            return 'Completed'
        case 'cancelled':
            return 'Cancelled'
        case 'received':
            return 'Received'
        case 'prepared':
            return 'Prepared'
        case 'cargo':
            return 'Cargo'
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
        let day = addLeadingZero(date.getDay());
        let month = addLeadingZero(date.getMonth() + 1);
        let year = date.getFullYear();
        item.createdAt = `${day}-${month}-${year}`;
    });

    return copyData;
}

const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
}

export const convertCurrncy = (value) => {
    return `$${value}`;
}

export const getOrderStatusStyle = (status) => {
    switch (status) {
        case 'received':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
        case 'completed':
            return 'bg-green-100 text-green-800 border border-green-400';
        case 'cancelled':
            return 'bg-red-100 text-red-800 border border-red-400';
        case 'prepared':
            return 'bg-blue-100 text-blue-800 border border-blue-400';
        case 'cargo':
            return 'bg-purple-100 text-purple-800 border border-purple-400';
        default:
            return 'bg-yellow-100 text-yellow-800  border border-yellow-400';
    }
}

export const getImgURL = (image) => {
    return "http://localhost:3000/public/docs/" + image;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

export const validateInputForSubmit = (email, password) => {
    let errorInput = [];
    if (!validateEmail(email)) {
        errorInput = [...errorInput, 'email'];
    }
    else {
        errorInput = errorInput.filter(item => item !== 'email');
    }

    if (!validatePassword(password)) {
        errorInput = [...errorInput, 'password'];
    }
    else {
        errorInput = errorInput.filter(item => item !== 'password');
    }

    return errorInput
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}