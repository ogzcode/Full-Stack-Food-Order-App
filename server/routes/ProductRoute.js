import express from "express";

import { docMiddleware } from "../middleware/docMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    createAndUpdateProduct,
    getAllProducts,
    deleteProduct,
    getProductForUser,
    setProductFavority,
} from "../controller/ProductController.js";

const router = express.Router();

router.post("/createAndUpdate", authMiddleware, docMiddleware.single("image"), createAndUpdateProduct);
router.get("/all", getAllProducts);
router.delete("/delete/:id", authMiddleware, deleteProduct);
router.get("/user", authMiddleware, getProductForUser);
router.post("/setFavority", authMiddleware, setProductFavority);

export default router;