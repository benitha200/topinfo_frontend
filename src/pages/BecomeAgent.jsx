import React, { useState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Provinces, Districts, Sectors, Cells } from "rwanda";
import API_URL from "../constants/Constants";

const BecomeAgent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location_province: "",
    location_district: "",
    location_sector: "",
    profileImage: null,
    nationalIdImage: null,
  });

  const [provinces] = useState(Provinces());
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
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

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
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

      setShowSuccess(true);
      // Reset form after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        location_province: "",
        location_district: "",
        location_sector: "",
        profileImage: "",
        nationalIdImage: "",
      });

      // Hide success message after 8 seconds
      setTimeout(() => setShowSuccess(false), 8000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Iyandikishe Kuba Agent
          </h1>
          <p className="text-gray-600">
            Uzuza form ikurikira kugirango utangire ube umu agent wacu
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
                Kwiyandikisha kwawe byagenze neza.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Izina rya mbere
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Izina rya Kabiri
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  required
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Imeri
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Numero ya Telephone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
                placeholder="Enter your phone number"
              />
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
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
                  className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-slate-500 focus:ring-slate-500"
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
            <div className="grid grid-cols-2 gap-4 my-3">
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium mb-1"
                >
                  Ifoto Yawe
                </label>
                <input
                  type="file"
                  id="profileImage"
                  required
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
                <label
                  htmlFor="national_id"
                  className="block text-sm font-medium mb-1"
                >
                  Ifoto y'Indangamuntu
                </label>
                <input
                  type="file"
                  id="national_id"
                  required
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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded bg-slate-600 px-6 py-3 text-lg font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeAgent;
