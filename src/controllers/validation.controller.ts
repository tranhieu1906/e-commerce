import joi, { string } from "joi";

export const userValidate = (data) => {
  const userSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    name: joi.string().required(),
    password: joi.string().min(4).max(32).required(),
  });
  return userSchema.validate(data);
};
