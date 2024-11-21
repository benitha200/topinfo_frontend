// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//       email: '',
//       password: ''
//     });
    
//     const [showPassword, setShowPassword] = useState(false);
//     const [rememberMe, setRememberMe] = useState(false);
//     const [error, setError] = useState('');
  
//     const handleInputChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError('');
      
//       try {
//         const response = await fetch('http://localhost:3050/api/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': '*/*'
//           },
//           body: JSON.stringify({
//             email: formData.email,
//             password: formData.password
//           })
//         });

//         if (!response.ok) {
//           throw new Error('Login failed');
//         }

//         const data = await response.json();
        
//         // Store user data and token in localStorage
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('token', data.token);

//         // Optional: Store remember me preference
//         if (rememberMe) {
//           localStorage.setItem('rememberMe', 'true');
//         }

//         // Redirect to dashboard or home page
//         navigate('/dashboard'); // Update this to your desired route
        
//       } catch (err) {
//         setError('Login failed. Please check your credentials and try again.');
//         console.error('Login error:', err);
//       }
//     };
  
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 text-center">Murakaza Neza</h2>
//             <p className="mt-2 text-center text-gray-600">
//               Injira kugira ngo ubone serivisi zacu
//             </p>
//           </div>
  
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Imeyili yawe
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="urugero@gmail.com"
//                   required
//                 />
//               </div>
//             </div>
  
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Ijambo ry'ibanga
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>
  
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                   Unyibuke
//                 </label>
//               </div>
  
//               <div className="text-sm">
//                 <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
//                   Wibagiwe ijambo ry'ibanga?
//                 </Link>
//               </div>
//             </div>
  
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//             >
//               Injira
//             </button>
//           </form>
//         </div>
//       </div>
//     );
// };
  
// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      
      try {
        const response = await fetch('http://localhost:3050/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        // Optional: Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        console.log('user role');
        console.log(data.user.role);

        // Role-based navigation
        if (data.user.role === 'ADMIN') {
          navigate('/dashboard');
        } else if (data.user.role === 'AGENT') {
          navigate('/agent-dashboard');
        } else {
          navigate('/'); // Default redirect for other roles
        }
        
      } catch (err) {
        setError('Login failed. Please check your credentials and try again.');
        console.error('Login error:', err);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center">Murakaza Neza</h2>
            <p className="mt-2 text-center text-gray-600">
              Injira kugira ngo ubone serivisi zacu
            </p>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Imeyili yawe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="urugero@gmail.com"
                  required
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Ijambo ry'ibanga
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Unyibuke
                </label>
              </div>
  
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Wibagiwe ijambo ry'ibanga?
                </Link>
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Injira
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;