import constants from "../config/app.constants.js";
import * as UserService from "../services/mongodb.user.service.js";

const isValidIntParam = (param, minValue = 1) => {
  const numParam = Number(param ?? minValue - 1);

  return !isNaN(numParam) && numParam >= minValue && numParam % 1 === 0;
};

export const getAllUsers = async (req, res) => {
  let returnStatus = constants.responseStatus.SUCCESSFUL.OK.code;
  let returnObject = {};

  const {
    limit,
    page,
    offset,
    sortByLastName,
    sortByFirstName,
    sortByEmail,
    sortByDateOfBirth,
    firstName,
    lastName,
    email,
  } = req.query;

  const options = {
    customLabels: constants.customPaginationLabels,
  };

  const query = {
    deleted: false,
  };

  options.limit = isValidIntParam(limit) ? Number(limit) : 10;

  options.page = isValidIntParam(page) ? Number(page) : 1;

  if (isValidIntParam(offset, 0)) {
    options.offset = Number(offset);
  }

  if (["asc", "desc"].includes(sortByLastName)) {
    if (options?.sort) {
      options.sort.lastName = sortByLastName === "asc" ? 1 : -1;
    } else {
      options.sort = {
        lastName: sortByLastName === "asc" ? 1 : -1,
      };
    }
  }

  if (["asc", "desc"].includes(sortByFirstName)) {
    if (options?.sort) {
      options.sort.firstName = sortByFirstName === "asc" ? 1 : -1;
    } else {
      options.sort = {
        firstName: sortByFirstName === "asc" ? 1 : -1,
      };
    }
  }

  if (["asc", "desc"].includes(sortByEmail)) {
    if (options?.sort) {
      options.sort.email = sortByEmail === "asc" ? 1 : -1;
    } else {
      options.sort = {
        email: sortByEmail === "asc" ? 1 : -1,
      };
    }
  }

  if (["asc", "desc"].includes(sortByDateOfBirth)) {
    if (options?.sort) {
      options.sort.dateOfBirth = sortByDateOfBirth === "asc" ? 1 : -1;
    } else {
      options.sort = {
        dateOfBirth: sortByDateOfBirth === "asc" ? 1 : -1,
      };
    }
  }

  if (firstName) {
    query.firstName = new RegExp(`${firstName}`, "gi");
  }

  if (lastName) {
    query.lastName = new RegExp(`${lastName}`, "gi");
  }

  if (email) {
    query.email = new RegExp(`${email}`, "gi");
  }

  try {
    const users = await UserService.getAllUsers(query, options);

    if (users?.count > 0) {
      returnObject = users;
      returnObject.status = constants.responseStatus.SUCCESSFUL.OK.name;
    } else {
      returnStatus = constants.responseStatus.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status =
        constants.responseStatus.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error = "No users were found with the provided criteria.";
    }
  } catch (error) {
    returnStatus =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const getUserById = async (req, res) => {
  let returnStatus = constants.responseStatus.SUCCESSFUL.OK.code;
  const returnObject = {};

  const { userId } = req.params;

  try {
    const user = await UserService.getUserById(userId);

    if (user) {
      returnObject.payload = user;
      returnObject.status = constants.responseStatus.SUCCESSFUL.OK.name;
    } else {
      returnStatus = constants.responseStatus.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status =
        constants.responseStatus.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error = "No user was found with the provided Id.";
    }
  } catch (error) {
    returnStatus =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const createUser = async (req, res) => {
  let returnStatus = constants.responseStatus.SUCCESSFUL.CREATED.code;
  const returnObject = {};

  const { body } = req;

  try {
    const newUser = await UserService.createUser(body);

    if (newUser) {
      returnObject.payload = newUser;
      returnObject.status = constants.responseStatus.SUCCESSFUL.CREATED.name;
    } else {
      returnStatus = constants.responseStatus.CLIENT_ERROR.BAD_REQUEST.code;

      returnObject.status =
        constants.responseStatus.CLIENT_ERROR.BAD_REQUEST.name;
      returnObject.error =
        "User could not be created with the provided parameters.";
    }
  } catch (error) {
    returnStatus =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const updateUserById = async (req, res) => {
  let returnStatus = constants.responseStatus.SUCCESSFUL.OK.code;
  const returnObject = {};

  const { userId } = req.params;

  const { body } = req;

  try {
    const updatedUser = await UserService.updateUserById(userId, body);

    if (updatedUser) {
      returnObject.status = constants.responseStatus.SUCCESSFUL.OK.name;
      returnObject.payload = updatedUser;
    } else {
      returnStatus = constants.responseStatus.CLIENT_ERROR.BAD_REQUEST.code;

      returnObject.status =
        constants.responseStatus.CLIENT_ERROR.BAD_REQUEST.name;
      returnObject.error =
        "User could not be updated with the provided parameters.";
    }
  } catch (error) {
    returnStatus =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const deleteUserById = async (req, res) => {
  let returnStatus = constants.responseStatus.SUCCESSFUL.NO_CONTENT.code;
  const returnObject = {};

  const { userId } = req.params;

  try {
    const confirmation = await UserService.deleteUserById(userId);

    returnObject.status = constants.responseStatus.SUCCESSFUL.NO_CONTENT.name;
    returnObject.payload = confirmation;
  } catch (error) {
    returnStatus =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status =
      constants.responseStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};
