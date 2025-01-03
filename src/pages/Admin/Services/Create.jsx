import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminLayout from "../AdminLayout";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../../constants/Constants";
import { AlertCircle, Trash2 } from "lucide-react";

const CreateService = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultfields = [
    "Izina rya mbere",
    "Izina rya kabiri",
    "Imeri",
    "Numero ya telephone",
    "Intara",
    "Akarere",
    "Umurenge",
  ];

  // Initialize with one default field with one option for dropdown
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      fieldName: "",
      inputType: "text", // Default input type set to 'Dropdown'
      isRequired: false,
      options: [""], // Default option
    },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        fieldName: "",
        inputType: "text",
        isRequired: false,
        options: ["Option 1"], // Default single option for 'select' fields
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
      const response = await fetch(`${API_URL}/service-categories`, {
        method: "POST",
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
      if (!response.ok) throw new Error("Failed to create category");
      window.location.href = "/dashboard/service";
    } catch (error) {
      console.error("Error saving service:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add Service Categories </h1>
        </div>

        <Card className="bg-white">
          <CardContent>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                {/* Service Name */}
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
                <div className="grid grid-cols-3 gap-4 mb-4 border p-4 rounded">
                  <div className="col-span-1">
                    <label htmlFor="serviceName" className="block text-sm font-medium mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      id="serviceName"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

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

                <span className="font-semibold text-xl pb-4">
                  Add Additional Fields
                </span>

                {/* Dynamic Fields */}
                {fields.map((field, index) => (
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
                  {loading ? "Loading ...." : "Save Service"}
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateService;
