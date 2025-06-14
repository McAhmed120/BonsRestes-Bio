import Coupon from "../models/coupon.model.js";


export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, expirationDate, isActive } = req.body;
        const coupon = await Coupon.create({
            code,
            discountPercentage,
            expirationDate,
            isActive: isActive !== undefined ? isActive : true,
        });
        res.status(201).json(coupon);
    } catch (error) {
        console.log("Error in createCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCoupon = async (req, res) => {
	try {
		// No req.user, so get coupon for all users (or adjust logic as needed)
		const coupon = await Coupon.findOne({ isActive: true });
		res.json(coupon || null);
	} catch (error) {
		console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;
		const coupon = await Coupon.findOne({ code: code, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save();
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
			expirationDate: coupon.expirationDate,
			isActive: coupon.isActive,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


