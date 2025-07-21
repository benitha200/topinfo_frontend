import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Provinces, Districts, Sectors } from "rwanda";
import API_URL from "../constants/Constants";
import PhoneInput from "../components/website/PhoneInput";

const BecomeProvider = () => {
  const origin = window.location.origin;

  const [availableSectors, setAvailableSectors] = useState([]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    work_email: "",
    phone: "",
    description: "",
    discount_percentage:"",
    experience: "",
    location_province: "",
    location_district: "",
    location_sector: "",
    provinces: [], // Array of selected province objects
    districts: [], // Array of selected district objects
    sectors: [], 
    location_serve: "",
    additional_info: "",
    service_category_id: "",
    total_district_cost: 0,
    total_sector_cost: 0,
    approved: false,
    paymentMethod: "",
    paymentNumber: "",
  });

  const [categories, setCategories] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [step, setStep] = useState(1);
  const [paymentInit, setPaymentInit] = useState(false);
  const [providerID, setProviderID] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [settings, setSettings] = useState();
  const [paymentFail, setPaymentFail] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [provinces1] = useState(Provinces());
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    setProvinces(Provinces());
    fetchServiceCategories();
    fetchSettings();
  }, []);

  const fetchServiceCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/service-categories`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch service categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Could not load service categories");
    }
  };


  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Try to parse error response
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch settings");
      }

      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error("Error fetching settings:", err);

      setError(err.message || "Could not load settings");
    }
  };

  // Update districts when province changes
  useEffect(() => {
    if (formData.location_province) {
      const provinceDistricts = Districts(formData.location_province);
      setDistricts(provinceDistricts || []);

      // Reset dependent fields
      setFormData((prev) => ({
        ...prev,
        location_district: "",
        location_sector: "",
      }));
      setSectors([]);
      // setCells([]);
    }
  }, [formData.location_province]);

  // Update sectors when district changes
  useEffect(() => {
    if (formData.location_province && formData.location_district) {
      const districtSectors = Sectors(
        formData.location_province,
        formData.location_district
      );
      setSectors(districtSectors || []);

      // Reset dependent fields
      setFormData((prev) => ({
        ...prev,
        location_sector: "",
      }));
      // setCells([]);
    }
  }, [formData.location_province, formData.location_district]);

  // const handleProvinceChange = (selectedProvinces) => {
  //   // Get districts for selected provinces
  //   const districts = selectedProvinces.flatMap((province) =>
  //     Districts(province.value).map((district) => ({
  //       value: district,
  //       label: `${district} (${province.value})`,
  //     }))
  //   );

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     provinces: selectedProvinces,
  //     districts: [], // Reset districts when provinces change
  //     total_district_cost: 0,
  //   }));
  //   setAvailableDistricts(districts);
  // };


  const handleProvinceChange = (selectedProvinces) => {
    const districts = selectedProvinces.flatMap((province) =>
      Districts(province.value).map((district) => ({
        value: district,
        label: `${district} (${province.value})`,
        province: province.value
      }))
    );

    setFormData((prevState) => ({
      ...prevState,
      provinces: selectedProvinces,
      districts: [],
      sectors: [], // Reset sectors when provinces change
      total_district_cost: 0,
      total_sector_cost: 0,
    }));
    setAvailableDistricts(districts);
    setAvailableSectors([]); // Reset available sectors
  };

  // Update handleMultiDistrictChange to update available sectors
  const handleMultiDistrictChange = (selectedDistricts) => {
    const price = getCategoryPrice(formData.service_category_id);
    const districtCost = selectedDistricts.length * price;

    // Get all available sectors for selected districts
    const sectors = selectedDistricts.flatMap((district) =>
      Sectors(district.province, district.value).map((sector) => ({
        value: sector,
        label: `${sector} (${district.value}, ${district.province})`,
        district: district.value,
        province: district.province
      }))
    );

    setAvailableSectors(sectors);
    setFormData((prevState) => ({
      ...prevState,
      districts: selectedDistricts,
      sectors: [], // Reset sectors when districts change
      total_district_cost: districtCost,
      total_sector_cost: 0,
    }));
  };

  const getCategoryPrice = (categoryId) => {
    if (!settings || !settings.categoryPrices) return settings?.provider_price || 3000;

    const categoryPrice = settings.categoryPrices.find(
      (price) => price.category_id === parseInt(categoryId)
    );

    return categoryPrice ? categoryPrice.provider_price : settings.provider_price;
  };

  useEffect(() => {
    if (formData.districts.length > 0 && formData.service_category_id) {
      const price = getCategoryPrice(formData.service_category_id);
      const districtCost = formData.districts.length * price;

      setFormData((prevState) => ({
        ...prevState,
        total_district_cost: districtCost,
      }));
    }
  }, [formData.service_category_id]);

  const handleMultiSectorChange = (selectedSectors) => {
    const price = getCategoryPrice(formData.service_category_id);
    const sectorCost = selectedSectors.length * (price / 2); // Assuming sector cost is half of district cost

    setFormData((prevState) => ({
      ...prevState,
      sectors: selectedSectors,
      total_sector_cost: sectorCost,
    }));
  };

  const getDistrictsLabel = () => {
    const price = getCategoryPrice(formData.service_category_id);
    return `Akarere (${price} Rwf kuri buri karere)`;
  };
  const getSectorsLabel = () => {
    const price = getCategoryPrice(formData.service_category_id);
    return ""
    // return `Imirenge (${price/2} Rwf kuri buri murenge)`; // Half price for sectors
  };

  // const handleMultiDistrictChange = (selectedDistricts) => {
  //   const price = getCategoryPrice(formData.service_category_id);
  //   const districtCost = selectedDistricts.length * price;

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     districts: selectedDistricts,
  //     total_district_cost: districtCost,
  //   }));
  // };


  // Transform Provinces to react-select format
  const provinceOptions = Provinces().map((province) => ({
    value: province,
    label: province,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/service-providers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service_category_id: parseInt(formData.service_category_id),
          approved: true,
          approved_by: null,
          provinces: formData.provinces.map((p) => p.value).join(", "),
          districts: formData.districts.map((d) => d.value).join(", "),
          location_serve: formData.sectors.map((s) => s.value).join(", "), // Add sectors
          sectors: formData.sectors.map((s) => s.value).join(", "),
          total_cost: formData.total_district_cost + formData.total_sector_cost, // Update total cost
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.error && errorData.error.includes("email_key")) {
          throw new Error(
            "Imeli wakoresheje yamaze gukoreshwa, mwakoresha indi email, Murakoze!"
          );
        }

        throw new Error(
          errorData.message || "Failed to submit service provider application"
        );
      }

      const responseData = await response.json();
      setAmountToPay(responseData.total_district_cost);
      setProviderID(responseData.id);

      setShowSuccess(true);
      // Reset form after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        work_email: "",
        phone: "",
        description: "",
        discount_percentage:"",
        experience: "",
        provinces: [],
        districts: [],
        location_sector: "",
        location_province: "",
        location_district: "",
        location_serve: "",
        additional_info: "",
        service_category_id: "",
        total_district_cost: 0,
        approved: true,
        paymentMethod: "",
        paymentNumber: "",
      });
      setAvailableDistricts([]);

      setTimeout(() => setShowSuccess(false), 5000);
      setStep(2);
    }  catch (err) {
      console.error("Submission error:", err);
      
      // Check if the error is about unique email constraint
      if (err.message && err.message.includes('ServiceProvider_email_key')) {
        setError("Iyi email yamaze gukoreshwa,subiramo ukoreshe indi email!");
      } else {
        setError(err.message);
      }
    }
  };

  const handleFinalStep = async (e) => {
    e.preventDefault();
    setError(null);

    setPaymentInit(true);

    try {
      const token = localStorage.getItem("token");
      const paymentResponse = await fetch(`${API_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentNumber: formData.paymentNumber,
          providerID,
          type: "provider",
        }),
      });

      if (!paymentResponse.ok)
        throw new Error("Failed to initial payment request");
      const result = await paymentResponse.json();

      if (!result.success) {
        setPaymentInit(false);
        setPaymentFail(result);
      } else {
        setPaymentSuccess(true);
      }

      // if (result.response.status === "success") {
      //   window.location.href = result.response.meta.authorization.redirect;
      // }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
    }
  };

  return (
    <>
      {paymentSuccess ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
            <CheckCircle
              size={80}
              className="mx-auto text-green-500 mb-4"
              strokeWidth={1.5}
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Byagenze Neza!
              </h2>
              <p className="text-gray-600 mb-6">
                Murakoze gukoresha TopInfo. Kwishyura Byagenze Neza!
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-sky-800 mb-2">Ibikurikira</h3>
                <p className="text-sky-700">
                  Mukanya gato, Ibindi bikurikira turabibamenyesha muri
                  Imeli/SMS
                </p>
              </div>
              <div className="border-t pt-6 text-sm text-gray-500">
                <p>
                  Ukeneye Ubufasha? Twandikira kuri:{" "}
                  <a
                    href="tel:+250785283910"
                    className="text-sky-600 hover:underline"
                  >
                    +250 785 025 495
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Iyandikishe mubatanga service
              </h1>
              <p className="text-gray-600">
                Uzuza form ikurikira kugirango utangire gutanga serivisi zawe
                biciye muri topInfo
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-medium">Habonetse Ikosa!</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-green-800 font-medium">Byagenze neza!</h3>
                  <p className="text-green-700">
                    Serivisi yawe yoherejwe neza. Tuzakumenyesha vuba.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              {step === 1 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Izina ryambere
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        required
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        placeholder="Andika izina ryawe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Izina ryanyuma
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        required
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        placeholder="Andika izina ryanyuma"
                      />
                    </div>
                  </div>

                  {/* Email Fields */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Imeri yawe
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        placeholder="Andika imeri yawe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="work_email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Imeri yo mu kazi
                      </label>
                      <input
                        type="email"
                        id="work_email"
                        name="work_email"
                        value={formData.work_email}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        placeholder="Imeri yo mu kazi (igihe ufite)"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ibisobanuro ku murimo ushaka gutanga
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                      placeholder="Sobanura serivisi utanga..."
                    />
                  </div>
                   {/* Discount percentage */}
                  <div>
                    <label
                      htmlFor="discount_percentage"
                      className="block text-sm font-bold text-gray-700 mb-1"
                    >
                      Discount utanga (%)
                    </label>
                    <input
                      id="discount_percentage"
                      name="discount_percentage"
                      required
                      type="number"
                      value={formData.discount_percentage}
                      onChange={handleInputChange}
                      className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                      placeholder="Discount utanga..."
                    />
                  </div>

                  {/* Phone and Service Category */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Telefoni
                      </label>
                      <PhoneInput
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service_category_id"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Icyiciro cy'Serivisi
                      </label>
                      <select
                        id="service_category_id"
                        name="service_category_id"
                        required
                        value={formData.service_category_id}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                      >
                        <option value="">Hitamo icyiciro</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>



                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="location_province"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Intara
                      </label>
                      <select
                        id="location_province"
                        name="location_province"
                        value={formData.location_province}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        required
                      >
                        <option value="">Select Province</option>
                        {provinces1.map((province) => (
                          <option key={province} value={province}>
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
                        Akarere
                      </label>
                      <select
                        id="location_district"
                        name="location_district"
                        value={formData.location_district}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        disabled={!formData.location_province}
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
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
                        Umurenge
                      </label>
                      <select
                        id="location_sector"
                        name="location_sector"
                        value={formData.location_sector}
                        onChange={handleInputChange}
                        className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                        disabled={!formData.location_district}
                        required
                      >
                        <option value="">Select Sector</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Provinces Multi-Select */}
                  <div className="mt-6">
                    <label
                      htmlFor="provinces"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Intara ushaka gutanga serivisi
                    </label>
                    <Select
                      isMulti
                      name="provinces"
                      options={provinceOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={formData.provinces}
                      onChange={handleProvinceChange}
                      placeholder="Hitamo intara"
                    />
                  </div>



                  {formData.provinces.length > 0 && (
                    <div className="mt-6">
                      <label
                        htmlFor="districts"
                        className="block text-sm font-medium text-red-700 mb-1"
                      >
                        {getDistrictsLabel()}
                      </label>
                      <Select
                        isMulti
                        name="districts"
                        options={availableDistricts}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={formData.districts}
                        onChange={handleMultiDistrictChange}
                        placeholder="Hitamo akarere"
                      />
                      {formData.districts.length > 0 && (
                        <div className="mt-2 flex text-md font-semibold text-sky-600">
                          <AlertCircle className="h-5 w-5 text-sky-600 mr-1" />
                          Amafaranga yose hamwe: {formData.total_district_cost.toLocaleString()} Rwf
                        </div>
                      )}
                    </div>
                  )}

                  {formData.districts.length > 0 && (
                    <div className="mt-6">
                      <label
                        htmlFor="sectors"
                        className="block text-sm font-medium text-red-700 mb-1"
                      >
                        {getSectorsLabel()}
                      </label>
                      <Select
                        isMulti
                        name="sectors"
                        options={availableSectors}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={formData.sectors}
                        onChange={handleMultiSectorChange}
                        placeholder="Hitamo imirenge"
                      />
                      {/* {formData.sectors.length > 0 && (
                        <div className="mt-2 flex text-md font-semibold text-sky-600">
                          <AlertCircle className="h-5 w-5 text-sky-600 mr-1" />
                          Amafaranga yose hamwe y'imirenge: {formData.total_sector_cost.toLocaleString()} Rwf
                        </div>
                      )} */}
                    </div>
                  )}

                  {/* {(formData.districts.length > 0 || formData.sectors.length > 0) && (
                    <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                      <h3 className="font-semibold text-sky-800 mb-2">Amafaranga yose hamwe</h3>
                      <div className="space-y-2">
                        {formData.districts.length > 0 && (
                          <p>Uturerere: {formData.total_district_cost.toLocaleString()} Rwf</p>
                        )}
                        {formData.sectors.length > 0 && (
                          <p>Imirenge: {formData.total_sector_cost.toLocaleString()} Rwf</p>
                        )}
                        <p className="font-bold">
                          Total: {(formData.total_district_cost + formData.total_sector_cost).toLocaleString()} Rwf
                        </p>
                      </div>
                    </div>
                  )} */}

                  {/* Experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Uburambe
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                    >
                      <option value="">Hitamo uburambe bwawe</option>
                      <option value="0-1 year">Munsi y'umwaka umwe</option>
                      <option value="1-2 years">Hagati y'umwaka 1 ni 2</option>
                      <option value="2-3 years">Hagati y'umwaka 2 ni 3</option>
                      <option value="3-5 years">Hagati ya 3 na 5 myaka</option>
                      <option value="5+ years">Imyaka 5 kuzamura</option>
                    </select>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <label
                      htmlFor="additional_info"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Amakuru yinyongera
                    </label>
                    <textarea
                      id="additional_info"
                      name="additional_info"
                      rows={3}
                      value={formData.additional_info}
                      onChange={handleInputChange}
                      className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
                      placeholder="Amakuru yinyongera ku murimo wawe..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full rounded bg-sky-500 px-6 py-3 text-lg font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      Ohereza
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <>
                  <h1 className="text-2xl font-bold mb-4">Kwishyura</h1>
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  {paymentInit && (
                    <div className="p-4 bg-sky-50 border border-sky-200 rounded-md">
                      <p className="text-sky-600">
                        wohererejwe ubutumwa bwo kwishyura, reba kuri telephone
                        yawe wemeze kwishyura cyangwa ukande *182*7*1#
                      </p>
                    </div>
                  )}
                  {paymentFail && (
                    <div className="p-4 bg-red-200 border border-red-300 rounded-md mb-4">
                      <p className="text-red-600">{paymentFail.message}</p>
                    </div>
                  )}
                  <form onSubmit={handleFinalStep}>
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
                            onChange={handleInputChange}
                            checked={formData.paymentMethod === "momo"}
                          />
                          <span className="ml-2">MTN Mobile Money</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="airtel"
                            onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        name="paymentNumber"
                        value={formData.paymentNumber}
                        required
                      />
                    </div>

                    <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 flex items-start">
                      <AlertCircle className="h-7 w-7 text-emerald-600 mr-3" />
                      <div>
                        <h2 className="text-center font-semibold text-emerald-600">
                          Amafaranga wishyura : <strong>{amountToPay}</strong>{" "}
                          RWF
                        </h2>
                      </div>
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
        </div>
      )}
    </>
  );
};

export default BecomeProvider;
