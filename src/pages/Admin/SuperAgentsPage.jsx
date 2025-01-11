import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Loader2, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";
import * as XLSX from "xlsx";
import AgentsSkeleton from "../Agent/AgentsSkeleton";

const SuperAgentsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingUser] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    commissionRate: "0.05", // Match Prisma default
    location_province: "",
    location_district: "",
    location_sector: "",
    isSuperAgent: true,
    profileImage: null,
    nationalIdImage: null,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Construct query parameters
      const params = new URLSearchParams({
        role: "AGENT",
        isSuperAgent: "yes",
      });

      // Add date filtering if dates are provided
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(`${API_URL}/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  // Create a new agent user
  const formatCommissionRate = (value) => {
    // Ensure value is a valid number and within bounds (0-1)
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0.05";
    if (numValue < 0) return "0.00";
    if (numValue > 1) return "1.00";
    // Format to 2 decimal places to match Prisma's scale
    return numValue.toFixed(2);
  };

  // Create user function with decimal commission rate handling
  const createUser = async () => {
    try {
      setModalLoading(true);

      const token = localStorage.getItem("token");
      const formDataObj = new FormData();

      // Format commission rate as a string with 2 decimal places
      const formattedCommissionRate = formatCommissionRate(formData.commissionRate);

      // Append all form data
      formDataObj.append("firstname", formData.firstname);
      formDataObj.append("lastname", formData.lastname);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("location_province", formData.location_province);
      formDataObj.append("location_district", formData.location_district);
      formDataObj.append("location_sector", formData.location_sector);
      formDataObj.append("isSuperAgent", true);
      formDataObj.append("commissionRate", formattedCommissionRate);

      // Append files
      if (formData.profileImage) {
        formDataObj.append("profileImage", formData.profileImage);
      }
      if (formData.nationalIdImage) {
        formDataObj.append("nationalIdImage", formData.nationalIdImage);
      }

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to create user");
      await fetchUsers();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Update user function with decimal commission rate handling
  const updateUser = async (id) => {
    try {
      setModalLoading(true);
      const token = localStorage.getItem("token");
      const formDataObj = new FormData();

      // Format commission rate as a string with 2 decimal places
      // const formattedCommissionRate = formatCommissionRate(formData.commissionRate);
      // const commissionRate = formData.commissionRate ? parseFloat(formData.commissionRate).toFixed(2) : "0.05";

      // Append all form data
      formDataObj.append("firstname", formData.firstname);
      formDataObj.append("lastname", formData.lastname);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("location_province", formData.location_province);
      formDataObj.append("location_district", formData.location_district);
      formDataObj.append("location_sector", formData.location_sector);
      formDataObj.append("commissionRate", formData.commissionRate);

      // Append files
      if (formData.profileImage) {
        formDataObj.append("profileImage", formData.profileImage);
      }
      if (formData.nationalIdImage) {
        formDataObj.append("nationalIdImage", formData.nationalIdImage);
      }

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to update users");
      await fetchUsers();
      setEditingUser(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Update handleEditClick to properly format commission rate when editing
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      ...formData,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      commissionRate: user.commissionRate ? formatCommissionRate(user.commissionRate) : "0.05",
      location_province: user.location_province,
      location_district: user.location_district,
      location_sector: user.location_sector,
      isSuperAgent: true,
      profileImage: null,
      nationalIdImage: null,
    });
    setDistricts(Districts(user.location_province));
    if (user.location_district) {
      const fetchedSectors = Sectors(user.location_province, user.location_district);
      setSectors(fetchedSectors);
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

  // const handleEditClick = (user) => {
  //   setEditingUser(user);
  //   setFormData({
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     email: user.email,
  //     phone: user.phone,
  //     commissionRate: user.commissionRate || "0.05", // Set default if not present
  //     location_province: user.location_province,
  //     location_district: user.location_district,
  //     location_sector: user.location_sector,
  //     isSuperAgent: true,
  //     profileImage: null,
  //     nationalIdImage: null,
  //   });
  //   setDistricts(Districts(user.location_province));
  //   if (user.location_district) {
  //     const fetchedSectors = Sectors(user.location_province, user.location_district);
  //     setSectors(fetchedSectors);
  //   }
  // };

  // const updateUser = async (id) => {
  //   try {
  //     setModalLoading(true);
  //     const token = localStorage.getItem("token");
  //     const formDataObj = new FormData();

  //     // Convert commissionRate to a number before appending
  //     const commissionRate = parseFloat(formData.commissionRate);

  //     // Append all form data
  //     formDataObj.append("firstname", formData.firstname);
  //     formDataObj.append("lastname", formData.lastname);
  //     formDataObj.append("email", formData.email);
  //     formDataObj.append("phone", formData.phone);
  //     formDataObj.append("location_province", formData.location_province);
  //     formDataObj.append("location_district", formData.location_district);
  //     formDataObj.append("location_sector", formData.location_sector);
  //     formDataObj.append("commissionRate", commissionRate); // Send as number

  //     // Append files
  //     if (formData.profileImage) {
  //       formDataObj.append("profileImage", formData.profileImage);
  //     }
  //     if (formData.nationalIdImage) {
  //       formDataObj.append("nationalIdImage", formData.nationalIdImage);
  //     }

  //     const response = await fetch(`${API_URL}/users/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formDataObj,
  //     });

  //     if (!response.ok) throw new Error("Failed to update users");
  //     await fetchUsers();
  //     setEditingUser(null);
  //     resetForm();
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setModalLoading(false);
  //   }
  // };

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

  const downloadUsers = () => {
    // Prepare data for download
    const downloadData = filteredUsers.map((user) => ({
      Name: `${user.firstname} ${user.lastname}`,
      Email: user.email,
      Phone: user.phone,
      Province: user.location_province || "N/A",
      District: user.location_district || "N/A",
      Sector: user.location_sector || "N/A",
      Status: user.isActive ? "Active" : "Inactive",
      "Registered Date": new Date(user.createdAt).toLocaleDateString(),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(downloadData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Super Agents");

    // Generate and download Excel file
    XLSX.writeFile(
      workbook,
      `super_agents_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    // Search term filtering
    const matchesSearch =
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    // Date range filtering
    const userDate = new Date(user.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDateRange =
      (!start || userDate >= start) && (!end || userDate <= end);

    return matchesSearch && matchesDateRange;
  });

  if (loading) return <AdminLayout> <AgentsSkeleton /></AdminLayout>;
  // if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Super Agents</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Add New Super Agent
          </button>
        </div>
        <Card>
          {/* <CardHeader>
            <CardTitle>Agent Statistics</CardTitle>
          </CardHeader> */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Super Agents List</CardTitle>
            <div className="flex space-x-2 items-center">
              {/* Date Range Inputs */}
              <div className="flex space-x-2 mr-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded text-sm"
                  />
                </div>
              </div>


              {/* Download button */}
              <button
                onClick={downloadUsers}
                className="p-2 border bg-emerald-500 text-white rounded hover:bg-emerald-400 flex items-center mt-4"
                title="Download Super Agents"
              >
                <Download className="h-4 w-4 mr-2" /> Download Super Agents
              </button>
            </div>
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
            <CardTitle>Super Agents List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Commission Rate
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
                      <td className="px-4 py-3 text-sm">{user.commissionRate} %</td>
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
                          className="text-sky-500 border-2 border-gray-300 p-2 rounded hover:text-sky-700 mr-2"
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
                {editingRow ? "Edit Super Agent" : "Add New Super Agent"}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium mb-1"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
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
    focus:outline-none focus:ring-2 focus:ring-sky-500 
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

              {/* Commission Rate field with default value */}
              <div className="mb-4">
                <label htmlFor="commissionRate" className="block text-sm font-medium mb-1">
                  Commission Rate
                </label>
                <input
                  type="number"
                  id="commissionRate"
                  className="w-full p-2 border rounded"
                  value={formData.commissionRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only update if it's a valid number or empty
                    if (value === '' || (!isNaN(parseFloat(value)) && value >= 0 && value <= 1)) {
                      setFormData({ ...formData, commissionRate: value });
                    }
                  }}
                  onBlur={(e) => {
                    // Format the value when the input loses focus
                    const formattedValue = formatCommissionRate(e.target.value);
                    setFormData({ ...formData, commissionRate: formattedValue });
                  }}
                  min="0"
                  max="1"
                  step="0.01"
                  placeholder="Enter commission rate (e.g., 0.05 for 5%)"
                />
                <p className="text-sm text-gray-500 mt-1">Default: 5% (0.05)</p>
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

                <div className="col-span-2">
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
              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  {/* <label hidden htmlFor="profileImage" className="block text-sm font-medium mb-1">
                    Passport Image
                  </label> */}
                  <input
                    type="file"
                    id="profileImage"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileImage: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div>
                  {/* <label hidden htmlFor="national_id" className="block text-sm font-medium mb-1">
                    National ID Image
                  </label> */}
                  <input
                    type="file"
                    id="national_id"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nationalIdImage: e.target.files[0],
                      })
                    }
                  />
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
                  disabled={modalLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 flex items-center"
                  onClick={() => {
                    if (editingRow) {
                      updateUser(editingRow.id);
                    } else {
                      createUser();
                    }
                  }}
                  disabled={modalLoading}
                >
                  {modalLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingRow ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default SuperAgentsPage;
