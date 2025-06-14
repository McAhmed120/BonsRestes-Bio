import User from "../models/user.model.js";

export const signup = async (req, res) => {
	const { email, password, name, role } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		// Allow role to be set from request, default to 'customer' if not provided
		const user = await User.create({ name, email, password, role: role || "customer" });

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	// No tokens to clear, just respond
	res.json({ message: "Logged out successfully" });
};

export const refreshToken = async (req, res) => {
	// Token refresh is not supported anymore
	res.status(400).json({ message: "Token refresh is not supported" });
};

export const getProfile = async (req, res) => {
	// No token-based user context, just error
	res.status(401).json({ message: "Not authenticated" });
};
