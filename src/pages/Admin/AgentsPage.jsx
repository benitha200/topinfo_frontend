import React, { useState, useEffect } from "react";
import { Users, Search, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";

const AgentsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingUser] = useState(null);

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

  // Fetch users data only from the specified endpoint
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/users?role=AGENT&isSuperAgent=no`, {
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

  // Create a new agent user
  const createUser = async () => {
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
      if (!response.ok) throw new Error("Failed to create user");
      fetchUsers();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agents</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Add New Agent
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Agent Statistics</CardTitle>
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
                        {`${user.location_province || "N/A"}, ${
                          user.location_district || "N/A"
                        }, ${user.location_sector || "N/A"}`}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="text-sky-500 border border-2 border-gray-300 p-2 rounded hover:text-sky-700 mr-2"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 border border-2 border-gray-300 p-2 rounded hover:text-red-700"
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
          <Card className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl">
              <h2 className="text-xl font-bold mb-4">
                {editingRow ? "Edit Agent" : "Add New Agent"}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
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
                  className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                  onClick={() => {
                    if (editingRow) {
                      updateUser(editingRow.id);
                    } else {
                      createUser();
                    }
                  }}
                >
                  {editingRow ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AgentsPage;
