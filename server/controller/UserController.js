import User from "../model/User.js";

export const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteAllUsers();
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

        const user = await User.chekcPassword(userDetails.id, password);

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

export const updateUser = async (req, res) => {
    const { name, email, oldPassword, newPassword, phone, address } = req.body;
    try {
        const user = await User.checkPassword(req.user.id, oldPassword);
        const updatedUser = await User.updateUserById(req.user.id, name, email, newPassword, phone, address);

        res.status(200).json({ message: "User updated successfully.", user: updatedUser });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const changePassword = async (req, res) => {
    const { newPassword, oldPassword } = req.body;

    try {
        const user = await User.checkPassword(req.user.id, oldPassword);

        if (!user) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const updatedUser = await User.updateUserPassword(req.user.id, newPassword);

        res.status(200).json({ message: "Password updated successfully." });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
