import User from "../model/User.js";

export const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteAllUsers();
        res.status(200).json({ message: "All users deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}