import User from "../model/User.js";

export const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteAllUsers();
        res.status(200).json({ message: "All users deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    const userDetails = req.user;

    const user = await User.findUserById(userDetails.id);

    if (user.role !== "admin") {
        return res.status(401).json({ error: "You are not authorized to perform this action." });
    }

    try {
        const users = await User.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteUserById = async (req, res) => {
    const userDetails = req.user;
    const { id } = req.params;

    const user = await User.findUserById(userDetails.id);

    if (user.role !== "admin") {
        return res.status(401).json({ error: "You are not authorized to perform this action." });
    }

    try {
        await User.deleteUserById(parseInt(id));
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    const userDetails = req.user;
    const { password } = req.params;

    try {

        const user = await User.findUserByEmailAndPassword({ email: userDetails.email, password: password });

        if (!user) {
            return res.status(401).json({ error: "Invalid password." });
        }

        await User.deleteUserById(userDetails.id);
        res.status(200).json({ message: "Account deleted successfully." });

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}