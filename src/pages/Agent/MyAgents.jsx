import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Trash2, User, PlusCircle, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";
import AgentLayout from "./AgentLayout";

const MyAgents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    userId: null,
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location_province: "",
    location_district: "",
    location_sector: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/users/my-agents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data.agents);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      setIsCreating(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users/add-agent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      fetchUsers();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
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
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;


  return (
    <AgentLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Agents</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Add New Agent
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
              <Users className="h-8 w-8 text-sky-500" />
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Active Agents</p>
                <p className="text-2xl font-bold">
                  {users.filter((user) => user.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {deleteConfirmation.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-red-50 py-3  px-3 flex items-center">
                <div className="bg-red-100 rounded-full p-1 mr-1">
                  <Trash2 className="h-5 w-5 text-red-600" strokeWidth={2} />
                </div>
                <h2 className="text-lg align-center font-bold text-red-700">
                  Delete Agent
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 text-center">
                  Are you absolutely sure you want to delete this agent?
                  <br />
                  <span className="font-medium text-gray-500">
                    This action cannot be undone and will permanently remove the agent's information.
                  </span>
                </p>
                <div className="flex justify-center space-x-4 pt-2">
                  <button
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setDeleteConfirmation({ isOpen: false, userId: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    onClick={() => deleteUser(deleteConfirmation.userId)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Agents List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
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
                      Location
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
                        {`${user.location_province || "N/A"}, ${user.location_district || "N/A"
                          }, ${user.location_sector || "N/A"}`}
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
                      <td className="px-4 py-3 text-sm flex items-center space-x-2">
                        <button
                          className="inline-flex items-center justify-center px-3 py-1.5 
                                      bg-sky-50 text-sky-600 
                                      hover:bg-sky-100 
                                      border border-sky-200 
                                      rounded
                                      text-sm 
                                      font-medium 
                                      transition-colors 
                                      focus:outline-none 
                                      focus:ring-2 
                                      focus:ring-sky-300"
                          onClick={() => handleEditClick(user)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center justify-center px-3 py-1.5 
                                      bg-red-50 text-red-600 
                                      hover:bg-red-100 
                                      border border-red-200 
                                      rounded 
                                      text-sm 
                                      font-medium 
                                      transition-colors 
                                      focus:outline-none 
                                      focus:ring-2 
                                      focus:ring-red-300"
                          onClick={() =>
                            setDeleteConfirmation({
                              isOpen: true,
                              userId: user.id
                            })
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-sky-50 flex px-6 py-4 border-b border-sky-100 flex items-center justify-between">
              
                <div className="flex items-center space-x-2">
                  {editingRow ? (
                    <Edit className="w-5 h-5 text-sky-600" strokeWidth={2} />
                  ) : (
                    <PlusCircle className="w-5 h-5 text-sky-600" strokeWidth={2} />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingRow ? "Edit Agent" : "Add New Agent"}
                  </h2>
                </div>


                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Personal Information Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
                      value={formData.firstname}
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
                      value={formData.lastname}
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Location Information Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sector
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-sky-500 
              transition-all duration-200"
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

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md 
            hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingUser(null);
                      resetForm();
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-white transition-all duration-200 
            ${isCreating
                        ? "bg-sky-300 cursor-not-allowed"
                        : "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                      }`}
                    onClick={() => {
                      if (editingRow) {
                        updateUser(editingRow.id);
                      } else {
                        createUser();
                      }
                    }}
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </div>
                    ) : (
                      editingRow ? "Update Agent" : "Create Agent"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default MyAgents;
