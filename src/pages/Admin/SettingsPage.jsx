// import React, { useState, useEffect } from 'react';
// import {
//     User,
//     Bell,
//     Shield,
//     Globe,
//     Mail,
//     Smartphone,
//     Key,
//     Save,
//     DollarSign,
//     Mail as MailIcon,
//     CheckCircle2,
//     Coins
// } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import AdminLayout from './AdminLayout';
// import { toast } from 'sonner';
// import API_URL from '../../constants/Constants';
// import { apiService } from '../../services/apiService';

// const SettingsPage = () => {
//     const [settings, setSettings] = useState({
//         support_email: 'support@topinfo.rw',
//         categoryPrices: [] // Array to store category-specific prices
//     });
//     const [categories, setCategories] = useState([]);
//     const [isEdited, setIsEdited] = useState(false);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//     // Fetch initial settings and categories
//     useEffect(() => {
//         // const fetchData = async () => {
//         //     try {
//         //         // Fetch service categories
//         //         const categoriesData = await apiService.getServiceCategories();
//         //         setCategories(categoriesData);

//         //         // Fetch settings
//         //         const myHeaders = new Headers();
//         //         myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

//         //         const requestOptions = {
//         //             method: "GET",
//         //             headers: myHeaders,
//         //             redirect: "follow"
//         //         };

//         //         const response = await fetch(`${API_URL}/settings`, requestOptions);
//         //         const result = await response.json();

//         //         // Transform the settings data to include categories
//         //         const categoryPrices = result.categoryPrices || categoriesData.map(cat => ({
//         //             category_id: cat.id,
//         //             client_price: 2000,
//         //             provider_price: 3000
//         //         }));

//         //         setSettings({
//         //             ...result,
//         //             categoryPrices
//         //         });
//         //     } catch (error) {
//         //         console.error('Failed to fetch data:', error);
//         //         toast.error('Failed to load settings');
//         //     }
//         // };

//         // In the useEffect of your SettingsPage component
//         const fetchData = async () => {
//             try {
//                 // Fetch service categories
//                 const categoriesData = await apiService.getServiceCategories();
//                 setCategories(categoriesData);

//                 // Fetch settings
//                 const myHeaders = new Headers();
//                 myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

//                 const requestOptions = {
//                     method: "GET",
//                     headers: myHeaders,
//                     redirect: "follow"
//                 };

//                 const response = await fetch(`${API_URL}/settings`, requestOptions);
//                 const result = await response.json();

//                 // Transform the settings data to include categories
//                 const categoryPrices = result.categoryPrices || categoriesData.map(cat => ({
//                     category_id: cat.id,
//                     client_price: result.client_price || 2000,
//                     provider_price: result.provider_price || 3000
//                 }));

//                 setSettings({
//                     ...result,
//                     categoryPrices
//                 });
//             } catch (error) {
//                 console.error('Failed to fetch data:', error);
//                 toast.error('Failed to load settings');
//             }
//         };
//         fetchData();
//     }, []);

//     // const handlePriceChange = (categoryId, priceType, value) => {
//     //     setSettings(prev => ({
//     //         ...prev,
//     //         categoryPrices: prev.categoryPrices.map(price =>
//     //             price.category_id === categoryId
//     //                 ? { ...price, [priceType]: Number(value) }
//     //                 : price
//     //         )
//     //     }));
//     //     setIsEdited(true);
//     // };

    
//     const handlePriceChange = (categoryId, priceType, value) => {
//         setSettings(prev => ({
//           ...prev,
//           categoryPrices: prev.categoryPrices.map(price =>
//             price.category_id === categoryId
//               ? { 
//                   ...price, 
//                   [priceType]: Number(value),
//                   category_id: categoryId // Ensure category ID is preserved
//                 }
//               : price
//           )
//         }));
//         setIsEdited(true);
//       };
      
//       const handleSaveSettings = async () => {
//         try {
//           const myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/json");
//           myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      
//           const raw = JSON.stringify({
//             support_email: settings.support_email,
//             categoryPrices: settings.categoryPrices.map(price => ({
//               category_id: price.category_id,
//               client_price: price.client_price,
//               provider_price: price.provider_price
//             }))
//           });
      
//           const requestOptions = {
//             method: "PUT",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//           };
      
//           const response = await fetch(`${API_URL}/settings`, requestOptions);
//           const result = await response.json();
      
//           setShowSuccessMessage(true);
//           setTimeout(() => {
//             setShowSuccessMessage(false);
//           }, 3000);
      
//           toast.success('Settings updated successfully');
//           setIsEdited(false);
//           setSettings(result);
//         } catch (error) {
//           console.error('Failed to update settings:', error);
//           toast.error('Failed to update settings');
//         }
//       };
    
//     const handleEmailChange = (e) => {
//         setSettings(prev => ({
//             ...prev,
//             support_email: e.target.value
//         }));
//         setIsEdited(true);
//     };

//     // const handleSaveSettings = async () => {
//     //     try {
//     //         const myHeaders = new Headers();
//     //         myHeaders.append("Content-Type", "application/json");
//     //         myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

//     //         const raw = JSON.stringify({
//     //             support_email: settings.support_email,
//     //             categoryPrices: settings.categoryPrices
//     //         });

//     //         const requestOptions = {
//     //             method: "PUT",
//     //             headers: myHeaders,
//     //             body: raw,
//     //             redirect: "follow"
//     //         };

//     //         const response = await fetch(`${API_URL}/settings`, requestOptions);
//     //         const result = await response.json();

//     //         setShowSuccessMessage(true);
//     //         setTimeout(() => {
//     //             setShowSuccessMessage(false);
//     //         }, 3000);

//     //         toast.success('Settings updated successfully');
//     //         setIsEdited(false);
//     //         setSettings(result);
//     //     } catch (error) {
//     //         console.error('Failed to update settings:', error);
//     //         toast.error('Failed to update settings');
//     //     }
//     // };

//     return (
//         <AdminLayout>
//             {showSuccessMessage && (
//                 <div className="fixed top-4 right-4 z-50">
//                     <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//                         <CheckCircle2 className="mr-2 h-5 w-5" />
//                         Settings updated successfully!
//                     </div>
//                 </div>
//             )}

//             <div className="p-6 space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold">Settings</h1>
//                     <button
//                         onClick={handleSaveSettings}
//                         disabled={!isEdited}
//                         className={`px-4 py-2 rounded flex items-center 
//                             ${isEdited
//                                 ? 'bg-sky-500 text-white hover:bg-sky-600'
//                                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                             }`}
//                     >
//                         <Save className="h-4 w-4 mr-2" />
//                         Save Changes
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6">
//                     {/* Category-specific Pricing Settings */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <Coins className="h-5 w-5 mr-2 text-green-500" />
//                                 Service Category Pricing
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                             {categories.map(category => (
//                                 <div key={category.id} className="border-b pb-4 last:border-0">
//                                     <h3 className="font-medium mb-3">{category.name}</h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-medium">Client Price</label>
//                                             <input
//                                                 type="number"
//                                                 value={settings.categoryPrices.find(p => p.category_id === category.id)?.client_price || 0}
//                                                 onChange={(e) => handlePriceChange(category.id, 'client_price', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
//                                             />
//                                         </div>
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-medium">Provider Price</label>
//                                             <input
//                                                 type="number"
//                                                 value={settings.categoryPrices.find(p => p.category_id === category.id)?.provider_price || 0}
//                                                 onChange={(e) => handlePriceChange(category.id, 'provider_price', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </CardContent>
//                     </Card>

//                     {/* Support Settings */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <MailIcon className="h-5 w-5 mr-2 text-blue-500" />
//                                 Support Settings
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Support Email</label>
//                                 <input
//                                     type="email"
//                                     value={settings.support_email}
//                                     onChange={handleEmailChange}
//                                     className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
//                                 />
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default SettingsPage;

import React, { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Shield,
    Globe,
    Mail,
    Smartphone,
    Key,
    Save,
    Mail as MailIcon,
    CheckCircle2,
    Coins
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import { toast } from 'sonner';
import API_URL from '../../constants/Constants';
import { apiService } from '../../services/apiService';
import OperationLayout from '../operation/OperationLayout';

const SettingsPage = () => {
    const [user,setUser]=useState();
    const [settings, setSettings] = useState({
        support_email: 'support@topinfo.rw',
        categoryPrices: []
    });
    const [categories, setCategories] = useState([]);
    const [isEdited, setIsEdited] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await apiService.getServiceCategories();
                setCategories(categoriesData);

                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch(`${API_URL}/settings`, requestOptions);
                const result = await response.json();

                const categoryPrices = result.categoryPrices || categoriesData.map(cat => ({
                    category_id: cat.id,
                    client_price: result.client_price || 2000,
                    provider_price: result.provider_price || 3000
                }));

                setSettings({
                    ...result,
                    categoryPrices
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to load settings');
            }
        };
        fetchData();
    }, []);

    const handlePriceChange = (categoryId, priceType, value) => {
        setSettings(prev => ({
            ...prev,
            categoryPrices: prev.categoryPrices.map(price =>
                price.category_id === categoryId
                    ? {
                        ...price,
                        [priceType]: Number(value),
                        category_id: categoryId
                    }
                    : price
            )
        }));
        setIsEdited(true);
    };

    const handleSaveSettings = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

            const raw = JSON.stringify({
                support_email: settings.support_email,
                categoryPrices: settings.categoryPrices.map(price => ({
                    category_id: price.category_id,
                    client_price: price.client_price,
                    provider_price: price.provider_price
                }))
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch(`${API_URL}/settings`, requestOptions);
            const result = await response.json();

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            toast.success('Settings updated successfully');
            setIsEdited(false);
            setSettings(result);
        } catch (error) {
            console.error('Failed to update settings:', error);
            toast.error('Failed to update settings');
        }
    };

    const handleEmailChange = (e) => {
        setSettings(prev => ({
            ...prev,
            support_email: e.target.value
        }));
        setIsEdited(true);
    };

    useEffect(() => {
        try {
          const userString = localStorage.getItem("user");
          if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }, []);

    const Layout = user?.role === "ADMIN" ? AdminLayout : OperationLayout;

    return (
        <Layout>
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Settings updated successfully!
                    </div>
                </div>
            )}

            <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-xl lg:text-2xl font-bold">Settings</h1>
                    <button
                        onClick={handleSaveSettings}
                        disabled={!isEdited}
                        className={`w-full sm:w-auto px-4 py-2 rounded flex items-center justify-center
                            ${isEdited
                                ? 'bg-sky-500 text-white hover:bg-sky-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Coins className="h-5 w-5 mr-2 text-green-500" />
                                Service Category Pricing
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                {categories.map(category => (
                                    <div key={category.id} 
                                         className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-medium mb-4 text-lg">{category.name}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium block">
                                                    Client Price (RWF)
                                                </label>
                                                <div className="relative">
                                                    
                                                    <input
                                                        type="number"
                                                        value={settings.categoryPrices.find(p => p.category_id === category.id)?.client_price || 0}
                                                        onChange={(e) => handlePriceChange(category.id, 'client_price', e.target.value)}
                                                        className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium block">
                                                    Provider Price (RWF)
                                                </label>
                                                <div className="relative">
                                                    
                                                    <input
                                                        type="number"
                                                        value={settings.categoryPrices.find(p => p.category_id === category.id)?.provider_price || 0}
                                                        onChange={(e) => handlePriceChange(category.id, 'provider_price', e.target.value)}
                                                        className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Support Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">Support Email</label>
                                <input
                                    type="email"
                                    value={settings.support_email}
                                    onChange={handleEmailChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;