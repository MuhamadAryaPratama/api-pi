import express from "express";
import { createIncomingGoods, getIncomingGoods } from "../controllers/IncomingGoods.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/incoming-goods', verifyUser, createIncomingGoods);
router.get('/incoming-goods', verifyUser, getIncomingGoods);

export default router;
