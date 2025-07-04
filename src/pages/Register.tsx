import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { registerUser } from "../features/authSlice";
import type { AppDispatch, RootState } from "../redux/store";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  role: yup
    .string()
    .oneOf([
      "customer",
      "agent",
      // "admin"
    ])
    .required("Role is required"),
});

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: "customer" | "agent";
  // | "admin";
}

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({ resolver: yupResolver(schema) });

  const onSubmit = (data: RegisterForm) => {
    dispatch(registerUser(data));
    reset();
  };

  useEffect(() => {
    if (user && !loading && !error) {
      toast.success("🎉 Account created successfully!");
    }
  }, [user, loading, error, reset, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`❌ ${error}`);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-teal-900 px-4">
      <div className="bg-slate-200 shadow-2xl rounded-2xl flex max-w-4xl w-full overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-teal-600 text-white p-8 hidden md:flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg text-center max-w-sm">
            Create your account to unlock full access. We're excited to have you
            onboard!
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                {...register("name")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Select Role</label>
              <select
                {...register("role")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
                {/* <option value="admin">Admin</option> */}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
