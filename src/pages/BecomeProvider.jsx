import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { AlertCircle } from 'lucide-react';
import { Provinces, Districts } from 'rwanda';
import API_URL from '../constants/Constants';

const BecomeProvider = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    work_email: '',
    phone: '',
    description: '',
    experience: '',
    provinces: [], // Array of selected province objects
    districts: [], // Array of selected district objects
    location_sector: '',
    location_serve: '',
    additional_info: '',
    service_category_id: '',
    total_district_cost: 0,
    approved: false
  });

  const [categories, setCategories] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fetch service categories on component mount
  useEffect(() => {
    fetchServiceCategories();
  }, []);

  const fetchServiceCategories = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${API_URL}/service-categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Could not load service categories');
    }
  };

  // Province select handler
  const handleProvinceChange = (selectedProvinces) => {
    // Get districts for selected provinces
    const districts = selectedProvinces.flatMap(province => 
      Districts(province.value).map(district => ({ 
        value: district, 
        label: `${district} (${province.value})` 
      }))
    );

    setFormData(prevState => ({
      ...prevState,
      provinces: selectedProvinces,
      districts: [], // Reset districts when provinces change
      total_district_cost: 0
    }));
    setAvailableDistricts(districts);
  };

  // District select handler
  const handleDistrictChange = (selectedDistricts) => {
    const districtCost = selectedDistricts.length * 3000;

    setFormData(prevState => ({
      ...prevState,
      districts: selectedDistricts,
      total_district_cost: districtCost
    }));
  };

  // Transform Provinces to react-select format
  const provinceOptions = Provinces().map(province => ({
    value: province,
    label: province
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/service-providers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          service_category_id: parseInt(formData.service_category_id),
          approved: false,
          approved_by: null,
          provinces: formData.provinces.map(p => p.value).join(', '),
          districts: formData.districts.map(d => d.value).join(', ')
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit service provider application');
      }

      const responseData = await response.json();
      
      setShowSuccess(true);
      // Reset form after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        work_email: '',
        phone: '',
        description: '',
        experience: '',
        provinces: [],
        districts: [],
        location_sector: '',
        location_serve: '',
        additional_info: '',
        service_category_id: '',
        total_district_cost: 0,
        approved: false
      });
      setAvailableDistricts([]);

      // Hide success message after 8 seconds
      setTimeout(() => setShowSuccess(false), 8000);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Iyandikishe mubatanga service</h1>
          <p className="text-gray-600">Uzuza form ikurikira kugirango utangire gutanga serivisi zawe biciye muri topInfo</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-medium">Habonetse Ikosa!</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-green-800 font-medium">Byagenze neza!</h3>
              <p className="text-green-700">Serivisi yawe yoherejwe neza. Tuzakumenyesha vuba.</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                  Izina ryambere
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika izina ryawe"
                />
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                  Izina ryanyuma
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  required
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika izina ryanyuma"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Imeri yawe
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika imeri yawe"
                />
              </div>

              <div>
                <label htmlFor="work_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Imeri yo mu kazi
                </label>
                <input
                  type="email"
                  id="work_email"
                  name="work_email"
                  value={formData.work_email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Imeri yo mu kazi (igihe ufite)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Ibisobanuro ku murimo ushaka gutanga
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Sobanura serivisi utanga..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoni
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="07xxxxxxxx"
                />
              </div>

              <div>
                <label htmlFor="service_category_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Icyiciro cy'Serivisi
                </label>
                <select
                  id="service_category_id"
                  name="service_category_id"
                  required
                  value={formData.service_category_id}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="location_province" className="block text-sm font-medium text-gray-700 mb-1">
                  Intara
                </label>
                <input
                  type="text"
                  id="location_province"
                  name="location_province"
                  required
                  value={formData.location_province}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika intara"
                />
              </div>

              <div>
                <label htmlFor="location_district" className="block text-sm font-medium text-gray-700 mb-1">
                  Akarere
                </label>
                <input
                  type="text"
                  id="location_district"
                  name="location_district"
                  required
                  value={formData.location_district}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika akarere"
                />
              </div>

              <div>
                <label htmlFor="location_sector" className="block text-sm font-medium text-gray-700 mb-1">
                  Umurenge
                </label>
                <input
                  type="text"
                  id="location_sector"
                  name="location_sector"
                  required
                  value={formData.location_sector}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Andika umurenge"
                />
              </div>
            </div>

            <div>
              <label htmlFor="provinces" className="block text-sm font-medium text-gray-700 mb-1">
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
              <div>
                <label htmlFor="districts" className="block text-sm font-medium text-gray-700 mb-1">
                  Akarere (3,000 Rwf per district)
                </label>
                <Select
                  isMulti
                  name="districts"
                  options={availableDistricts}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.districts}
                  onChange={handleDistrictChange}
                  placeholder="Hitamo akarere"
                />
                {formData.districts.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Total District Cost: {formData.total_district_cost.toLocaleString()} Rwf
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Uburambe
              </label>
              <textarea
                id="experience"
                name="experience"
                required
                rows={3}
                value={formData.experience}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Sobanura uburambe ufite..."
              />
            </div>

            <div>
              <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-1">
                Amakuru yinyongera
              </label>
              <textarea
                id="additional_info"
                name="additional_info"
                rows={3}
                value={formData.additional_info}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Amakuru yinyongera ku murimo wawe..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Ohereza
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;