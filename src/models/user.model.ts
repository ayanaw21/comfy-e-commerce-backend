import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
	email: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
		},
		
	},
	{ timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
