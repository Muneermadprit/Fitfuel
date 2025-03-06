import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialMealPackages = [];

export default function MealPackage() {
    const [mealPackages, setMealPackages] = useState(initialMealPackages);
    const [mealPlan, setMealPlan] = useState([]);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [mealData, setMealsData] = useState([]);
    const packageGroups = ['Weight Loss', 'Muscle Gain', 'Balanced Diet', 'Vegetarian', 'Vegan'];
    const mealOptions = [
        { id: '65f1a9d5c3e9b5a4f6d2e8c1', name: 'Breakfast' },
        { id: '65f1a9d5c3e9b5a4f6d2e8c2', name: 'Lunch' },
        { id: '65f1a9d5c3e9b5a4f6d2e8c3', name: 'Dinner' },
        { id: '65f1a9d5c3e9b5a4f6d2e8c4', name: 'Snack' }
    ];
    const statusOptions = ['Active', 'Inactive'];

    useEffect(() => {
        fetchMealPackages();
        fetchMeals();
        fetchProducts();
    }, []);

    const fetchMealPackages = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-packages", { withCredentials: true });
            setMealPackages(response.data.data || []);
        } catch (error) {
            console.error("Error fetching meal packages:", error);
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-meals", { withCredentials: true });
            setMealsData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-meal-plans", { withCredentials: true });
            setMealPlan(response.data.data || []);
        } catch (error) {
            console.error("Error fetching meal plans:", error);
        }
    };

    const handleAdd = () => {
        setSelectedPackage(null);
        setIsCanvasOpen(true);
        setIsEditable(false);
        setFormErrors({});
    };

    const handleEdit = (mealPackage) => {
        setSelectedPackage(mealPackage);
        setIsCanvasOpen(true);
        setIsEditable(true);
        setFormErrors({});
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.get('packageName')) errors.packageName = "Package name is required.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Get selected meals from the form
        const selectedMeals = Array.from(formData.getAll('meals'));

        // Create the package data model
        const packageData = {
            packageName: formData.get('packageName'),
            description: formData.get('description'),
            packageGroup: formData.get('packageGroup'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            meals: selectedMeals,
        };

        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (isEditable && selectedPackage) {
                // Update existing package
                await axios.patch('https://api.dailyfit.ae/api/admin/update-package', packageData, { withCredentials: true });
                console.log("Package updated successfully");
            } else {
                // Add new package
                await axios.post('https://api.dailyfit.ae/api/admin/add-package', packageData, { withCredentials: true });
                console.log("Package added successfully");
            }

            // Fetch updated packages after add/update
            fetchMealPackages();
            setIsCanvasOpen(false);
        } catch (error) {
            console.error('Error saving meal package:', error);
            alert("Failed to save the meal package. Please try again.");
        }
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
    // Check if a meal is included in the selected package
    const isMealSelected = (mealId) => {
        if (!selectedPackage || !selectedPackage.meals) return false;

        // If meals is an array of objects (like in the API response)
        if (selectedPackage.meals.length > 0 && typeof selectedPackage.meals[0] === 'object') {
            return selectedPackage.meals.some(meal => meal._id === mealId);
        }

        // If meals is an array of IDs
        return selectedPackage.meals.includes(mealId);
    };

    const filteredPackages = useMemo(() => {
        return mealPackages.filter((pkg) =>
            (pkg.packageName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);

    const columns = [
        { name: 'Name', selector: (row) => row.packageName, sortable: true },
        // { name: 'Group', selector: (row) => row.packageGroup, sortable: true },
        { name: 'Start Date', selector: (row) => new Date(row.startDate).toLocaleDateString(), sortable: true },
        { name: 'End Date', selector: (row) => new Date(row.endDate).toLocaleDateString(), sortable: true },
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
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button onClick={handleAdd} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    <Plus size={16} />
                    <span>Add Meal Package</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search meal package..."
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
                        noDataComponent="No meal packages found"
                    />
                </div>
            </div>

            {isCanvasOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{isEditable ? 'Edit Meal Package' : 'Add Meal Package'}</h2>
                            <button onClick={() => setIsCanvasOpen(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Package Name:</label>
                                <input
                                    name="packageName"
                                    defaultValue={selectedPackage?.packageName}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {formErrors.packageName && <p className="text-red-500 text-sm">{formErrors.packageName}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Description:</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedPackage?.description}
                                    className="w-full border p-2 rounded h-24"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Start Date:</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    defaultValue={selectedPackage?.startDate ? new Date(selectedPackage.startDate).toISOString().split('T')[0] : ""}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">End Date:</label>
                                <input
                                    name="endDate"
                                    type="date"
                                    defaultValue={selectedPackage?.endDate ? new Date(selectedPackage.endDate).toISOString().split('T')[0] : ""}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Select Meals:</label>
                                <div className="border p-2 rounded max-h-64 overflow-y-auto">
                                    {mealData && mealData.length > 0 ? (
                                        mealData.map((meal) => (
                                            <div key={meal._id} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded">
                                                <input
                                                    type="checkbox"
                                                    id={`meal-${meal._id}`}
                                                    name="meals"
                                                    value={meal._id}
                                                    defaultChecked={isMealSelected(meal._id)}
                                                    className="mr-2 h-4 w-4"
                                                />
                                                <label htmlFor={`meal-${meal._id}`} className="flex flex-col">
                                                    <span className="font-medium">{meal.mealName}</span>
                                                    {/* <span className="text-sm text-gray-500">{meal.mealType}</span> */}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No meals available</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button type="submit" className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition duration-300 text-lg">
                                    {isEditable ? 'Update' : 'Save'}
                                </button>
                                <button type="button" onClick={() => setIsCanvasOpen(false)} className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition duration-300 text-lg">
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