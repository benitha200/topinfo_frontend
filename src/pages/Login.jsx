// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import API_URL from "../constants/Constants";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "*/*",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await response.json();

//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("token", data.token);

//       if (rememberMe) {
//         localStorage.setItem("rememberMe", "true");
//       }

//       // Role-based navigation
//       if (data.user.role === "ADMIN") {
//         navigate("/dashboard");
//       } else if (data.user.role === "AGENT" && data.user.isSuperAgent) {
//         navigate("/agent-dashboard/payments-super-agent");
//       } else if (data.user.role === "AGENT") {
//         navigate("/agent-dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       setError("Login failed. Please check your credentials and try again.");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-sky-100 transform transition-all hover:scale-105 duration-300 ease-in-out">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-sky-800 mb-2">
//             Murakaza Neza
//           </h2>
//           <p className="text-md text-gray-600 font-light">
//             Injira kugira ngo ubone serivisi zacu
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200 animate-pulse">
//               {error}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Imeyili yawe
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-sky-400" />
//               </div>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
//                 placeholder="urugero@gmail.com"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Ijambo ry'ibanga
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-sky-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-sky-500" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-sky-500" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded transition duration-300"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-gray-700"
//               >
//                 Unyibuke
//               </label>
//             </div>

//             <div className="text-sm">
//               <Link
//                 to="/forgot-password"
//                 className="font-medium text-sky-600 hover:text-sky-500 transition-colors duration-300"
//               >
//                 Wibagiwe ijambo ry'ibanga?
//               </Link>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
//           >
//             Injira
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import API_URL from "../constants/Constants";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Role-based navigation
      if (data.user.role === "ADMIN") {
        navigate("/dashboard");
      } else if (data.user.role === "AGENT" && data.user.isSuperAgent) {
        navigate("/agent-dashboard/payments-super-agent");
      } else if (data.user.role === "AGENT") {
        navigate("/agent-dashboard");
      } else if (data.user.role === "OPERATIONS") {
        navigate("/operations-dashboard");
      }else if(data.user.role==="CUSTOMER_SUPPORT"){
        navigate("/cutomer-support-dashboard")
      }
      else {
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-sky-100 transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-800 mb-2">
            Murakaza Neza
          </h2>
          <p className="text-md text-gray-600 font-light">
            Injira kugira ngo ubone serivisi zacu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200 animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone yawe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-sky-400" />
              </div>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                placeholder="25078xxxxxxx"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Ijambo ry'ibanga
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-sky-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-sky-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-sky-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded transition duration-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Unyibuke
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-sky-600 hover:text-sky-500 transition-colors duration-300"
              >
                Wibagiwe ijambo ry'ibanga?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Injira
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
