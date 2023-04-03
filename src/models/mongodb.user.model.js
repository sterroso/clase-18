import { Schema, model } from "mongoose";
import { differenceInYears } from "date-fns";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Must provide the user's e-mail."],
      unique: true,
      minLength: [6, "E-mail address too short!"],
    },
    password: {
      type: String,
      required: [true, "Must provide a secure password for the user."],
    },
    firstName: {
      type: String,
      required: [true, "Must provide the user's first name."],
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: [true, "Must provide the user's last name."],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "not specified"],
      default: "not specified",
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Must provide a valid date of birth."],
      validate: {
        validator: (value) => {
          return differenceInYears(new Date(), value) >= 18;
        },
        message: () => "User must be 18 years old, at least!",
      },
    },
    roles: {
      type: [String],
      required: true,
      default: ["user"],
    },
  },
  {
    timestamps: true,
    virtuals: {
      age: {
        get() {
          return differenceInYears(new Date(), this.dateOfBirth);
        },
      },
    },
  }
);

userSchema.plugin(MongoosePaginate);

userSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

const UserModel = model("Users", userSchema);

export default UserModel;
