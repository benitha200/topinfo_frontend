import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "../AdminLayout";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../../constants/Constants";
import { AlertCircle, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateService = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultfields = [
    "Izina rya mbere",
    "Izina rya kabiri",
    "Imeri",
    "Numero ya telephone",
    "Intara",
    "Akarere",
    "Umurenge",
  ];

  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      fieldName: "",
      inputType: "text",
      isRequired: false,
      options: [""],
    },
  ]);

  // Fetch existing service details when component mounts
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/service-categories/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch service details");
        
        const serviceData = await response.json();
        
        // Populate form with existing data
        setServiceName(serviceData.name);
        setDescription(serviceData.details);
        
        // Ensure fields have unique IDs and are populated
        const populatedFields = serviceData.fields.map(field => ({
          ...field,
          id: uuidv4(),
          options: field.options && field.options.length > 0 
            ? field.options 
            : ["Option 1"]
        }));

        setFields(populatedFields.length > 0 ? populatedFields : [
          {
            id: uuidv4(),
            fieldName: "",
            inputType: "text",
            isRequired: false,
            options: [""],
          }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        fieldName: "",
        inputType: "text",
        isRequired: false,
        options: ["Option 1"],
      },
    ]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleAddOption = (id) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`],
            }
          : field
      )
    );
  };

  const handleRemoveOption = (fieldId, optionIndex) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : field
      )
    );
  };

  const handleOptionChange = (fieldId, optionIndex, value) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.map((option, index) =>
                index === optionIndex ? value : option
              ),
            }
          : field
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/service-categories/${id}`, {
        method: "PUT", // Use PUT for update
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serviceName,
          details: description,
          fields: fields,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to update category");
      
      // Redirect to service list or details page after successful update
      navigate("/dashboard/service");
    } catch (error) {
      console.error("Error updating service:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          Loading service details...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Update Service Category</h1>
        </div>

        <Card className="bg-white">
          <CardContent>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                {/* Error Handling */}
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

                {/* Service Name and Description */}
                <div className="grid grid-cols-3 gap-4 mb-4 border p-4 rounded">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                {/* Default Fields */}
                <Card className="w-full mx-auto bg-emerald-50 rounded mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-emerald-800 mb-2">
                      Default Fields
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap justify-between gap-x-4 gap-y-1 items-center">
                    {defaultfields.map((field, index) => (
                      <div key={index} className="text-emerald-700 text-sm">
                        {field}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Additional Fields */}
                <span className="font-semibold text-xl pb-4">
                  Update Additional Fields
                </span>

                {/* Dynamic Fields */}
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-5 gap-4 mt-4 mb-4 border p-4 rounded"
                  >
                    {/* Field Name */}
                    <div className="col-span-3">
                      <label className="block text-sm font-medium mb-1">
                        Field Name
                      </label>
                      <input
                        type="text"
                        value={field.fieldName}
                        onChange={(e) =>
                          handleFieldChange(
                            field.id,
                            "fieldName",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    {/* Input Type */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">
                        Input Type
                      </label>
                      <select
                        value={field.inputType}
                        onChange={(e) =>
                          handleFieldChange(
                            field.id,
                            "inputType",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="text">Short Answer</option>
                        <option value="textarea">Paragraph</option>
                        <option value="select">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio Button</option>
                        <option value="date">Date</option>
                      </select>
                    </div>

                    {/* Remove Field Button */}
                    <div className="col-span-1 flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveField(field.id)}
                        className="px-3 py-3 bg-red-400 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Dropdown Options */}
                    {(field.inputType === "radio" ||
                      field.inputType === "select" ||
                      field.inputType === "checkbox") && (
                      <div className="col-span-5">
                        <label className="block text-sm font-medium mb-1">
                          Options
                        </label>
                        {field.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  field.id,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveOption(field.id, optionIndex)
                              }
                              className="px-3 py-3 bg-red-400 text-white rounded hover:bg-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddOption(field.id)}
                          className="px-4 py-2 bg-sky-400 rounded text-white hover:bg-sky-600"
                        >
                          Add Option
                        </button>
                      </div>
                    )}

                    {/* Required Checkbox */}
                    <div className="col-span-5">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.isRequired}
                          onChange={(e) =>
                            handleFieldChange(
                              field.id,
                              "isRequired",
                              e.target.checked
                            )
                          }
                        />
                        Required
                      </label>
                    </div>
                  </div>
                ))}

                {/* Add New Field Button */}
                <button
                  type="button"
                  onClick={handleAddField}
                  className="px-4 py-2 mr-3 bg-sky-400 text-white rounded hover:bg-sky-600"
                >
                  Add New Field
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 px-4 py-2 bg-emerald-400 text-white rounded hover:bg-green-600"
                >
                  {loading ? "Updating ...." : "Update Service"}
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UpdateService;