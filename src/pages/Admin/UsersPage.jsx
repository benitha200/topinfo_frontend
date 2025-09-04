import React, { useState, useEffect } from "react";
import { Users, Search, Filter, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";
import AgentsSkeleton from "../Agent/AgentsSkeleton";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const userRole = {
    OPERATIONS: {
      title: "Operations",
    },
    ADMIN: {
      title: "Administrator",
    },
    CUSTOMER_SUPPORT: {
      title: "Customer Support",
    },
  };

  // Fetch users data only from the specified endpoint
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/users?role=ADMIN`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // const agentUsers = data.users.filter(user => user.role === 'AGENT');

      setUsers(data.users);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const createUser = async () => {
    setIsSubmiting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      // Get the response data
      const data = await response.json();
      
      if (!response.ok) {
        // Use the specific error message from the API if available
        throw new Error(data.error || "Failed to create user");
      }
      
      fetchUsers();
      setIsAddModalOpen(false);
      setIsSubmiting(false);
      resetForm();
    } catch (err) {
      setError(err.message);
      setIsSubmiting(false);
    }
  };


  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      location_province: "",
      location_district: "",
      location_sector: "",
    });
  };

  useEffect(() => {
    setProvinces(Provinces());
    fetchUsers();
  }, []);

  const handleProvinceChange = (province) => {
    setFormData({
      ...formData,
      location_province: province,
      location_district: "",
      location_sector: "",
    });
    setDistricts(Districts(province));
    setSectors([]);
  };

  const handleDistrictChange = (district) => {
    setFormData({
      ...formData,
      location_district: district,
      location_sector: "",
    });
    const { location_province } = formData;
    if (location_province) {
      setSectors(Sectors(location_province, district));
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location_province: user.location_province,
      location_district: user.location_district,
      location_sector: user.location_sector,
    });
    setDistricts(Districts(user.location_province));
    if (user.location_district) {
      const fetchedSectors = Sectors(
        user.location_province,
        user.location_district
      );
      setSectors(fetchedSectors);
    }
  };

  const updateUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update users");
      fetchUsers();
      setEditingUser(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to delete");
        fetchUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return  <AdminLayout><AgentsSkeleton/></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Add New User
          </button>
        </div>
      

        <Card>
          <CardHeader>
            <CardTitle>Users Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <Users className="h-8 w-8 text-slate-500" />
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">
                  {users.filter((user) => user.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Users List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <button className="p-2 border rounded hover:bg-gray-50">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3 text-sm">
                        {`${user.firstname} ${user.lastname}`}
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{user.phone}</td>
                      <td className="px-4 py-3 text-sm">
                        {userRole[user.role].title}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="text-slate-500 border-2 border-gray-300 p-2 rounded hover:text-slate-700 mr-2"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 border-2 border-gray-300 p-2 rounded hover:text-red-700"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        {/* Add/Edit Modal */}
        {(isAddModalOpen || editingRow) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-xl">
              <h2 className="text-xl font-bold mb-4">
                {editingRow ? "Edit User" : "Add New User"}
              </h2>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-red-800 font-medium">
                      Habonetse Ikosa!
                    </h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="w-full p-2 border rounded"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="w-full p-2 border rounded"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  {/* <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  /> */}
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-slate-500 
    transition-all duration-200
    ${editingRow ? 'bg-gray-100 cursor-not-allowed' : ''}"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    disabled={!!editingRow}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="w-full p-2 border rounded"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 mb-3">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    User Role
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="OPERATIONS">Operations</option>
                    <option value="ADMIN">Administrator</option>
                    <option value="CUSTOMER_SUPPORT">Customer Support</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location_province"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Province
                  </label>

                  <select
                    className="w-full p-2 border rounded"
                    name="location_province"
                    id="location_province"
                    value={formData.location_province}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                  >
                    <option value="">Select a Province</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="location_district"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    District
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    name="location_district"
                    id="location_district"
                    value={formData.location_district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                  >
                    <option value="">Select a District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="location_sector"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sector
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    name="location_sector"
                    id="location_sector"
                    value={formData.location_sector}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location_sector: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a Sector</option>
                    {sectors.map((sector, index) => (
                      <option key={index} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 text-white rounded ${isSubmiting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-500 hover:bg-slate-600"
                    }`}
                  onClick={() => {
                    if (!isSubmiting) {
                      if (editingRow) {
                        updateUser(editingRow.id);
                      } else {
                        createUser();
                      }
                    }
                  }}
                  disabled={isSubmiting}
                >
                  {isSubmiting ? "Loading..." : editingRow ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
