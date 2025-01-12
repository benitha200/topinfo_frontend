import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AlertCircle } from "lucide-react";
import { Provinces, Districts, Sectors } from "rwanda";
import API_URL from "../../../constants/Constants";
import PhoneInput from "../../../components/website/PhoneInput";
import { useNavigate, useParams } from "react-router-dom";

const EditServiceProvider = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    work_email: "",
    phone: "",
    description: "",
    experience: "",
    location_province: "",
    location_district: "",
    location_sector: "",
    provinces: [],
    districts: [],
    sectors: [],
    location_serve: "",
    additional_info: "",
    service_category_id: "",
    approved: false,
  });

  const [categories, setCategories] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableSectors, setAvailableSectors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState();
  const { providerId } = useParams();
  const navigate = useNavigate(); 

  const [provinces1] = useState(Provinces());
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetchServiceProvider();
    fetchServiceCategories();
    fetchSettings();
  }, [providerId]);

  const fetchServiceProvider = async () => {

    console.info(`${API_URL}/service-providers/${providerId}`);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/service-providers/${providerId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch service provider");
      }

      const data = await response.json();
      
      // Transform the data to match the form structure
      const provincesArray = data.provinces?.split(", ")?.map(province => ({
        value: province,
        label: province
      }));
      
      const districtsArray = data.districts?.split(", ")?.map(district => ({
        value: district,
        label: district
      }));

      const sectorsArray = data.location_serve?.split(", ")?.map(sector => ({
        value: sector,
        label: sector
      }));

      setFormData({
        ...data,
        provinces: provincesArray,
        districts: districtsArray,
        sectors: sectorsArray,
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching service provider:", err);
      setError("Could not load service provider details");
      setLoading(false);
    }
  };

  const fetchServiceCategories = async () => {
    try {
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (formData.location_province) {
      const provinceDistricts = Districts(formData.location_province);
      setDistricts(provinceDistricts || []);
    }
  }, [formData.location_province]);

  useEffect(() => {
    if (formData.location_province && formData.location_district) {
      const districtSectors = Sectors(
        formData.location_province,
        formData.location_district
      );
      setSectors(districtSectors || []);
    }
  }, [formData.location_province, formData.location_district]);

  useEffect(() => {
    if (formData.districts.length > 0) {
      const sectors = formData.districts.flatMap((district) => {
        const provinceName = district.label.split(" (")[1]?.replace(")", "") || "";
        return Sectors(provinceName, district.value)?.map((sector) => ({
          value: sector,
          label: `${sector} (${district.value})`,
        }));
      });
      setAvailableSectors(sectors);
    }
  }, [formData.districts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const provinceOptions = Provinces().map((province) => ({
    value: province,
    label: province,
  }));

  const handleProvinceChange = (selectedProvinces) => {
    const districts = selectedProvinces.flatMap((province) =>
      Districts(province.value).map((district) => ({
        value: district,
        label: `${district} (${province.value})`,
      }))
    );

    setFormData((prevState) => ({
      ...prevState,
      provinces: selectedProvinces,
      districts: [],
      sectors: [],
    }));
    setAvailableDistricts(districts);
  };

  const handleMultiDistrictChange = (selectedDistricts) => {
    setFormData((prevState) => ({
      ...prevState,
      districts: selectedDistricts,
    }));
  };

  const handleMultiSectorChange = (selectedSectors) => {
    setFormData((prevState) => ({
      ...prevState,
      sectors: selectedSectors,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/service-providers/${providerId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          approved: formData.approved, 
          service_category_id: parseInt(formData.service_category_id),
          provinces: formData.provinces.map((p) => p.value).join(", "),
          districts: formData.districts.map((d) => d.value).join(", "),
          location_serve: formData.sectors.map((s) => s.value).join(", "),
        }),

      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update service provider"
        );
      }

      // Handle successful update
      alert("Service provider updated successfully");
      navigate("/dashboard/service-providers");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hindura Amakuru y'Utanga Serivisi
          </h1>
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

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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
                className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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
                <PhoneInput formData={formData} setFormData={setFormData} />
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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

            {/* Location Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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

            {/* Districts Multi-Select */}
            {formData.provinces.length > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="districts"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Uturere ushaka gutanga serivisi
                </label>
                <Select
                  isMulti
                  name="districts"
                  options={availableDistricts}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.districts}
                  onChange={handleMultiDistrictChange}
                  placeholder="Hitamo uturere"
                />
              </div>
            )}

            {/* Sectors Multi-Select */}
            {formData.districts.length > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="sectors"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Imirenge ushaka gutanga serivisi
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
              </div>
            )}

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
                className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Hitamo uburambe bwawe</option>
                <option value="0-1 year">Munsi y'umwaka umwe</option>
                <option value="1-2 years">Hagati y'umwaka 1 ni 2</option>
                <option value="2-3 years">Hagati y'umwaka 2 ni 3</option>
                <option value="3-5 years">Hagati ya 3 na 5 myaka</option>
                <option value="5+ years">Imyaka 5 kuzamura</option>
              </select>
            </div>

            <div className="flex items-center">
            <input
                type="checkbox"
                id="approved"
                name="approved"
                checked={formData.approved}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
                htmlFor="approved"
                className="ml-2 block text-sm font-medium text-gray-700"
            >
                Approved
            </label>
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

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded bg-sky-500 px-6 py-3 text-lg font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditServiceProvider;