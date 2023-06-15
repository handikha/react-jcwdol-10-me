import * as Yup from "yup";

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "username must be at least 6 characters.")
    .max(20, "username must be less than 20 characters.")
    .required("username is required."),
  email: Yup.string().email("email must be a valid email."),
  password: Yup.string()
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
    .required("password is required."),
  rePassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match."
  ),
});

// @login validation
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters.")
    .max(20, "Username must be less than 20 characters.")
    .required("Username is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .required("Password is required."),
});
