import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Trash2, User, PlusCircle, Edit, Upload, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import API_URL from "../../constants/Constants";
import { Provinces, Districts, Sectors } from "rwanda";
import AgentLayout from "./AgentLayout";
import * as XLSX from 'xlsx';
import AgentsSkeleton from './AgentsSkeleton';

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


  const [excelFile, setExcelFile] = useState(null);
  const [excelAgents, setExcelAgents] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
    isUploading: false
  });
  const [uploadErrors, setUploadErrors] = useState([]);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [totalAgents, setTotalAgents] = useState();


  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };
  
  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setExcelFile(null);
    setExcelAgents([]);
  };



  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // const response = await fetch(`${API_URL}/users/my-agents?page=${page}&limit=${limit}&search=${searchTerm}`, {
        const response = await fetch(`${API_URL}/users/my-agents?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // Update states with server response
      setUsers(data.agents);
      setTotalPages(data.totalPages);
      setTotalAgents(data.totalAgents);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };


  // Convert phone to string
  const createUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users/add-agent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.toString() // Convert phone to string
        }),
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


  const downloadAgentTemplate = () => {
    // Define the headers for the template
    const headers = [
      'First Name', 
      'Last Name', 
      'Email', 
      'Phone', 
      'Province', 
      'District', 
      'Sector'
    ];
  
    // Create a worksheet with just the headers
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  
    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agents');
  
    // Generate the Excel file
    XLSX.writeFile(workbook, 'agent_upload_template.xlsx');
  };

  useEffect(() => {
    setProvinces(Provinces());
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, searchTerm]);



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
      isActive: true
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
  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  // const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Pagination change handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination component
  const PaginationControls = () => {
    // Generate page numbers to display
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalAgents)} of {totalAgents} agents
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 border rounded ${currentPage === number
                  ? 'bg-slate-500 text-white'
                  : 'hover:bg-gray-50'
                }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading) return <AgentLayout><AgentsSkeleton /></AgentLayout>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // const handleExcelFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const allowedTypes = [
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       'application/vnd.ms-excel'
  //     ];

  //     if (!allowedTypes.includes(file.type)) {
  //       alert('Please upload a valid Excel file (.xlsx or .xls)');
  //       return;
  //     }

  //     try {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         try {
  //           const workbook = XLSX.read(event.target.result, { type: 'binary' });
  //           const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //           const jsonData = XLSX.utils.sheet_to_json(worksheet, {
  //             header: 1,  // Use first row as headers
  //             defval: ''  // Use empty string for missing values
  //           });

  //           // Skip header row and transform data
  //           const transformedAgents = jsonData.slice(1).map(row => ({
  //             firstname: row[0] || '',
  //             lastname: row[1] || '',
  //             email: row[2] || '',
  //             phone: row[3] || '',
  //             location_province: row[4] || '',
  //             location_district: row[5] || '',
  //             location_sector: row[6] || ''
  //           })).filter(agent => agent.email);

  //           if (transformedAgents.length === 0) {
  //             alert('No valid agents found in the Excel file.');
  //             return;
  //           }

  //           setExcelAgents(transformedAgents);
  //           setIsUploadModalOpen(true);  
  //         } catch (parseError) {
  //           console.error('Error parsing Excel file:', parseError);
  //           alert('Error parsing the Excel file.');
  //         }
  //       };

  //       reader.readAsBinaryString(file);
  //       setExcelFile(file);
  //     } catch (error) {
  //       console.error('Unexpected error in file upload:', error);
  //       alert('An unexpected error occurred.');
  //     }
  //   }
  // };


  // const handleExcelFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const allowedTypes = [
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       'application/vnd.ms-excel'
  //     ];

  //     if (!allowedTypes.includes(file.type)) {
  //       alert('Please upload a valid Excel file (.xlsx or .xls)');
  //       return;
  //     }

  //     try {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         try {
  //           const workbook = XLSX.read(event.target.result, { type: 'binary' });
  //           const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //           const jsonData = XLSX.utils.sheet_to_json(worksheet, {
  //             header: 1,  // Use first row as headers
  //             defval: ''  // Use empty string for missing values
  //           });

  //           // Skip header row and transform data
  //           const transformedAgents = jsonData.slice(1).map(row => ({
  //             firstname: row[0] || '',
  //             lastname: row[1] || '',
  //             email: row[2] || '',
  //             phone: row[3] || '',
  //             location_province: row[4] || '',
  //             location_district: row[5] || '',
  //             location_sector: row[6] || ''
  //           })).filter(agent => agent.email);

  //           if (transformedAgents.length === 0) {
  //             alert('No valid agents found in the Excel file.');
  //             return;
  //           }

  //           setExcelAgents(transformedAgents);
  //           setIsUploadModalOpen(true); 
  //           setIsAddModalOpen(true); // Open upload modal directly
  //         } catch (parseError) {
  //           console.error('Error parsing Excel file:', parseError);
  //           alert('Error parsing the Excel file.');
  //         }
  //       };

  //       reader.readAsBinaryString(file);
  //       setExcelFile(file);
  //     } catch (error) {
  //       console.error('Unexpected error in file upload:', error);
  //       alert('An unexpected error occurred.');
  //     }
  //   }
  // };

  const handleExcelFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
  
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid Excel file (.xlsx or .xls)');
        return;
      }
  
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,  // Use first row as headers
              defval: ''  // Use empty string for missing values
            });
  
            // Skip header row and transform data
            const transformedAgents = jsonData.slice(1).map(row => ({
              firstname: row[0] || '',
              lastname: row[1] || '',
              email: row[2] || '',
              phone: row[3] || '',
              location_province: row[4] || '',
              location_district: row[5] || '',
              location_sector: row[6] || ''
            })).filter(agent => agent.email);
  
            if (transformedAgents.length === 0) {
              alert('No valid agents found in the Excel file.');
              return;
            }
  
            setExcelAgents(transformedAgents);
            openAddModal();
          openUploadModal();
    
          } catch (parseError) {
            console.error('Error parsing Excel file:', parseError);
            alert('Error parsing the Excel file.');
          }
        };
  
        reader.readAsBinaryString(file);
        setExcelFile(file);
      } catch (error) {
        console.error('Unexpected error in file upload:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  const uploadExcelAgents = async () => {
    try {
      const validAgents = excelAgents.map(agent => ({
        ...agent,
        phone: agent.phone ? agent.phone.toString() : '' // Convert phone to string
      })).filter(agent =>
        agent.firstname && agent.lastname && agent.email
      );

      if (validAgents.length === 0) {
        alert('No valid agents to upload.');
        return;
      }

      const token = localStorage.getItem("token");
      setUploadProgress({
        current: 0,
        total: validAgents.length,
        isUploading: true
      });
      setUploadErrors([]);

      // Parallel uploads with Promise.all and rate limiting
      const uploadBatch = async (batch) => {
        return Promise.all(batch.map(async (agent) => {
          try {
            const response = await fetch(`${API_URL}/users/add-agent`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(agent),
            });

            if (!response.ok) {
              const errorText = await response.text();
              return {
                email: agent.email,
                status: 'failed',
                error: errorText
              };
            }
            return {
              email: agent.email,
              status: 'success'
            };
          } catch (error) {
            return {
              email: agent.email,
              status: 'error',
              error: error.message
            };
          }
        }));
      };

      // Process agents in batches of 10 with short delays
      const batchSize = 10;
      const uploadResults = [];

      for (let i = 0; i < validAgents.length; i += batchSize) {
        const batch = validAgents.slice(i, i + batchSize);
        const batchResults = await uploadBatch(batch);

        uploadResults.push(...batchResults);

        // Update progress
        setUploadProgress(prev => ({
          ...prev,
          current: uploadResults.length
        }));

        // Short delay between batches to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Analyze upload results
      const successCount = uploadResults.filter(r => r.status === 'success').length;
      const failedCount = uploadResults.filter(r => r.status !== 'success').length;

      // Collect and set detailed error information
      const errorDetails = uploadResults.filter(r => r.status !== 'success');
      setUploadErrors(errorDetails);

      // Show summary alert
      alert(`Upload complete. 
        Successful: ${successCount}
        Failed: ${failedCount}
      `);

      // Refresh users list and reset modals
      fetchUsers();
      setIsUploadModalOpen(false);
      setExcelFile(null);
      setExcelAgents([]);
    } catch (err) {
      console.error("Batch upload error:", err);
      alert('An unexpected error occurred during upload.');
    } finally {
      setUploadProgress({
        current: 0,
        total: 0,
        isUploading: false
      });
    }
  };

  // Add a new section in your render to show upload errors
  const renderUploadErrors = () => {
    if (uploadErrors.length === 0) return null;

    return (
      <div className="mt-4 bg-red-50 p-4 rounded-lg">
        <h3 className="text-red-700 font-semibold mb-2">Upload Errors</h3>
        <ul className="text-sm text-red-600">
          {uploadErrors.map((error, index) => (
            <li key={index}>
              {error.email}: {error.error}
            </li>
          ))}
        </ul>
      </div>
    );
  };



  return (
    <AgentLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <h1 className="text-xl md:text-2xl font-bold">My Agents</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openAddModal}
              className="flex-1 md:flex-none px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm md:text-base"
            >
              Add New Agent
            </button>
            <label
              htmlFor="excel-upload"
              className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Agents
              <input
                type="file"
                id="excel-upload"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleExcelFileUpload}
              />
            </label>
            <button
              onClick={downloadAgentTemplate}
              className="flex-1 md:flex-none px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 flex items-center justify-center text-sm md:text-base"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </button>
          </div>
        </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
            <Users className="h-8 w-8 text-slate-500" />
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
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  onClick={() => setDeleteConfirmation({ isOpen: false, userId: null })}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
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
                onChange={(e) => handleSearch(e.target.value)}
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
                    {/* <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td> */}

                    <td className="px-4 py-3 text-sm flex items-center space-x-2">
                      <button
                        className="inline-flex items-center justify-center px-3 py-1.5 
                                      bg-slate-50 text-slate-600 
                                      hover:bg-slate-100 
                                      border border-slate-200 
                                      rounded
                                      text-sm 
                                      font-medium 
                                      transition-colors 
                                      focus:outline-none 
                                      focus:ring-2 
                                      focus:ring-slate-300"
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
          <PaginationControls />
        </CardContent>
      </Card>
      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingRow) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-50 flex px-6 py-4 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center space-x-2">
                {editingRow ? (
                  <Edit className="w-5 h-5 text-slate-600" strokeWidth={2} />
                ) : (
                  <PlusCircle className="w-5 h-5 text-slate-600" strokeWidth={2} />
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
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
                  {/* <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-slate-500 
                                  transition-all duration-200"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email address"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
              focus:outline-none focus:ring-2 focus:ring-slate-500 
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
                  // onClick={() => {
                  //   setIsAddModalOpen(false);
                  //   setEditingUser(null);
                  //   resetForm();
                  // }}
                  onClick={closeAddModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-white transition-all duration-200 
            ${isCreating
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
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
          {isUploadModalOpen && (
            <div className="fixed h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-slate-600" strokeWidth={2} />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Upload Agents from Excel
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsUploadModalOpen(false);
                      setExcelFile(null);
                      setExcelAgents([]);
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="overflow-x-auto max-h-96">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelAgents.map((agent, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-3 text-sm">{agent.firstname}</td>
                            <td className="px-4 py-3 text-sm">{agent.lastname}</td>
                            <td className="px-4 py-3 text-sm">{agent.email}</td>
                            <td className="px-4 py-3 text-sm">{agent.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {uploadProgress.isUploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-slate-600 h-2.5 rounded-full"
                        style={{
                          width: `${(uploadProgress.current / uploadProgress.total) * 100}%`
                        }}
                      ></div>
                      <p className="text-center mt-2 text-sm text-gray-600">
                        Uploading: {uploadProgress.current} / {uploadProgress.total} agents
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      // onClick={() => {
                      //   setIsUploadModalOpen(false);
                      //   setExcelFile(null);
                      //   setExcelAgents([]);
                      // }}
                      onClick={closeUploadModal}
                      disabled={uploadProgress.isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-white transition-all duration-200 
                    ${uploadProgress.isUploading
                          ? "bg-slate-300 cursor-not-allowed"
                          : "bg-slate-600 hover:bg-slate-700"
                        }`}
                      onClick={uploadExcelAgents}
                      disabled={uploadProgress.isUploading}
                    >
                      {uploadProgress.isUploading
                        ? `Uploading (${uploadProgress.current}/${uploadProgress.total})`
                        : "Confirm Upload"
                      }
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>)}
      {renderUploadErrors()}

    </AgentLayout>
  );
};

export default MyAgents;
