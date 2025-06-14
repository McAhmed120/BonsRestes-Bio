import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        // Prepare line items for Stripe
        const line_items = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                },
                unit_amount: Math.round(product.price * 100), // Stripe expects cents
            },
            quantity: product.quantity || 1,
        }));

        // Handle coupon if provided
        let discounts = [];
        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
            if (coupon) {
                // Create a Stripe coupon if not already created
                let stripeCouponId = coupon.stripeCouponId;
                if (!stripeCouponId) {
                    const stripeCoupon = await stripe.coupons.create({
                        percent_off: coupon.discountPercentage,
                        duration: "once",
                    });
                    coupon.stripeCouponId = stripeCoupon.id;
                    await coupon.save();
                    stripeCouponId = stripeCoupon.id;
                }
                // Check if a promotion code with this code already exists
                let promoCode;
                const existingPromos = await stripe.promotionCodes.list({ code: coupon.code, active: true });
                if (existingPromos.data && existingPromos.data.length > 0) {
                    promoCode = existingPromos.data[0];
                } else {
                    promoCode = await stripe.promotionCodes.create({
                        coupon: stripeCouponId,
                        code: coupon.code,
                        max_redemptions: 1,
                    });
                }
                discounts.push({ promotion_code: promoCode.id });
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            discounts,
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
        });

        res.status(200).json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ message: "Error creating Stripe checkout session", error: error.message });
    }
};

export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ message: "Missing sessionId" });
        }
        // Fetch session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
        if (!session || session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment not completed" });
        }
        // Mark coupon as used if promo code was applied
        if (session.total_details && session.total_details.amount_discount > 0 && session.discounts && session.discounts.length > 0) {
            const promo = await stripe.promotionCodes.retrieve(session.discounts[0].promotion_code);
            if (promo && promo.code) {
                await Coupon.findOneAndUpdate(
                    { code: promo.code },
                    { isActive: false }
                );
            }
        }
        // Create order in DB
        const newOrder = new Order({
            products: session.line_items.data.map(item => ({
                product: item.description || item.price.product, // fallback if no description
                quantity: item.quantity,
                price: item.amount_total / 100,
            })),
            totalAmount: session.amount_total / 100,
            stripeSessionId: sessionId,
        });
        await newOrder.save();
        res.status(200).json({
            success: true,
            message: "Payment successful, order created, and coupon deactivated if used.",
            orderId: newOrder._id,
        });
    } catch (error) {
        console.error("Error processing successful checkout:", error);
        res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
};

// Remove all Stripe-related helpers
async function createNewCoupon() {
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
    });
    await newCoupon.save();
    return newCoupon;
}
