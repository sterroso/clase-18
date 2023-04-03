import UserModel from "../models/mongodb.user.model.js";

export const getAllUsers = async (query, options) => {
  try {
    return await UserModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    return await UserModel.findById(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserById = async (userId, data) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserByEmail = async (email, data) => {
  try {
    return await UserModel.findOneAndUpdate({ email: email }, data, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserById = async (userId) => {
  try {
    return await UserModel.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserByEmail = async (email) => {
  try {
    return await UserModel.findOneAndDelete({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }
};
