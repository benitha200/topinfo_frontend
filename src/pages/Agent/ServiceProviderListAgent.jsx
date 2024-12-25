import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Clock,
  Menu,
} from "lucide-react";
import AgentLayout from "./AgentLayout";
import axios from "axios";
import { toast } from "sonner";
import API_URL from "../../constants/Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ServiceProviderListAgent = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [approvedFilter, setApprovedFilter] = useState("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  // Fetch the token
  const token = localStorage.getItem("token");
  const cardGridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6";
 
  // Get user ID from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  // Fetch service providers and categories on component mount
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // Only fetch if both token and userId are available
        if (token && userId) {
          // Fetch service providers
          const serviceProvidersResponse = await axios.get(
            `${API_URL}/service-providers/added-by-me/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Fetch service categories
          const serviceCategoriesResponse = await axios.get(
            `${API_URL}/service-categories`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setServiceProviders(serviceProvidersResponse.data);
          setServiceCategories(serviceCategoriesResponse.data);
          setIsLoading(false);
        } else {
          toast.error("Authentication failed");
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Failed to load service providers");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  // Calculate service provider insights
  const serviceProviderInsights = useMemo(() => {
    const totalServiceProviders = serviceProviders.length;
    const approvedServiceProviders = serviceProviders.filter(
      (sp) => sp.approved
    ).length;
    const unapprovedServiceProviders = serviceProviders.filter(
      (sp) => !sp.approved
    ).length;

    return {
      totalServiceProviders,
      approvedServiceProviders,
      unapprovedServiceProviders,
    };
  }, [serviceProviders]);

  // Render approval status badge
  const renderApprovalBadge = (approved) => {
    const statusColors = {
      true: "bg-green-100 text-green-800",
      false: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span className={`px-2 py-1 rounded text-xs ${statusColors[approved]}`}>
        {approved ? "Approved" : "Pending"}
      </span>
    );
  };

  // Filtered and Paginated Service Providers
  const filteredServiceProviders = useMemo(() => {
    return serviceProviders.filter(
      (serviceProvider) =>
        (searchTerm === "" ||
          serviceProvider.firstname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          serviceProvider.lastname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          serviceProvider.service_category?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (approvedFilter === "" ||
          (approvedFilter === "approved" && serviceProvider.approved) ||
          (approvedFilter === "unapproved" && !serviceProvider.approved)) &&
        (serviceCategoryFilter === "" ||
          serviceProvider.service_category_id ===
            parseInt(serviceCategoryFilter))
    );
  }, [serviceProviders, searchTerm, approvedFilter, serviceCategoryFilter]);

  // Paginated Service Providers
  const paginatedServiceProviders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServiceProviders.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredServiceProviders, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredServiceProviders.length / itemsPerPage);

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Navigate to create service provider page
  const handleAddServiceProvider = () => {
    navigate("/agent-dashboard/serviceprovider-agent/create");
  };

  // Navigate to service provider detail page
  const handleViewServiceProvider = (serviceProviderId) => {
    navigate(
      `/agent-dashboard/serviceprovider-agent/view/${serviceProviderId}`
    );
  };

  // Approval Filter Options
  const approvalOptions = [
    { value: "approved", label: "Approved" },
    { value: "unapproved", label: "Pending" },
  ];

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const FiltersSection = () => (
    <div className={`space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 ${showMobileFilters ? 'block' : 'hidden md:flex'}`}>
      {/* Search Input */}
      <div className="relative flex-grow">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          placeholder="Search service providers..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Service Category Filter */}
      <div className="relative w-full md:w-48">
        <Filter
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <select
          className="pl-10 pr-4 py-2 border rounded w-full"
          value={serviceCategoryFilter}
          onChange={(e) => {
            setServiceCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {serviceCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Approval Filter */}
      <div className="relative w-full md:w-48">
        <Filter
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <select
          className="pl-10 pr-4 py-2 border rounded w-full"
          value={approvedFilter}
          onChange={(e) => {
            setApprovedFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Statuses</option>
          {approvalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const ServiceProvidersList = () => (
    <div className="w-full overflow-x-auto">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service Category</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServiceProviders.map((serviceProvider) => (
              <TableRow key={serviceProvider.id}>
                <TableCell>
                  {serviceProvider.firstname} {serviceProvider.lastname}
                </TableCell>
                <TableCell>{serviceProvider.email}</TableCell>
                <TableCell>{serviceProvider.phone}</TableCell>
                <TableCell>
                  {serviceProvider.service_category?.name || "N/A"}
                </TableCell>
                <TableCell>{serviceProvider.experience}</TableCell>
                <TableCell>
                  {serviceProvider.location_province}, {serviceProvider.location_district}
                </TableCell>
                <TableCell>
                  {renderApprovalBadge(serviceProvider.approved)}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleViewServiceProvider(serviceProvider.id)}
                    className="hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
                  >
                    <Eye className="mr-2" size={16} /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedServiceProviders.map((serviceProvider) => (
          <Card key={serviceProvider.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {serviceProvider.firstname} {serviceProvider.lastname}
                  </h3>
                  <p className="text-sm text-gray-500">{serviceProvider.email}</p>
                </div>
                {renderApprovalBadge(serviceProvider.approved)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{serviceProvider.phone}</p>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <p>{serviceProvider.service_category?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Experience</p>
                  <p>{serviceProvider.experience}</p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p>{serviceProvider.location_province}, {serviceProvider.location_district}</p>
                </div>
              </div>
              <Button
                className="w-full mt-2 hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
                onClick={() => handleViewServiceProvider(serviceProvider.id)}
              >
                <Eye className="mr-2" size={16} /> View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <AgentLayout>
    <div className="space-y-6 p-4">
      {/* Insight Cards */}
      <div className={cardGridClasses}>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 bg-sky-100 p-3 rounded-full">
              <Eye className="text-sky-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Service Providers</p>
              <p className="text-2xl font-bold">
                {serviceProviderInsights.totalServiceProviders}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold">
                {serviceProviderInsights.approvedServiceProviders}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Approval</p>
              <p className="text-2xl font-bold">
                {serviceProviderInsights.unapprovedServiceProviders}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Service Providers</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                className="md:hidden"
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={20} />
              </Button>
              <Button
                className="bg-emerald-500 rounded text-white hover:bg-emerald-600 flex-1 sm:flex-none"
                onClick={handleAddServiceProvider}
              >
                Register Service Provider
              </Button>
            </div>
          </div>
          <CardDescription>
            <FiltersSection />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading service providers...</p>
          ) : (
            <>
              <ServiceProvidersList />

              {/* Responsive Pagination */}
              {filteredServiceProviders.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                  <p className="text-sm text-gray-500">
                    Showing {paginatedServiceProviders.length} of{" "}
                    {filteredServiceProviders.length} service providers
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="hidden sm:flex space-x-2">
                      {generatePageNumbers().map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === pageNumber
                              ? "bg-emerald-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>

                    <div className="sm:hidden">
                      <span className="px-3 py-1">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {filteredServiceProviders.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No service providers found
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  </AgentLayout>
  );
};

export default ServiceProviderListAgent;
