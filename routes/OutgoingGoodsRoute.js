import express from "express";
import { createOutgoingGoods, getOutgoingGoods } from "../controllers/OutgoingGoods.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/outgoing-goods', verifyUser, createOutgoingGoods);
router.get('/outgoing-goods', verifyUser, getOutgoingGoods);

export default router;
