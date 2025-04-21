import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddOnPage() {
    const [mealPackages, setMealPackages] = useState([]);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formErrors, setFormErrors] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState([]);
    const [mealType, setMealType] = useState([]);
    const [categoryPackage, setCategoryPackage] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-addons", { withCredentials: true });
            setMealPackages(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchMealTypes();
    }, []);

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

    const handleAdd = () => {
        setSelectedPackage({ categoryName: "" });
        setFormErrors({ name: '' });
        setIsEditing(false);
        setIsCanvasOpen(true);
    };

    const handleEdit = (mealPackage) => {
        setSelectedPackage(mealPackage);
        setIsEditing(true);
        setIsCanvasOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(id, 'iii')
        try {
            await axios.delete(`https://api.dailyfit.ae/api/admin/delete`, {
                data: { identifier: id },
                withCredentials: true,
            });
            fetchProducts();
            // setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
            toast.success("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");
        }
    };


    const handleSubmit = async (e) => {
        alert("handle ubmit clicked")
        e.preventDefault();
        const mealName = selectedPackage.mealName?.trim();

        if (!mealName) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                mealName: "Meal name is required",
            }));
            return;
        }

        const form = new FormData();

                // Append basic fields
                form.append('mealName', selectedPackage.mealName);
                form.append('description', selectedPackage.description);
                form.append('category', selectedPackage.categoryId);

                // Append mealTypes
                selectedMealTypes.forEach(typeId => {
                    const foundType = mealType.find(type => type._id === typeId);
                    if (foundType) {
                        form.append('mealTypes', foundType.identifier); // Assuming identifier is needed
                    }
                });

                // Append other fields
                form.append('package', selectedPackage.package);

                form.append('fareDetails[totalFare]', parseFloat(selectedPackage.fareDetails.totalFare) || 0);
                form.append('fareDetails[strikeOff]', parseFloat(selectedPackage.fareDetails.strikeOff) || 0);
                form.append('fareDetails[discount]', parseFloat(selectedPackage.fareDetails.discount) || 0);

                form.append('moreDetails[energy]', parseInt(selectedPackage.moreDetails.energy) || 0);
                form.append('moreDetails[protein]', parseInt(selectedPackage.moreDetails.protein) || 0);
                form.append('moreDetails[fat]', parseInt(selectedPackage.moreDetails.fat) || 0);
                form.append('moreDetails[carbohydrates]', 
                    parseInt(selectedPackage.moreDetails.carbohydrates) || 0);
                form.append('moreDetails[allergens]', selectedPackage.moreDetails.allergens);

                // Append multiple image files
                for (let i = 0; i < selectedPackage.files.length; i++) {
                    form.append('files', selectedPackage.files[i]); // input field should have name="files" and multiple
                }

               


        console.log(selectedPackage,"The package selected")
        // Make sure all nested objects exist
        const mealData = {
            mealName: selectedPackage.mealName,
            mealType: selectedPackage.mealType || [],
            description: selectedPackage.description || "",
            fareDetails: {
                totalFare: selectedPackage.fareDetails?.totalFare || 0,
                discount: selectedPackage.fareDetails?.discount || 0,
                strikeOff: selectedPackage.fareDetails?.strikeOff || 0
            },
            moreDetails: {
                energy: selectedPackage.moreDetails?.energy || 0,
                protein: selectedPackage.moreDetails?.protein || 0,
                fat: selectedPackage.moreDetails?.fat || 0,
                carbohydrates: selectedPackage.moreDetails?.carbohydrates || 0,
                allergens: selectedPackage.moreDetails?.allergens || []
            },
            image: selectedPackage.image || [],
            category: selectedPackage.category || []
        };

        try {
            if (isEditing) {
                // Include the ID in the request for updating
                const updatedMealData = {
                    identifier: selectedPackage.identifier,
                    ...mealData
                };
             
                await axios.patch(`https://api.dailyfit.ae/api/admin/update-addon`, updatedMealData, { withCredentials: true });
                toast.success("Add-on updated successfully!");
            } else {
                console.log(mealData,"The data inside meals addon")
                await axios.post(`https://api.dailyfit.ae/api/admin/create-addon`,form, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Add-on added successfully!");
            }
            setIsCanvasOpen(false);
            setIsEditing(false);
            setSelectedPackage(null);
            fetchProducts(); // Refresh the list after operation
        } catch (error) {
            console.error('Failed to save add-on:', error);
            toast.error("Failed to save add-on. Please try again.");
        }
    };

    const filteredPackages = useMemo(() => {
        return (mealPackages || []).filter(pkg =>
            (pkg.mealName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);


    const columns = [
        {
            name: 'Add On Products',
            selector: row => row.mealName,
            sortable: true,
        },
        {
            name: 'Energy (kcal)',
            selector: row => row.moreDetails?.energy || 'N/A',
            sortable: true,
        },
        {
            name: 'Protein (g)',
            selector: row => row.moreDetails?.protein || 'N/A',
            sortable: true,
        },
        // {
        //     name: 'Category',
        //     selector: row => row.category ? row.category.join(', ') : 'N/A',
        //     sortable: true,
        //     wrap: true,
        // },
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

    const handleCanvasClose = () => {
        setIsCanvasOpen(false);
        setIsEditing(false);
        setSelectedPackage(null);
        setFormErrors({ name: '' });
    };


    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;
    
        const imageArray = [...(selectedPackage.image || [])];
    
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) {
                toast.error('Please select image files only');
                return;
            }
    
            // Prevent duplicates (based on name + size)
            const isDuplicate = imageArray.some(f => f.name === file.name && f.size === file.size);
            if (!isDuplicate) {
                const fileData = {
                    name: file.name,
                    size: file.size,
                    type: file.type
                };
    
                const newImageArray = [...imageArray, fileData];
                setSelectedPackage(prev => ({
                    ...prev,
                    image: newImageArray
                }));
            }
        });
    };
    
    // Remove an image from the array
    const removeImage = (index) => {
        const newImageArray = [...selectedPackage.image];
        newImageArray.splice(index, 1);
        setSelectedPackage(prev => ({
            ...prev,
            image: newImageArray
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const categoryIds = selectedOptions.map(option => option.getAttribute('data-id') || '');
        const categoryNames = selectedOptions.map(option => option.value);

        setSelectedPackage(prev => ({
            ...prev,
            category: categoryIds
        }));
    };

    const handleMealTypeSelection = (e) => {
        const typeId = e.target.value;
        const isChecked = e.target.checked;

        setSelectedPackage(prev => {
            const currentMealTypes = prev.mealType || [];
            let updatedMealTypes;

            if (isChecked) {
                updatedMealTypes = [...currentMealTypes, typeId];
            } else {
                updatedMealTypes = currentMealTypes.filter(id => id !== typeId);
            }

            return {
                ...prev,
                mealType: updatedMealTypes
            };
        });
    };

    const isMealSelected = (mealTypeId) => {
        return selectedPackage?.mealType?.includes(mealTypeId) || false;
    };


    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    <Plus size={16} />
                    <span>Add AddOn</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search Category..."
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
                                {isEditing ? 'Update Category' : 'Add Category'}
                            </h2>
                            <button
                                onClick={handleCanvasClose}
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Meal Name:</label>
                                <input
                                    name="mealName"
                                    value={selectedPackage?.mealName || ""}
                                    onChange={(e) =>
                                        setSelectedPackage((prev) => ({
                                            ...prev,
                                            mealName: e.target.value,
                                        }))
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter the meal name"
                                    required
                                />
                                {formErrors.mealName && (
                                    <span className="text-red-500 text-sm">{formErrors.mealName}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    // value={formData.category}
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
                            <div className="border p-2 rounded max-h-64 overflow-y-auto">
                                <label className="block text-sm font-medium text-gray-700">Select Meal Type</label>
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

                            <div className="mb-4">
                                <label className="block mb-1">Description:</label>
                                <textarea
                                    name="description"
                                    value={selectedPackage?.description || ""}
                                    onChange={(e) =>
                                        setSelectedPackage((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter meal description"
                                    rows="3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Fare Details:</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="text-sm">Total Fare:</label>
                                        <input
                                            type="number"
                                            name="totalFare"
                                            value={selectedPackage?.fareDetails?.totalFare || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    fareDetails: {
                                                        ...prev.fareDetails,
                                                        totalFare: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Total fare"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Discount:</label>
                                        <input
                                            type="number"
                                            name="discount"
                                            value={selectedPackage?.fareDetails?.discount || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    fareDetails: {
                                                        ...prev.fareDetails,
                                                        discount: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Discount"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Strike Off:</label>
                                        <input
                                            type="number"
                                            name="strikeOff"
                                            value={selectedPackage?.fareDetails?.strikeOff || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    fareDetails: {
                                                        ...prev.fareDetails,
                                                        strikeOff: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Strike off price"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">More Details:</label>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                        <label className="text-sm">Energy (kcal):</label>
                                        <input
                                            type="number"
                                            name="energy"
                                            value={selectedPackage?.moreDetails?.energy || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    moreDetails: {
                                                        ...prev.moreDetails,
                                                        energy: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Energy in kcal"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Protein (g):</label>
                                        <input
                                            type="number"
                                            name="protein"
                                            value={selectedPackage?.moreDetails?.protein || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    moreDetails: {
                                                        ...prev.moreDetails,
                                                        protein: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Protein in grams"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                        <label className="text-sm">Fat (g):</label>
                                        <input
                                            type="number"
                                            name="fat"
                                            value={selectedPackage?.moreDetails?.fat || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    moreDetails: {
                                                        ...prev.moreDetails,
                                                        fat: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Fat in grams"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Carbohydrates (g):</label>
                                        <input
                                            type="number"
                                            name="carbohydrates"
                                            value={selectedPackage?.moreDetails?.carbohydrates || ""}
                                            onChange={(e) =>
                                                setSelectedPackage((prev) => ({
                                                    ...prev,
                                                    moreDetails: {
                                                        ...prev.moreDetails,
                                                        carbohydrates: Number(e.target.value)
                                                    }
                                                }))
                                            }
                                            className="w-full border p-2 rounded"
                                            placeholder="Carbs in grams"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm">Allergens (comma separated):</label>
                                    <input
                                        name="allergens"
                                        value={selectedPackage?.moreDetails?.allergens?.join(", ") || ""}
                                        onChange={(e) =>
                                            setSelectedPackage((prev) => ({
                                                ...prev,
                                                moreDetails: {
                                                    ...prev.moreDetails,
                                                    allergens: e.target.value.split(",").map(item => item.trim())
                                                }
                                            }))
                                        }
                                        className="w-full border p-2 rounded"
                                        placeholder="e.g., Dairy, Nuts, Gluten"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Images:</label>
                                <div className="border rounded p-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setSelectedPackage({ ...selectedPackage, files: e.target.files })}
                                        className="mb-2"
                                    />
                                    <p className="text-xs text-gray-500 mb-2">
                                        Images will be converted to Base64 format
                                    </p>

                                    {/* Image Preview */}
                                    {selectedPackage?.image?.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            {selectedPackage.image.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index}`}
                                                        className="w-full h-20 object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button
                                    type="submit"
                                    className="w-32 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 backdrop-blur-md shadow-md transition duration-300 text-lg"
                                >
                                    {isEditing ? 'Update' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCanvasClose}
                                    className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 backdrop-blur-md shadow-md transition duration-300 text-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer position="top-right" />
                </div>
            )}
        </div>
    );
}