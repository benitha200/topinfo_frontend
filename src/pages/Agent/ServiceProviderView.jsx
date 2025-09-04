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
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
} from "lucide-react";
import AgentLayout from "./AgentLayout";
import axios from "axios";
import { toast } from "sonner";
import API_URL from "../../constants/Constants";

const ServiceProviderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceProvider, setServiceProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the token
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        if (!token) {
          toast.error("Authentication failed");
          return;
        }

        const response = await axios.get(
          `${API_URL}/service-providers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setServiceProvider(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load service provider details");
        setIsLoading(false);
      }
    };

    fetchServiceProvider();
  }, [id, token]);

  const handleEdit = () => {
    navigate(`/agent-dashboard/serviceprovider-agent/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/agent-dashboard/service-provider-agent");
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            variant="ghost"
            className="hover:bg-slate-100"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to List
          </Button>
          <Button
            onClick={handleEdit}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <Edit className="mr-2" size={16} />
            Edit Details
          </Button>
        </div>

        {/* Main Details Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">
                  {serviceProvider.firstname} {serviceProvider.lastname}
                </CardTitle>
                <CardDescription className="mt-2">
                  Service Provider Details
                </CardDescription>
              </div>
              {renderApprovalBadge(serviceProvider.approved)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Full Name</p>
                      <p>{serviceProvider.firstname} {serviceProvider.lastname}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>{serviceProvider.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>{serviceProvider.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Service Category</p>
                      <p>{serviceProvider.service_category?.name || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Experience</p>
                      <p>{serviceProvider.experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="mt-1 text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{serviceProvider.location_province}, {serviceProvider.location_district}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div>
                      <p className="font-medium">Bio</p>
                      <p className="mt-2 text-gray-600">
                        {serviceProvider.bio || "No bio provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div>
                      <p className="font-medium">Specializations</p>
                      <p className="mt-2 text-gray-600">
                        {serviceProvider.specializations || "No specializations listed"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
};

export default ServiceProviderView;