import express from "express";

import { docMiddleware } from "../middleware/docMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAndUpdateProduct, getAllProducts, deleteProduct} from "../controller/ProductController.js";

const router = express.Router();

router.post("/createAndUpdate", authMiddleware, docMiddleware.single("image"), createAndUpdateProduct);
router.get("/all", getAllProducts);
router.delete("/delete/:id", authMiddleware, deleteProduct);

export default router;