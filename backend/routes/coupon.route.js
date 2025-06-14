import express from "express";
import { getCoupon, validateCoupon, createCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/", createCoupon);
router.get("/", getCoupon);
router.post("/validate", validateCoupon);

export default router;
