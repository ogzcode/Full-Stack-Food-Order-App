export const getUserExtraData = (user) => {
    const { firstName, lastName, phone, address } = user
    return firstName !== "" && lastName !== "" && phone !== "" && address !== ""
}
