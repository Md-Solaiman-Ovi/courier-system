// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../features/auth/authSlice";
// import type { AppDispatch, RootState } from "../redux/store";
// import loginImg from "../assets/login.avif";

// interface LoginFormInputs {
//   email: string;
//   password: string;
// }

// const schema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6).required("Password is required"),
// });

// const Login: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data: LoginFormInputs) => {
//     dispatch(loginUser(data));
//     console.log("login successfull", data);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-teal-900 px-4">
//       <div className="bg-slate-200 shadow-2xl rounded-2xl flex max-w-4xl w-full overflow-hidden">
//         {/* Illustration Section */}
//         <div className="w-1/2 bg-gradient-to-br from-purple-500 to-teal-600 text-white p-8 hidden md:flex flex-col justify-center items-center">
//           <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
//           <p className="text-lg text-center max-w-sm">
//             Login to access dashboard and explore your control panel.
//           </p>
//           <img
//             src={loginImg}
//             alt="Login Illustration"
//             className="w-64 mt-8 rounded
//             "
//           />
//         </div>

//         {/* Login Form Section */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
//             Login
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} noValidate>
//             <div className="mb-4">
//               <label className="block mb-1">Email</label>
//               <input
//                 type="email"
//                 {...register("email")}
//                 className={`w-full border px-3 py-2 rounded ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1">Password</label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 className={`w-full border px-3 py-2 rounded ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//           {error && <p className="mt-3 text-red-600">{error}</p>}
//           <p className="text-sm text-gray-500 text-center mt-6">
//             Forgot your password?{" "}
//             <a href="#" className="text-red-500 hover:underline">
//               Reset here
//             </a>
//           </p>
//           <p className="text-center">
//             Create new account?{" "}
//             <a href="/register" className="text-green-500 hover:underline">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, loginUser } from "../features/auth/authSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.avif";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, user, success } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  // Show toast on success and redirect
  useEffect(() => {
    if (success && user) {
      toast.success("✅ Login successful!");
      if (user.role == "admin") {
        navigate("/admin");
      } else if (user.role == "agent") {
        navigate("/agent");
      } else {
        navigate("/customer");
      }
      // or use `user.role` to redirect dynamically
      dispatch(clearAuthState()); // prevent repeated redirects
    }
  }, [success, user, navigate, dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(`❌ ${error}`);
      dispatch(clearAuthState());
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-teal-900 px-4">
      <div className="bg-slate-200 shadow-2xl rounded-2xl flex max-w-4xl w-full overflow-hidden">
        {/* Illustration Section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-teal-600 text-white p-8 hidden md:flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg text-center max-w-sm">
            Login to access dashboard and explore your control panel.
          </p>
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-64 mt-8 rounded"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Forgot your password?{" "}
            <a href="#" className="text-red-500 hover:underline">
              Reset here
            </a>
          </p>
          <p className="text-center mt-2">
            Create new account?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
