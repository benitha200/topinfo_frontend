import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Loader2, ChevronLeft, ChevronRight, ImageUpIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";
import ErrorDialog from "../../components/ErrorDialog/ErrorDialog";
import OperationLayout from "../operation/OperationLayout";
import AgentsSkeleton from "../Agent/AgentsSkeleton";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle} from "../../../src/components/ui/dialog";

const ImagePreview = ({ url, title }) => {
  if (!url) return null;

  return (
    <Dialog  className=" bg-white">
      <DialogTrigger asChild>
        <button className="flex items-center space-x-1 text-sky-600 hover:text-sky-700">
          <ImageUpIcon className="h-4 w-4" />
          <span className="text-sm">View {title}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img src={`${API_URL}/${url}`} alt={title} className="w-full h-auto rounded-lg" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AgentsPage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingUser] = useState(null);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 0
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location_province: "",
    location_district: "",
    location_sector: "",
    profileImage : null,
    nationalIdImage : null,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/users?role=AGENT&isSuperAgent=no&page=${page}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data.users);
      setPagination({
        total: data.pagination.total,
        page: data.pagination.page,
        pages: data.pagination.pages
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
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

  // Pagination handlers
  const handleNextPage = () => {
    if (pagination.page < pagination.pages) {
      fetchUsers(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchUsers(pagination.page - 1);
    }
  };


  const createUser = async () => {
    try {
      setModalLoading(true);
      const token = localStorage.getItem("token");
      const formDataObj = new FormData();

      // Append all form data
      formDataObj.append("firstname", formData.firstname);
      formDataObj.append("lastname", formData.lastname);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("location_province", formData.location_province);
      formDataObj.append("location_district", formData.location_district);
      formDataObj.append("location_sector", formData.location_sector);

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
      
      const data = await response.json();
      
      if (response.status === 400) {
        setErrorMessage(data.error);
        setIsErrorDialogOpen(true);
        return;
      }
      
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      
      fetchUsers();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
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
      setModalLoading(true);

      const token = localStorage.getItem("token");
      const formDataObj = new FormData();

      // Append all form data
      formDataObj.append("firstname", formData.firstname);
      formDataObj.append("lastname", formData.lastname);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("location_province", formData.location_province);
      formDataObj.append("location_district", formData.location_district);
      formDataObj.append("location_sector", formData.location_sector);

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
      fetchUsers();
      setEditingUser(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    }finally {
      setModalLoading(false);
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

  const renderImageCell = (profileImage, nationalIdImage) => (
    <td className="px-4 py-3 text-sm">
      <div className="flex flex-col space-y-2">
        {/* Image */}
        <ImagePreview url={profileImage} title="Profile Image" />
        <ImagePreview url={nationalIdImage} title="National ID" />
      </div>
    </td>
  );

  const Layout = user?.role === "ADMIN" ? AdminLayout : OperationLayout;

  if (loading) return <Layout><AgentsSkeleton/></Layout>;

  return (
    <Layout>
      <div className="p-6 space-y-6">
      <ErrorDialog 
          isOpen={isErrorDialogOpen}
          setIsOpen={setIsErrorDialogOpen}
          errorMessage={errorMessage}
        />
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
                <p className="text-2xl font-bold">{pagination.total}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Active Agents</p>
                <p className="text-2xl font-bold">
                  {pagination.total}
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
                      Images
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
                        {`${user.location_province || "N/A"}, ${user.location_district || "N/A"}, ${user.location_sector || "N/A"}`}
                      </td>
                      {/* {user.profileImage} */}
                      {renderImageCell(user.profileImage, user.nationalIdImage)}
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
              
              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4 px-4">
                <div className="text-sm text-gray-600">
                  Showing {((pagination.page - 1) * 10) + 1} - 
                  {Math.min(pagination.page * 10, pagination.total)} 
                  {" "}of {pagination.total} agents
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={pagination.page === 1}
                    className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Add/Edit Modal */}
        {(isAddModalOpen || editingRow) && (
          <Card className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-xl">
              <h2 className="text-xl font-bold mb-4">
                {editingRow ? "Edit Agent" : "Add New Agent"}
              </h2>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
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
                <label htmlFor="profileImage" className="block text-sm font-medium mb-1">
                    Passport Image
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileImage: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div>
                <label htmlFor="national_id" className="block text-sm font-medium mb-1">
                    National ID Image
                  </label>
                  <input
                    type="file"
                    id="national_id"
                    className="w-full p-2 border rounded"
                    accept="image/*"
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
                    setError(null); // Clear error when closing modal
                  }}
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
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AgentsPage;
