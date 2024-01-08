import User from "../model/User.js";
import { getUserExtraData } from "../utils/util.js";

export const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteAllUsers();
        res.status(200).json({ message: "All users deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     summary: Get all users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   username: example_user
 *                   email: user@example.com
 *                   firstName: John
 *                   lastName: Doe
 *                   phone: 123456789
 *                   role: user || admin
 *                   orderCount: 0
 *                   createdAt: "2021-05-17T15:53:00.000Z"
 *       401:
 *         description: Unauthorized - Only admin users can perform this action.
 *         content:
 *           application/json:
 *             example:
 *               error: You are not authorized to perform this action.
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
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

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully.
 *       401:
 *         description: Unauthorized - Only admin users can perform this action.
 *         content:
 *           application/json:
 *             example:
 *               error: You are not authorized to perform this action.
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
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

/**
 * @swagger
 * /user/deleteAccount/{password}:
 *   delete:
 *     summary: Delete the user account.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: password
 *         description: User's current password.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Account deleted successfully.
 *       401:
 *         description: Unauthorized - Invalid password.
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid password.
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
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

/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     summary: Update user information.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User information to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User updated successfully.
 *               user:
 *                 id: 1
 *                 email: updated_user@example.com
 *                 name: John Doe
 *                 role: user
 *                 userHasExtraData: true || false
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
export const updateUser = async (req, res) => {
    const { username, firstName, lastName, email, phone, address } = req.body;
    try {
        const updatedUser = await User.updateUserById(req.user.id, username, email, firstName, lastName, phone, address);

        res.status(200).json({
            message: "User updated successfully.",
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                role: updatedUser.role,
                userHasExtraData: getUserExtraData(updatedUser),
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * @swagger
 * /user/updatePassword:
 *   put:
 *     summary: Change user password.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User's old and new passwords.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password updated successfully.
 *       401:
 *         description: Unauthorized - Invalid old password.
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid password.
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
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

/**
 * @swagger
 * /user/getUserDetails:
 *   get:
 *     summary: Get user details.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 username: john_doe
 *                 email: john@example.com
 *                 phone: 123456789
 *                 address: Example Street
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findUserById(req.user.id);
        res.status(200).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * @swagger
 * /user/updateAdminPassword:
 *   put:
 *     summary: Update admin password.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Admin's old and new passwords.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password updated successfully.
 *       401:
 *         description: Unauthorized - Invalid old password or user is not an admin.
 *         content:
 *           application/json:
 *             example:
 *               error: You are not authorized to perform this action or Invalid password.
 *       400:
 *         description: Bad request or error during the operation.
 *         content:
 *           application/json:
 *             example:
 *               error: Error message details.
 */
export const updateAdminPassword = async (req, res) => {
    const { newPassword, oldPassword } = req.body;

    const userDetails = req.user;

    const user = await User.findUserById(userDetails.id);

    if (user.role !== "admin") {
        return res.status(401).json({ error: "You are not authorized to perform this action." });
    }

    try {
        const user = await User.checkPassword(userDetails.id, oldPassword);

        if (!user) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const updatedUser = await User.updateUserPassword(userDetails.id, newPassword);

        res.status(200).json({ message: "Password updated successfully." });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}