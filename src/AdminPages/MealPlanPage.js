import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function MealPlanPage() {
  const [mealPackages, setMealPackages] = useState([]);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('');

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("/admin/category", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMealPackages(response.data.categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // get-packages


  const handleAdd = () => {
    setSelectedPackage(null);
    setImagePreview(null);
    setSelectedMealType('');
    setIsCanvasOpen(true);
  };

  const handleEdit = (mealPackage) => {
    setSelectedPackage(mealPackage);
    setImagePreview(mealPackage.image);
    setSelectedMealType(mealPackage.type || '');
    setIsCanvasOpen(true);
  };

  const handleDelete = (id) => {
    setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!selectedMealType) {
      alert('Please select a meal type.');
      return;
    }

    const newPackage = {
      name: formData.get('name'),
      description: formData.get('description'),
      type: selectedMealType,
      image: imagePreview
    };

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      let response;
      if (selectedPackage) {
        response = await axios.put(
          `admin/addcategory/${selectedPackage.id}`,
          newPackage,
          { headers }
        );
        setMealPackages(mealPackages.map(p => p.id === selectedPackage.id ? response.data : p));
      } else {
        response = await axios.post(`/admin/addcategory`, newPackage, { headers });
        setMealPackages([...mealPackages, response.data]);
      }
      fetchProducts();
      setIsCanvasOpen(false);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving meal package:', error);
    }
  };

  const filteredPackages = useMemo(() => {
    return mealPackages.filter(pkg =>
      (pkg.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (pkg.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [mealPackages, searchTerm]);

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
            <Pencil size={16} />
          </button>
          <button onClick={() => handleDelete(row.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus size={16} />
          <span>Add Meal Plan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="flex justify-end items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search meal packages..."
                className="pl-8 pr-4 py-2 w-full border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataTable
            columns={columns}
            data={filteredPackages}
            pagination
            responsive
            highlightOnHover
          />
        </div>
      </div>

      {isCanvasOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedPackage ? 'Edit Meal Plan' : 'Add Meal Plan'}
              </h2>
              <button
                onClick={() => setIsCanvasOpen(false)}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input
                  name="name"
                  defaultValue={selectedPackage?.name}
                  placeholder="Enter meal package name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description:</label>
                <textarea
                  name="description"
                  defaultValue={selectedPackage?.description}
                  placeholder="Enter meal package description"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Meal Package:</label>
                <select
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="" disabled>Select meal type</option>
                  {mealTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 w-32 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                <button
                  type="submit"
                  className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
                >
                  {selectedPackage ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCanvasOpen(false)}
                  className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
