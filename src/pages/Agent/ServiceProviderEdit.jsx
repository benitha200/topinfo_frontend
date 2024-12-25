import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import AgentLayout from "./AgentLayout";
import axios from "axios";
import { toast } from "sonner";
import API_URL from "../../constants/Constants";

const ServiceProviderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service_category_id: "",
    experience: "",
    location_province: "",
    location_district: "",
    bio: "",
    specializations: "",
    approved: false,
  });

  // Fetch the token
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          toast.error("Authentication failed");
          return;
        }

        // Fetch service provider details
        const serviceProviderResponse = await axios.get(
          `${API_URL}/service-providers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch service categories
        const categoriesResponse = await axios.get(
          `${API_URL}/service-categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(serviceProviderResponse.data);
        setServiceCategories(categoriesResponse.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load service provider details");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await axios.put(
        `${API_URL}/service-providers/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service provider updated successfully");
      navigate(`/agent-dashboard/serviceprovider-agent/view/${id}`);
    } catch (error) {
      toast.error("Failed to update service provider");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    navigate(`/agent-dashboard/serviceprovider-agent/view/${id}`);
  };

  if (isLoading) {
    return (
      <AgentLayout>
        <div className="p-4">
          <p>Loading service provider details...</p>
        </div>
      </AgentLayout>
    );
  }

  return (
    <AgentLayout>
      <div className="space-y-6 p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="hover:bg-slate-100"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Edit Service Provider</CardTitle>
              <CardDescription>
                Update the service provider's information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <Input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Service Category
                    </label>
                    <select
                      name="service_category_id"
                      value={formData.service_category_id}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2"
                      required
                    >
                      <option value="">Select a category</option>
                      {serviceCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Province
                    </label>
                    <Input
                      name="location_province"
                      value={formData.location_province}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      District
                    </label>
                    <Input
                      name="location_district"
                      value={formData.location_district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Specializations
                    </label>
                    <Textarea
                      name="specializations"
                      value={formData.specializations}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="approved"
                      checked={formData.approved}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <label className="text-sm font-medium">
                      Approve Service Provider
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={16} />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AgentLayout>
  );
};

export default ServiceProviderEdit;