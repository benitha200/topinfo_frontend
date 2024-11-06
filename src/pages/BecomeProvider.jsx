import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const BecomeProvider = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    experience: '',
    availability: '',
    phone: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Ubwubatsi',          // Construction
    'Isuku',              // Cleaning
    'Ubufundi',           // Craftsmanship
    'Ubuvuzi',            // Healthcare
    'Uburezi',            // Education
    'Gutwara ibintu',     // Transportation
    'Ubuhanga',           // Technology
    'Ibindi'              // Others
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle service creation logic here
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Iba Umukozi Watanga Serivisi</h1>
          <p className="text-gray-600">Uzuza form ikurikira kugirango utangire gutanga serivisi zawe</p>
        </div>

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
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Izina rya Serivisi
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Urugero: Gusana inzu"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Ibisobanuro
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Igiciro
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="FRW"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Icyiciro
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Hitamo icyiciro</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Aho ubarizwa
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Urugero: Kigali, Gasabo"
                />
              </div>

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
            </div>

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
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                Igihe ukorera
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                required
                value={formData.availability}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Urugero: Kuwa mbere - Kuwa gatanu, 8:00 - 17:00"
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