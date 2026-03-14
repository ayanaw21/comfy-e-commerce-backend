import bcrypt from "bcryptjs";
import User from "../models/user.model.ts";
import type { IUser } from "../models/user.model.ts";
export const register = async (userData: IUser) => {
	const email = userData.email;
	const userExists = await User.exists({ email });
	if (userExists) throw new Error("user already exists");

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(userData.password, salt);

	const newUser = new User({
		username: userData.username,
		password: hashedPassword,
		email: userData.email,
	});

	await newUser.save();
	return newUser;
};

export const login = async (userData: IUser) => {
	const { email, password } = userData;
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid credentials");
	const isPasswordMatch = await bcrypt.compare(
		password as string,
		user.password,
	);

	if (!isPasswordMatch) throw new Error("Invalid credentials");

	return user;
};
