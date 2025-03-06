import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
    mealName: '',
    description: '',
    category: '',
    categoryId: '', // Store the category ID
    mealType: '',
    mealTypeId: '', // Store the meal type ID
    package: [],
    image: [], // Will store image URLs instead of base64
    fareDetails: {
        totalFare: '',
        strikeOff: '',
        discount: ''
    },
    moreDetails: {
        energy: '',
        protein: '',
        fat: '',
        carbohydrates: '',
        allergens: [] // Initialize as an empty array
    }
};

export default function MealPage() {
    const [mealPackages, setMealPackages] = useState([]);
    const [categoryPackage, setCategoryPackage] = useState([]);
    const [mealType, setMealType] = useState([]);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState(initialFormData);
    const [selectedMealId, setSelectedMealId] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]); // For preview only
    const [selectedMealTypes, setSelectedMealTypes] = useState([]);

    const fetchMeals = async () => {
        try {
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-meals", { withCredentials: true });
            setMealPackages(response.data.data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-categories", { withCredentials: true });
            setCategoryPackage(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchMealTypes = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-mealtype", { withCredentials: true });
            setMealType(response.data.data);
        } catch (error) {
            console.error("Error fetching meal types:", error);
        }
    };

    useEffect(() => {
        fetchMeals();
        fetchCategories();
        fetchMealTypes();
    }, []);

    // Add the missing isMealSelected function
    const isMealSelected = (mealTypeId) => {
        return selectedMealTypes.includes(mealTypeId);
    };

    // Handle selection of meal types
    const handleMealTypeSelection = (e) => {
        const typeId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedMealTypes(prev => [...prev, typeId]);
        } else {
            setSelectedMealTypes(prev => prev.filter(id => id !== typeId));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = e.target.options[selectedIndex];
        const categoryId = selectedOption.getAttribute('data-id') || '';
        const categoryName = e.target.value;

        setFormData(prev => ({
            ...prev,
            category: categoryName,
            categoryId: categoryId
        }));
    };

    const handleMealTypeChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = e.target.options[selectedIndex];
        const mealTypeId = selectedOption.getAttribute('data-id') || '';
        const mealTypeName = e.target.value;

        setFormData(prev => ({
            ...prev,
            mealType: mealTypeName,
            mealTypeId: mealTypeId
        }));
    };

    const handleFareChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            fareDetails: {
                ...prev.fareDetails,
                [name]: value
            }
        }));
    };

    const handleMoreDetailsChange = (e) => {
        const { name, value } = e.target;
        if (name === 'allergens') {
            // Convert comma-separated string to array
            const allergensArray = value.split(',').map(item => item.trim());
            setFormData(prev => ({
                ...prev,
                moreDetails: {
                    ...prev.moreDetails,
                    [name]: allergensArray
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                moreDetails: {
                    ...prev.moreDetails,
                    [name]: value
                }
            }));
        }
    };

    const handlePackageSizeChange = (e) => {
        const sizes = e.target.value.split(',').map(size => size.trim());
        setFormData(prev => ({
            ...prev,
            package: sizes
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);

        // Create temporary preview URLs for display in the form
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setImagePreviewUrls(previewUrls);

        // When editing, keep existing URLs and add new files for upload
        // The actual image URLs will be set by the server after upload
        if (selectedMealId) {
            // Keep existing image URLs when editing
            // New files will be uploaded separately
        } else {
            // For new entries, clear existing URLs
            setFormData(prev => ({
                ...prev,
                image: [] // The actual URLs will be set by the server after upload
            }));
        }
    };

    const handleRemoveImage = (index) => {
        // Remove image from preview and from files to upload
        setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index) => {
        // Remove existing image from formData
        setFormData(prev => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index)
        }));
    };

    const handleAdd = () => {
        setFormData(initialFormData);
        setSelectedMealId(null);
        setImageFiles([]);
        setImagePreviewUrls([]);
        setSelectedMealTypes([]);
        setIsCanvasOpen(true);
    };

    const handleEdit = (meal) => {
        // Find the matching category and meal type objects
        const categoryObj = categoryPackage.find(cat => cat.categoryName === meal.category);
        const mealTypeObj = mealType.find(type => type.mealType === meal.mealType);

        // Set selected meal types if available
        if (meal.mealTypes && Array.isArray(meal.mealTypes)) {
            setSelectedMealTypes(meal.mealTypes.map(type => type._id || type));
        } else if (mealTypeObj) {
            setSelectedMealTypes([mealTypeObj._id]);
        } else {
            setSelectedMealTypes([]);
        }

        setSelectedMealId(meal._id);
        setFormData({
            mealName: meal.mealName,
            description: meal.description,
            category: meal.category,
            categoryId: categoryObj ? categoryObj._id : '',
            mealType: meal.mealType,
            mealTypeId: mealTypeObj ? mealTypeObj._id : '',
            package: meal.package,
            image: meal.image, // These are the URLs of existing images
            fareDetails: {
                totalFare: meal.fareDetails.totalFare,
                strikeOff: meal.fareDetails.strikeOff,
                discount: meal.fareDetails.discount
            },
            moreDetails: {
                energy: meal.moreDetails.energy,
                protein: meal.moreDetails.protein,
                fat: meal.moreDetails.fat,
                carbohydrates: meal.moreDetails.carbohydrates,
                allergens: Array.isArray(meal.moreDetails.allergens)
                    ? meal.moreDetails.allergens
                    : meal.moreDetails.allergens ? meal.moreDetails.allergens.split(',').map(item => item.trim()) : []
            }
        });
        setImageFiles([]);
        setImagePreviewUrls([]);
        setIsCanvasOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.dailyfit.ae/api/admin/delete`, {
                identifier: id// 
            }, { withCredentials: true });

            // setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
            toast.success("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        // Construct the meal data object
        const mealData = {
            mealName: formData.mealName,
            // image: formData.image, // Keep existing image URLs
            description: formData.description,
            category: formData.categoryId, // Use the ID instead of the name
            mealTypes: selectedMealTypes, // Use the selected meal types array
            package: formData.package,
            fareDetails: {
                totalFare: parseFloat(formData.fareDetails.totalFare) || 0,
                strikeOff: parseFloat(formData.fareDetails.strikeOff) || 0,
                discount: parseFloat(formData.fareDetails.discount) || 0
            },
            moreDetails: {
                energy: parseInt(formData.moreDetails.energy) || 0,
                protein: parseInt(formData.moreDetails.protein) || 0,
                fat: parseInt(formData.moreDetails.fat) || 0,
                carbohydrates: parseInt(formData.moreDetails.carbohydrates) || 0,
                allergens: formData.moreDetails.allergens
            }
        };

        // Append new image files if uploaded
        mealData.images = imageFiles.map((file) => file);

        try {
            const url = selectedMealId
                ? `https://api.dailyfit.ae/api/admin/update-meal`
                : 'https://api.dailyfit.ae/api/admin/add-meal';

            const response = await axios({
                method: selectedMealId ? 'patch' : 'post',
                url,
                data: mealData,
                // headers: {
                //     Authorization: `Bearer ${token}`,
                //     'Content-Type': 'multipart/form-data'
                // }
            }, { withCredentials: true });

            await fetchMeals();
            setIsCanvasOpen(false);
            setFormData(initialFormData);
            setImageFiles([]);
            setImagePreviewUrls([]);
            setSelectedMealId(null);
            setSelectedMealTypes([]);
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    const columns = [
        { name: 'Name', selector: row => row.mealName, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Category', selector: row => row.category, sortable: true },
        { name: 'Type', selector: row => row.mealType, sortable: true },
        { name: 'Price', selector: row => `$${row.fareDetails.totalFare.toFixed(2)}`, sortable: true },
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
            ),
        },
    ];

    const filteredPackages = useMemo(() => {
        return Array.isArray(mealPackages) ? mealPackages.filter(pkg =>
            (pkg.mealName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (pkg.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        ) : [];
    }, [mealPackages, searchTerm]);

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button onClick={handleAdd} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    <Plus size={16} />
                    <span>Add Meal</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search meal..."
                                className="pl-8 pr-4 py-2 w-full border rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <DataTable columns={columns} data={filteredPackages} pagination responsive highlightOnHover />
                </div>
            </div>

            {isCanvasOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <ToastContainer position="top-right" />
                    <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedMealId ? 'Edit Meal' : 'Add Meal'}</h2>
                            <button onClick={() => setIsCanvasOpen(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Meal Name</label>
                                <input
                                    type="text"
                                    name="mealName"
                                    placeholder="Meal Name"
                                    value={formData.mealName}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded mt-1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded mt-1 min-h-20"
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                    className="border p-2 w-full rounded mt-1"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categoryPackage.map((category) => (
                                        <option
                                            key={category.identifier || category._id}
                                            value={category.categoryName}
                                            data-id={category._id || category.identifier}
                                        >
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Select Meal Types:</label>
                                <div className="border p-2 rounded max-h-64 overflow-y-auto">
                                    {mealType && mealType.length > 0 ? (
                                        mealType.map((type) => (
                                            <div key={type._id} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded">
                                                <input
                                                    type="checkbox"
                                                    id={`type-${type._id}`}
                                                    name="types"
                                                    value={type._id}
                                                    checked={isMealSelected(type._id)}
                                                    onChange={handleMealTypeSelection}
                                                    className="mr-2 h-4 w-4"
                                                />
                                                <label htmlFor={`type-${type._id}`} className="flex flex-col">
                                                    <span className="font-medium">{type.mealType}</span>
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No meal types available</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Package Sizes</label>
                                <input
                                    type="text"
                                    name="package"
                                    placeholder="Package Sizes (comma-separated)"
                                    value={formData.package.join(', ')}
                                    onChange={handlePackageSizeChange}
                                    className="border p-2 w-full rounded mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full"
                                />

                                {/* Existing images */}
                                {formData.image && formData.image.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-1">Existing Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.image.map((img, index) => (
                                                <div key={`existing-${index}`} className="relative">
                                                    <img
                                                        src={img}
                                                        alt={`Image ${index + 1}`}
                                                        className="h-20 w-20 object-cover rounded"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/placeholder-image.jpg";
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExistingImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New image previews */}
                                {imagePreviewUrls.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-1">New Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {imagePreviewUrls.map((preview, index) => (
                                                <div key={`preview-${index}`} className="relative">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-20 w-20 object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold mb-2">Fare Details</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Total Fare</label>
                                        <input
                                            type="number"
                                            name="totalFare"
                                            placeholder="Total Fare"
                                            value={formData.fareDetails.totalFare}
                                            onChange={handleFareChange}
                                            className="border p-2 w-full rounded mt-1"
                                            required
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Strike Off</label>
                                        <input
                                            type="number"
                                            name="strikeOff"
                                            placeholder="Strike Off Price"
                                            value={formData.fareDetails.strikeOff}
                                            onChange={handleFareChange}
                                            className="border p-2 w-full rounded mt-1"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Discount</label>
                                        <input
                                            type="number"
                                            name="discount"
                                            placeholder="Discount"
                                            value={formData.fareDetails.discount}
                                            onChange={handleFareChange}
                                            className="border p-2 w-full rounded mt-1"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold mb-2">Nutritional Details</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Energy</label>
                                        <input
                                            type="number"
                                            name="energy"
                                            placeholder="Energy"
                                            value={formData.moreDetails.energy}
                                            onChange={handleMoreDetailsChange}
                                            className="border p-2 w-full rounded mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Protein</label>
                                        <input
                                            type="number"
                                            name="protein"
                                            placeholder="Protein"
                                            value={formData.moreDetails.protein}
                                            onChange={handleMoreDetailsChange}
                                            className="border p-2 w-full rounded mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fat</label>
                                        <input
                                            type="number"
                                            name="fat"
                                            placeholder="Fat"
                                            value={formData.moreDetails.fat}
                                            onChange={handleMoreDetailsChange}
                                            className="border p-2 w-full rounded mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Carbohydrates</label>
                                        <input
                                            type="number"
                                            name="carbohydrates"
                                            placeholder="Carbohydrates"
                                            value={formData.moreDetails.carbohydrates}
                                            onChange={handleMoreDetailsChange}
                                            className="border p-2 w-full rounded mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Allergens</label>
                                    <input
                                        type="text"
                                        name="allergens"
                                        placeholder="Allergens (comma-separated)"
                                        value={Array.isArray(formData.moreDetails.allergens) ? formData.moreDetails.allergens.join(', ') : ''}
                                        onChange={handleMoreDetailsChange}
                                        className="border p-2 w-full rounded mt-1"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2 mt-6">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    {selectedMealId ? 'Update' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsCanvasOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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