import UserModel, { validUserRoles } from "../models/mongodb.user.model.js";

const sanitizeOutput = (input) => {
  return {
    id: input._id,
    email: input.email,
    firstName: input.firstName,
    middleName: input?.middleName || null,
    lastName: input.lastName,
    gender: input.gender,
    dob: input.dateOfBirth,
    age: input.age,
    roles: input.roles.filter((role) => role !== "admin"),
    isAdmin: input.roles.includes("admin") ? true : false,
  };
};

export const getAllUsers = async (query, options) => {
  try {
    const users = await UserModel.paginate(query, options);

    if (users.count > 0) {
      users.payload.forEach((user, index, original) => {
        const sanitizedUser = sanitizeOutput(user);
        original.splice(index, 1, sanitizedUser);
      });
    }

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    return sanitizeOutput(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email: email });

    return sanitizeOutput(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (data) => {
  try {
    const newUser = await UserModel.create(data);

    return sanitizeOutput(newUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserById = async (userId, data) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return sanitizeOutput(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserByEmail = async (email, data) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      data,
      {
        new: true,
      }
    );

    return sanitizeOutput(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addRoleToUser = async (userId, role) => {
  try {
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      throw new Error(`User with Id ${userId} not found.`);
    }

    if (!existingUser.roles.includes(role) && validUserRoles.includes(role)) {
      existingUser.roles.push(role);
    }

    const updatedUser = await existingUser.save();

    return sanitizeOutput(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeRoleFromUser = async (userId, role) => {
  try {
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      throw new Error(`User with Id ${userId} not found.`);
    }

    const roleIndex = existingUser.roles.indexOf(role);

    if (roleIndex !== -1) {
      existingUser.roles.splice(roleIndex, 1);
    }

    if (existingUser.roles.length < 1) {
      existingUser.roles.push("user");
    }

    const updatedUser = await existingUser.save();

    return sanitizeOutput(updatedUser);
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
