import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  // @hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useSelector((state) => {
    return {
      token: state.auth.token,
      loading: state.auth.loading,
      error: state.auth.error,
    };
  });

  console.log(error);
  // @redirect
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full h-full bg-slate-200 flex flex-row justify-center items-center">
      <div className="w-1/3 h-fit bg-white shadow-sm rounded px-10 py-10 relative flex flex-col items-center">
        <h1 className="mb-10 w-full text-left text-4xl">Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(login(values));
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting, errors, touched, values }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input input-bordered w-full"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />

                <ul className="mb-2 text-xs mt-2">
                  <li
                    className={`${
                      values.password && values.password.length >= 6
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Password must be at least 6 characters.
                  </li>
                  <li
                    className={`${
                      values.password && /[a-z]/.test(values.password)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Password must contain at least one lowercase letter.
                  </li>
                  <li
                    className={`${
                      values.password && /[A-Z]/.test(values.password)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Password must contain at least one uppercase letter.
                  </li>
                  <li
                    className={`${
                      values.password && /[0-9]/.test(values.password)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Password must contain at least one digit.
                  </li>
                  <li
                    className={`${
                      values.password && /[^a-zA-Z0-9]/.test(values.password)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Password must contain at least one special character.
                  </li>
                </ul>
              </div>

              {errors.message && (
                <div className="alert alert-error mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errors.message}</span>
                </div>
              )}

              {error && (
                <div className="alert alert-error mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-secondary w-full"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span className="loading loading-spinner"></span>
                ) : null}
                Login
              </button>
              <h1 className="mt-5 text-center">
                Belum punya akun ?{" "}
                <a
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </h1>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
