import mongoose from 'mongoose';

// creating a schema
const UserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	authentication: {
		// using select false doesnt return all users
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});

// creating a model
export const UserModal = mongoose.model('User', UserSchema);

// creating actions
export const getUsers = () => UserModal.find()
export const getUserByEmail = (email: string) => UserModal.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) =>  UserModal.findOne({
    'authentication.sessionToken': sessionToken
})
export const getUserById = (id: string) => UserModal.findById(id)
// creates a new user and stores in in the db and returns user as an object
export const createUser = (values: Record<string, any>) => new UserModal(values)
    .save().then((user) => user.toObject())
export const deleteUserById = (id: string) => UserModal.findByIdAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModal.findByIdAndUpdate(id, values)