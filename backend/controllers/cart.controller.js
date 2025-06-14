import Product from "../models/product.model.js";

// In-memory cart for public, userless backend
let cart = [];

export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: cart.map((item) => item.productId) } });
		const cartItems = cart
			.map((item) => {
				const product = products.find((p) => p._id.toString() === item.productId);
				return product ? { ...product.toJSON(), quantity: item.quantity } : null;
			})
			.filter(Boolean);
		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const existingItem = cart.find((item) => item.productId === productId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({ productId, quantity: 1 });
		}
		res.json(cart);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		cart = [];
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const item = cart.find((item) => item.productId === productId);
		if (item) {
			if (quantity === 0) {
				cart = cart.filter((item) => item.productId !== productId);
			} else {
				item.quantity = quantity;
			}
			res.json(cart);
		} else {
			res.status(404).json({ message: "Product not found in cart" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
