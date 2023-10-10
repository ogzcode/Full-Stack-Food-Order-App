import express from "express";

import { docMiddleware } from "../middleware/docMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createProduct, getAllProducts } from "../controller/ProductController.js";

const router = express.Router();

router.post("/create", authMiddleware, docMiddleware.single("image"), createProduct);
router.get("/all", getAllProducts);

export default router;