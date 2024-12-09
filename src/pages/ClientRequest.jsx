import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../constants/Constants";
import { Districts, Provinces, Sectors } from "rwanda";
import Select from "react-select";
import { ArrowRight, ChevronRight } from "lucide-react";

const ClientRequest = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInit, setPaymentInit] = useState(false);
  const [clientId, setClientId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [step, setStep] = useState(1);
  const origin = window.location.origin;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location_province: "",
    location_district: "",
    location_sector: "",
    paymentMethod: "",
    paymentNumber: "",
    district: "",
    dynamicFields: {},
    message_preference: "",
  });

  const provinceOptions = Provinces().map((province) => ({
    value: province,
    label: province,
  }));

  const [districtOptions1, setDistrictOptions1] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);

  const handleProvinceChange = (selectedProvince) => {
    handleStaticFieldChange("location_province", selectedProvince.value);

    // Get districts for the selected province
    const provincialDistricts = Districts(selectedProvince.value).map((district) => ({
      value: district,
      label: district,
    }));

    setDistrictOptions1(provincialDistricts);
    // Reset district and sector when province changes
    handleStaticFieldChange("location_district", "");
    handleStaticFieldChange("location_sector", "");
    setSectorOptions([]);
  };

  const handleDistrictChange = (selectedDistrict) => {
    console.log(districtOptions1)
    handleStaticFieldChange("location_district", selectedDistrict.value);

    try {
      // Ensure you're using the correct province name
      const districtSectors = Sectors(formData.location_province, selectedDistrict.value);

      if (districtSectors && districtSectors.length > 0) {
        const sectorOptions = districtSectors.map((sector) => ({
          value: sector,
          label: sector,
        }));

        setSectorOptions(sectorOptions);
      } else {
        console.warn('No sectors found for this district');
        setSectorOptions([]);
      }
    } catch (error) {
      console.error('Error fetching sectors:', error);
      setSectorOptions([]);
    }

    // Reset sector when district changes
    handleStaticFieldChange("location_sector", "");
  };

  const districtOptions = Districts().map((district) => ({
    value: district,
    label: district,
  }));

  // Fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/service-categories/${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  // Loading and error handling
  if (loading) return <p>Loading service details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!service)
    return <p>Service not found. Please go back and select a service.</p>;

  // Handlers for form input changes
  const handleStaticFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDynamicFieldChange = (fieldId, value, isChecked = null) => {
    setFormData((prevData) => {
      if (isChecked === null) {
        // For select or radio buttons
        return {
          ...prevData,
          dynamicFields: {
            ...prevData.dynamicFields,
            [fieldId]: value,
          },
        };
      } else {
        // For checkboxes
        const currentValues = prevData.dynamicFields[fieldId] || [];
        return {
          ...prevData,
          dynamicFields: {
            ...prevData.dynamicFields,
            [fieldId]: isChecked
              ? [...currentValues, value] // Add value if checked
              : currentValues.filter((item) => item !== value), // Remove value if unchecked
          },
        };
      }
    });
  };

  // Step form submission handlers
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    try {
      // Create client
      const clientResponse = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email || "default@gmail.com",
          phone: formData.phone,
          location_province: formData.location_province,
          location_district: formData.location_district,
          location_sector: formData.location_sector,
        }),
      });

      if (!clientResponse.ok) throw new Error("Failed to create client");
      const clientData = await clientResponse.json();
      setClientId(clientData.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setStep(2); // Move to Step 2
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    try {
      // Convert message_preference array to a comma-separated string
      const messagePreference = Array.isArray(formData.message_preference)
        ? formData.message_preference.join(',')
        : formData.message_preference || '';

      const requestResponse = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          your_location: formData.location_district,
          service_location: formData.location_district,
          client_id: clientId,
          service_category_id: parseInt(serviceId),
          fields: formData.dynamicFields,
          service_date: new Date().toISOString().split("T")[0],
          message_preference: messagePreference,
        }),
      });

      if (!requestResponse.ok) throw new Error("Failed to create request");
      const requestData = await requestResponse.json();

      setRequestId(requestData.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    setStep(3); // Move to Step 3
  };

  // with redirect

  const handleSubmitStep3 = async (e) => {
    e.preventDefault(); // Prevent form submission
    setPaymentInit(true);

    try {
      const paymentResponse = await fetch(`${API_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          service_location: formData.district,
          paymentNumber: formData.paymentNumber,
          request_id: requestId,
          currentUrl: `${origin}/payment-callback`,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to initiate payment request");
      }

      const result = await paymentResponse.json();
      console.log(result);

      if (result.response.status === "success") {
        // Get the redirect URL from the response
        const redirectUrl = result.response.meta.authorization.redirect;

        // Redirect in the same tab
        window.location.href = redirectUrl;
      }
    } catch (err) {
      setError(err.message);
      console.error("Payment initiation error:", err);

      // Optionally, display an error message to the user
      // toast.error("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4">1: Amakuru y'ibanze</h1>
            <form onSubmit={handleSubmitStep1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { field: "firstname", label: "Izina rya mbere" },
                  { field: "lastname", label: "Izina rya nyuma" },
                  { field: "email", label: "Imeri" },
                  { field: "phone", label: "Nomero ya telefone" }
                ].map(({ field, label }) => (
                  <div key={field} className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      className="w-full p-2 border rounded"
                      onChange={(e) => handleStaticFieldChange(field, e.target.value)}
                      value={formData[field]}
                      {...(field !== "email" ? { required: true } : {})}
                    />
                  </div>
                ))}

                {/* {[
                  { field: "location_province", label: "Intara" },
                  { field: "location_district", label: "Akarere" },
                  { field: "location_sector", label: "Umurenge" }
                ].map(({ field, label }) => (
                  <div key={field} className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      onChange={(e) => handleStaticFieldChange(field, e.target.value)}
                      value={formData[field]}
                      required
                    />
                  </div>
                ))}
              </div> */}

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Intara</label>
                  <Select
                    options={provinceOptions}
                    onChange={handleProvinceChange}
                    value={
                      formData.location_province
                        ? { value: formData.location_province, label: formData.location_province }
                        : null
                    }
                    placeholder="Hitamo Intara"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Akarere</label>
                  <Select
                    options={districtOptions1}
                    onChange={handleDistrictChange}
                    value={
                      formData.location_district
                        ? { value: formData.location_district, label: formData.location_district }
                        : null
                    }
                    placeholder="Hitamo Akarere"
                    isDisabled={!formData.location_province}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Umurenge</label>
                  <Select
                    options={sectorOptions}
                    onChange={(selectedSector) =>
                      handleStaticFieldChange("location_sector", selectedSector.value)
                    }
                    value={
                      formData.location_sector
                        ? { value: formData.location_sector, label: formData.location_sector }
                        : null
                    }
                    placeholder="Hitamo Umurenge"
                    isDisabled={!formData.location_district}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">

                <button
                  type="submit"
                  className="px-4 py-2 flex bg-sky-500 text-white rounded hover:bg-sky-600"
                >
                  <span className="font-semibold">Komeza </span><ArrowRight size={20} className="mt-1" />
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 2: Dynamic Fields */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4">
              2: Amakuru ya Serivisi
              {/* <span> Client Id : {clientId}</span> */}
            </h1>
            <form onSubmit={handleSubmitStep2}>
              {service?.fields?.map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.fieldName}
                  </label>

                  {field.inputType === "text" && (
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      onChange={(e) =>
                        handleDynamicFieldChange(field.id, e.target.value)
                      }
                      required={field.isRequired}
                    />
                  )}
                  {field.inputType === "date" && (
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      onChange={(e) =>
                        handleDynamicFieldChange(field.id, e.target.value)
                      }
                      required={field.isRequired}
                    />
                  )}

                  {field.inputType === "textarea" && (
                    <textarea
                      className="w-full p-2 border rounded"
                      onChange={(e) =>
                        handleDynamicFieldChange(field.id, e.target.value)
                      }
                      required={field.isRequired}
                    />
                  )}

                  {field.inputType === "select" && (
                    <select
                      className="w-full p-2 border rounded"
                      onChange={(e) =>
                        handleDynamicFieldChange(field.id, e.target.value)
                      }
                      required={field.isRequired}
                    >
                      <option value="">-- Select an option --</option>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.inputType === "radio" && (
                    <div className="w-full p-2 border rounded">
                      {field.options.map((option, idx) => (
                        <label key={idx} className="block">
                          <input
                            type="radio"
                            name={field.id} // Group radios by field ID
                            value={option}
                            className="mr-2"
                            onChange={(e) =>
                              handleDynamicFieldChange(field.id, e.target.value)
                            }
                            required={field.isRequired}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  {field.inputType === "checkbox" && (
                    <div className="w-full p-2 border rounded">
                      {field.options.map((option, idx) => (
                        <label key={idx} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            className="mr-2"
                            onChange={(e) =>
                              handleDynamicFieldChange(
                                field.id,
                                option,
                                e.target.checked
                              )
                            }
                            required={field.isRequired}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}


              <div className="mb-4">
                <span className="block text-sm font-medium mb-2">
                  Hitamo uburyo bwo kwakira ubutumwa
                </span>
                <div className="space-y-2">
                  {/* Email Checkbox */}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="messagePreference"
                      value="EMAIL"
                      className="mr-2"
                      checked={formData.message_preference?.includes('EMAIL') || formData.message_preference?.includes('BOTH')}
                      onChange={(e) => {
                        const currentPreferences = formData.message_preference || [];
                        let newPreferences;

                        if (e.target.checked) {
                          // Add EMAIL to preferences
                          newPreferences = [...currentPreferences, 'EMAIL'];
                        } else {
                          // Remove EMAIL from preferences
                          newPreferences = currentPreferences.filter((pref) => pref !== 'EMAIL');
                        }

                        // Set BOTH if both are selected
                        if (newPreferences.includes('EMAIL') && newPreferences.includes('SMS')) {
                          newPreferences = ['BOTH'];
                        }

                        handleStaticFieldChange('message_preference', newPreferences);
                      }}
                    />
                    <span>Email</span>
                  </label>

                  {/* SMS Checkbox */}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="messagePreference"
                      value="SMS"
                      className="mr-2"
                      checked={formData.message_preference?.includes('SMS') || formData.message_preference?.includes('BOTH')}
                      onChange={(e) => {
                        const currentPreferences = formData.message_preference || [];
                        let newPreferences;

                        if (e.target.checked) {
                          // Add SMS to preferences
                          newPreferences = [...currentPreferences, 'SMS'];
                        } else {
                          // Remove SMS from preferences
                          newPreferences = currentPreferences.filter((pref) => pref !== 'SMS');
                        }

                        // Set BOTH if both are selected
                        if (newPreferences.includes('EMAIL') && newPreferences.includes('SMS')) {
                          newPreferences = ['BOTH'];
                        }

                        handleStaticFieldChange('message_preference', newPreferences);
                      }}
                    />
                    <span>SMS</span>
                  </label>
                </div>
              </div>



              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 flex py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                >
                  <span className="font-semibold">Komeza </span><ArrowRight size={20} className="mt-1" />
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Finalize Request */}
        {/* {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-4">3: Uzuza Amakuru yo kwishyura</h1>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {paymentInit && (
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-md">
                <p className="text-sky-600">
                  Payment request sent. Please check your phone for the payment
                  prompt.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmitStep3}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Akarere ukeneyemo service
                </label>
                <Select
                  options={districtOptions}
                  onChange={(selected) =>
                    handleStaticFieldChange("district", selected.value)
                  }
                  value={
                    formData.district
                      ? { value: formData.district, label: formData.district }
                      : null
                  }
                  placeholder="Choose a district"
                />
              </div>

              <div className="mb-4">
                <span className="block text-sm font-medium mb-2">
                  Payment Method
                </span>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      onChange={(e) =>
                        handleStaticFieldChange("paymentMethod", e.target.value)
                      }
                      checked={formData.paymentMethod === "momo"}
                    />
                    <span className="ml-2">MTN Mobile Money</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="airtel"
                      onChange={(e) =>
                        handleStaticFieldChange("paymentMethod", e.target.value)
                      }
                      checked={formData.paymentMethod === "airtel"}
                    />
                    <span className="ml-2">Airtel Money</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Payment Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    handleStaticFieldChange("paymentNumber", e.target.value)
                  }
                  value={formData.paymentNumber}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={paymentInit}
                  className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {paymentInit ? "Tegereza..." : "Ishyura"}
                </button>
              </div>
            </form>
          </>
        )} */}
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-4">3: Uzuza Amakuru yo kwishyura</h1>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {paymentInit && (
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-md">
                <p className="text-sky-600">
                  Payment request sent. Please check your phone for the payment prompt.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitStep3}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Akarere ukeneyemo service
                </label>
                <Select
                  options={districtOptions}
                  onChange={(selected) =>
                    handleStaticFieldChange("district", selected.value)
                  }
                  value={
                    formData.district
                      ? { value: formData.district, label: formData.district }
                      : null
                  }
                  placeholder="Choose a district"
                />
              </div>

              {/* New section for message preferences */}


              <div className="mb-4">
                <span className="block text-sm font-medium mb-2">
                  Uburyo bwo kwishyura
                </span>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      onChange={(e) =>
                        handleStaticFieldChange("paymentMethod", e.target.value)
                      }
                      checked={formData.paymentMethod === "momo"}
                    />
                    <span className="ml-2">MTN Mobile Money</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="airtel"
                      onChange={(e) =>
                        handleStaticFieldChange("paymentMethod", e.target.value)
                      }
                      checked={formData.paymentMethod === "airtel"}
                    />
                    <span className="ml-2">Airtel Money</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nimero ukoresha wishyura
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    handleStaticFieldChange("paymentNumber", e.target.value)
                  }
                  value={formData.paymentNumber}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={paymentInit}
                  className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {paymentInit ? "Tegereza..." : "Ishyura"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientRequest;
