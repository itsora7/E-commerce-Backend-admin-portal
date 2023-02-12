import AdminUserSchema from "./AdminUserSchema.js";

//create new user
export const createAdmin = (obj) => {
  return AdminUserSchema(obj).save();
};

//find user by fitler. @filter must be an object
export const findAdmin = (filter) => {
  return AdminUserSchema.findOne(filter);
};
