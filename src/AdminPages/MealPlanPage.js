import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function MealPlanPage() {
  const [mealPackages, setMealPackages] = useState([]);
  const [mealPacks, setMealPacks] = useState([]);
  const [mealCategory, setMealCategory] = useState([]);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMealPackIds, setSelectedMealPackIds] = useState([]);
  const [selectedMealCategoryIds, setSelectedMealCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://api.dailyfit.ae/api/admin/get-meal-plans", { withCredentials: true });
      setMealPackages(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchMealPackages = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://api.dailyfit.ae/api/admin/get-packages", { withCredentials: true });
      setMealPacks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching meal packages:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("https://api.dailyfit.ae/api/admin/get-categories", { withCredentials: true });
      setMealCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMealPackages();
    fetchCategory();
  }, []);

  const handleAdd = () => {
    setSelectedPackage(null);
    setImagePreview(null);
    setSelectedMealType('');
    setSelectedMealPackIds([]);
    setSelectedMealCategoryIds([]);
    setIsCanvasOpen(true);
  };

  const handleEdit = (mealPackage) => {
    setSelectedPackage(mealPackage);
    setImagePreview(mealPackage.image || null);
    setSelectedMealType(mealPackage.type || '');

    // Safely handle package IDs
    const packageIds = Array.isArray(mealPackage.packages)
      ? mealPackage.packages
      : mealPackage.packages
        ? [mealPackage.packages]
        : [];
    setSelectedMealPackIds(packageIds.map(pkg =>
      typeof pkg === 'object' && pkg._id ? pkg._id : pkg
    ));

    // Safely handle category IDs
    const categoryIds = Array.isArray(mealPackage.category)
      ? mealPackage.category
      : mealPackage.category
        ? [mealPackage.category]
        : [];
    setSelectedMealCategoryIds(categoryIds.map(cat =>
      typeof cat === 'object' && cat.identifier ? cat.identifier : cat
    ));

    setIsCanvasOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.dailyfit.ae/api/admin/delete`, {
        data: { identifier: id },
        withCredentials: true,
      });

      toast.success("Meal plan deleted successfully!");
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      toast.error("Failed to delete meal plan. Please try again.");
    }
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

  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    if (packageId) {
      setSelectedMealPackIds([...selectedMealPackIds, packageId]);
      e.target.value = ""; // Reset the select after adding
    }
  };

  const removePackage = (id) => {
    setSelectedMealPackIds(selectedMealPackIds.filter(packageId => packageId !== id));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (categoryId) {
      setSelectedMealCategoryIds([...selectedMealCategoryIds, categoryId]);
      e.target.value = ""; // Reset the select after adding
    }
  };

  const removeCategory = (id) => {
    setSelectedMealCategoryIds(selectedMealCategoryIds.filter(categoryId => categoryId !== id));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData(e.target);

    if (selectedMealPackIds.length === 0) {
      toast.error('Please select at least one meal package.');
      setLoading(false); // Stop loader on validation fail
      return;
    }

    if (selectedMealCategoryIds.length === 0) {
      toast.error('Please select at least one meal category.');
      setLoading(false); // Stop loader on validation fail
      return;
    }

    const mealPlanName = formData.get('name');
    const identifier = selectedPackage?.identifier ||
      mealPlanName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

    const newPackage = {
      mealPlanName,
      description: formData.get('description'),
      packages: selectedMealPackIds,
      category: selectedMealCategoryIds,
      image: imagePreview ? imagePreview : [],
      identifier,
      isDeleted: false
    };

    try {
      let response;
      if (selectedPackage) {
        response = await axios.patch(
          `https://api.dailyfit.ae/api/admin/update-mealPlan`,
          newPackage,
          { withCredentials: true }
        );
        toast.success("Meal plan updated successfully!");
      } else {
        response = await axios.post(
          `https://api.dailyfit.ae/api/admin/add-mealPlan`,
          newPackage,
          { withCredentials: true }
        );
        toast.success("Meal plan added successfully!");
      }

      fetchProducts();
      setIsCanvasOpen(false);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving meal plan:', error);
      if (error.response && error.response.status === 413) {
        toast.error("Image size is too large. Please use a smaller image file.");
      } else {
        toast.error("Failed to save meal plan. Please try again.");
      }
    } finally {
      setLoading(false); // Always stop loader
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);

  //   if (selectedMealPackIds.length === 0) {
  //     toast.error('Please select at least one meal package.');
  //     return;
  //   }

  //   if (selectedMealCategoryIds.length === 0) {
  //     toast.error('Please select at least one meal category.');
  //     return;
  //   }

  //   // Create an identifier from the meal plan name if it's a new entry
  //   const mealPlanName = formData.get('name');
  //   const identifier = selectedPackage?.identifier ||
  //     mealPlanName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

  //   const newPackage = {
  //     mealPlanName: mealPlanName,
  //     description: formData.get('description'),
  //     packages: selectedMealPackIds,
  //     category: selectedMealCategoryIds, // This now contains category identifiers
  //     image: imagePreview ? imagePreview : [],
  //     identifier: identifier, // Ensure identifier is passed
  //     isDeleted: false
  //   };

  //   try {
  //     let response;
  //     if (selectedPackage) {
  //       response = await axios.patch(
  //         `https://api.dailyfit.ae/api/admin/update-mealPlan`,
  //         newPackage,
  //         { withCredentials: true }
  //       );
  //       toast.success("Meal plan updated successfully!");
  //     } else {
  //       response = await axios.post(
  //         `https://api.dailyfit.ae/api/admin/add-mealPlan`,
  //         newPackage,
  //         { withCredentials: true }
  //       );
  //       toast.success("Meal plan added successfully!");
  //     }

  //     fetchProducts();
  //     setIsCanvasOpen(false);
  //     setImagePreview(null);
  //   } catch (error) {
  //     console.error('Error saving meal plan:', error);
  //     if (error.response && error.response.status === 413) {
  //       toast.error("Image size is too large. Please use a smaller image file.");
  //     } else {
  //       toast.error("Image size is too large. Please use a smaller image file.");
  //     }
  //     toast.error("Failed to save meal plan. Please try again.");
  //   }
  // };

  const filteredPackages = useMemo(() => {
    return mealPackages.filter(pkg =>
      (pkg.mealPlanName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (pkg.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [mealPackages, searchTerm]);

  const columns = [
    { name: 'Name', selector: row => row.mealPlanName, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
            <Pencil size={16} />
          </button>
          <button onClick={() => handleDelete(row.identifier)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  // Find package and category names by ID
  const getPackageName = (id) => {
    const pack = mealPacks.find(p => p._id === id);
    return pack ? pack.packageName : id;
  };

  const getCategoryName = (id) => {
    // Find category by identifier instead of _id
    const cat = mealCategory.find(c => c.identifier === id);
    return cat ? cat.categoryName : id;
  };

  return (
    <div className="p-4">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-white text-xl font-semibold">Loading...</div>
        </div>
      )}
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
                placeholder="Search meal plans..."
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
                  defaultValue={selectedPackage?.mealPlanName}
                  placeholder="Enter meal plan name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description:</label>
                <textarea
                  name="description"
                  defaultValue={selectedPackage?.description}
                  placeholder="Enter meal plan description"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Meal Package:</label>
                <select
                  onChange={handlePackageChange}
                  className="w-full border p-2 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>Select meal package</option>
                  {mealPacks.map((pack) => (
                    <option key={pack._id} value={pack._id}>
                      {pack.packageName}
                    </option>
                  ))}
                </select>
                {selectedMealPackIds.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium mb-1">Selected Packages:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMealPackIds.map(id => (
                        <div key={id} className="bg-blue-100 px-2 py-1 rounded flex items-center">
                          <span className="mr-1">{getPackageName(id)}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removePackage(id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Meal Category:</label>
                <select
                  onChange={handleCategoryChange}
                  className="w-full border p-2 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>Select meal category</option>
                  {mealCategory.map((cat) => (
                    <option key={cat.identifier} value={cat.identifier}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                {selectedMealCategoryIds.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium mb-1">Selected Categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMealCategoryIds.map(id => (
                        <div key={id} className="bg-green-100 px-2 py-1 rounded flex items-center">
                          <span className="mr-1">{getCategoryName(id)}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removeCategory(id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
      <ToastContainer position="top-right" />
    </div>
  );
}