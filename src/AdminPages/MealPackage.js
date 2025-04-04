import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X, Copy, Calendar, Check } from 'lucide-react';
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
    const [dateRange, setDateRange] = useState([]);
    const [showMealModal, setShowMealModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState({});
    const [packageGroup, setPackageGroup] = useState("");
    const [copySourceDate, setCopySourceDate] = useState(null);
    const [showCopyModal, setShowCopyModal] = useState(false);

    useEffect(() => {
        fetchMealPackages();
        fetchMeals();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedPackage?.startDate && selectedPackage?.endDate) {
            generateDateRange(
                new Date(selectedPackage.startDate),
                new Date(selectedPackage.endDate)
            );
        }
    }, [selectedPackage?.startDate, selectedPackage?.endDate]);

    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setDateRange(dates);

        // Initialize selectedMeals with empty arrays for each date
        const initialSelectedMeals = {};
        dates.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            initialSelectedMeals[dateStr] = [];
        });

        // If editing, populate with existing meal selections
        if (selectedPackage && selectedPackage.dailyMeals) {
            Object.keys(selectedPackage.dailyMeals).forEach(dateStr => {
                initialSelectedMeals[dateStr] = selectedPackage.dailyMeals[dateStr] || [];
            });
        }

        setSelectedMeals(initialSelectedMeals);
    };

    const fetchMealPackages = async () => {
        try {
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
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-meal-plans", { withCredentials: true });
            setMealPlan(response.data.data || []);
        } catch (error) {
            console.error("Error fetching meal plans:", error);
        }
    };

    const handleAdd = () => {
        setSelectedPackage({
            packageName: '',
            description: '',
            startDate: '',
            endDate: '',
            dailyMeals: {}
        });
        setIsCanvasOpen(true);
        setIsEditable(false);
        setFormErrors({});
        setDateRange([]);
        setSelectedMeals({});
        setPackageGroup("");
    };


    const handleEdit = (mealPackage) => {
        setSelectedPackage({
            ...mealPackage,
            identifier: mealPackage.identifier || "" // Ensure identifier is preserved when editing
        });
        setIsCanvasOpen(true);
        setIsEditable(true);
        setFormErrors({});
        setPackageGroup(mealPackage.packageGroup || "");

        if (mealPackage.startDate && mealPackage.endDate) {
            generateDateRange(
                new Date(mealPackage.startDate),
                new Date(mealPackage.endDate)
            );
        }
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.get('packageName')) errors.packageName = "Package name is required.";
        if (!formData.get('startDate')) errors.startDate = "Start date is required.";
        if (!formData.get('endDate')) errors.endDate = "End date is required.";
        if (!packageGroup) errors.packageGroup = "Package group is required.";

        // Check if end date is after start date
        const startDate = new Date(formData.get('startDate'));
        const endDate = new Date(formData.get('endDate'));
        if (startDate > endDate) {
            errors.endDate = "End date must be after start date.";
        }

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

        const startDate = new Date(formData.get("startDate"));
        const endDate = new Date(formData.get("endDate"));

        // Convert selectedMeals to the required format for API
        const mealsArray = [];
        let dayCounter = 1;
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            // Format the date as YYYY-MM-DD without time component
            const formattedDate = dateStr;

            mealsArray.push({
                [`day${dayCounter}`]: {
                    meals: selectedMeals[dateStr] || [],
                    date: formattedDate,  // Changed from ISO format to simple YYYY-MM-DD
                },
            });

            currentDate.setDate(currentDate.getDate() + 1);
            dayCounter++;
        }

        // Generate identifier only if it's a new package
        const packageIdentifier = selectedPackage?.identifier ||
            formData.get("packageName").toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

        const packageData = {
            packageName: formData.get("packageName"),
            description: formData.get("description"),
            packageGroup: packageGroup,
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            identifier: packageIdentifier, // Ensuring identifier is always included
            meals: mealsArray,
            isDeleted: false,
            isPermanent: false,
            repeatTillEnd: true
        };

        console.log("Package Data being submitted:", packageData);

        try {
            if (isEditable && selectedPackage) {
                await axios.patch("https://api.dailyfit.ae/api/admin/update-package", packageData, { withCredentials: true });
                toast.success("Package updated successfully!");
            } else {
                await axios.post("https://api.dailyfit.ae/api/admin/add-package", packageData, { withCredentials: true });
                toast.success("Package added successfully!");
            }

            fetchMealPackages();
            setIsCanvasOpen(false);
        } catch (error) {
            console.error("Error saving meal package:", error);
            toast.error("Failed to save the meal package. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.dailyfit.ae/api/admin/delete`, {
                data: { identifier: id },
                withCredentials: true,
            });
            toast.success("Package deleted successfully!");
            fetchMealPackages();
        } catch (error) {
            console.error("Error deleting package:", error);
            toast.error("Failed to delete package. Please try again.");
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setSelectedPackage(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openMealSelectionModal = (date) => {
        setSelectedDate(date);
        setShowMealModal(true);
    };

    const handleMealSelection = (mealId) => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        setSelectedMeals(prev => {
            const currentMeals = [...(prev[dateStr] || [])];
            const index = currentMeals.indexOf(mealId);

            if (index === -1) {
                // Add meal
                return {
                    ...prev,
                    [dateStr]: [...currentMeals, mealId]
                };
            } else {
                // Remove meal
                currentMeals.splice(index, 1);
                return {
                    ...prev,
                    [dateStr]: currentMeals
                };
            }
        });
    };

    const getMealCountForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return selectedMeals[dateStr]?.length || 0;
    };

    const openCopyModal = (sourceDate) => {
        setCopySourceDate(sourceDate);
        setShowCopyModal(true);
    };

    const handleCopyMeals = (targetDate) => {
        const sourceDateStr = copySourceDate.toISOString().split('T')[0];
        const targetDateStr = targetDate.toISOString().split('T')[0];

        // Copy meals from source to target
        setSelectedMeals(prev => ({
            ...prev,
            [targetDateStr]: [...(prev[sourceDateStr] || [])]
        }));
    };

    const copyToAllDays = () => {
        if (!copySourceDate) return;

        const sourceDateStr = copySourceDate.toISOString().split('T')[0];
        const sourceMeals = selectedMeals[sourceDateStr] || [];

        // Copy to all dates except source
        const updatedMeals = { ...selectedMeals };
        dateRange.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            if (dateStr !== sourceDateStr) {
                updatedMeals[dateStr] = [...sourceMeals];
            }
        });

        setSelectedMeals(updatedMeals);
        setShowCopyModal(false);
        toast.success("Meals copied to all days!");
    };

    const isMealSelected = (mealId) => {
        if (!selectedDate) return false;
        const dateStr = selectedDate.toISOString().split('T')[0];
        return selectedMeals[dateStr]?.includes(mealId) || false;
    };

    const filteredPackages = useMemo(() => {
        return mealPackages.filter((pkg) =>
            (pkg.packageName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);

    const getMealName = (mealId) => {
        const meal = mealData.find(m => m._id === mealId);
        return meal ? meal.mealName : "Unknown Meal";
    };

    const columns = [
        { name: 'Name', selector: (row) => row.packageName, sortable: true },
        { name: 'Start Date', selector: (row) => new Date(row.startDate).toLocaleDateString(), sortable: true },
        { name: 'End Date', selector: (row) => new Date(row.endDate).toLocaleDateString(), sortable: true },
        {
            name: 'Duration',
            selector: (row) => {
                const start = new Date(row.startDate);
                const end = new Date(row.endDate);
                const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
                return `${days} day${days !== 1 ? 's' : ''}`;
            },
            sortable: true
        },
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

            {/* Main Canvas Form */}
            {isCanvasOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40">
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
                                <label htmlFor="packageGroup" className="block mb-1">
                                    Select Package Group
                                </label>
                                <select
                                    id="packageGroup"
                                    className="w-full border p-2 rounded"
                                    value={packageGroup}
                                    onChange={(e) => setPackageGroup(e.target.value)}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    <option value="Full Package">Full Package</option>
                                    <option value="Main Meals with Breakfast">Main Meals with Breakfast</option>
                                    <option value="Main Meals with FITT Snacks">Main Meals with FITT Snacks</option>
                                    <option value="Main Meals Only">Main Meals Only</option>
                                </select>
                                {formErrors.packageGroup && <p className="text-red-500 text-sm">{formErrors.packageGroup}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Start Date:</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    value={selectedPackage?.startDate ? new Date(selectedPackage.startDate).toISOString().split('T')[0] : ""}
                                    onChange={handleDateChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {formErrors.startDate && <p className="text-red-500 text-sm">{formErrors.startDate}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">End Date:</label>
                                <input
                                    name="endDate"
                                    type="date"
                                    value={selectedPackage?.endDate ? new Date(selectedPackage.endDate).toISOString().split('T')[0] : ""}
                                    onChange={handleDateChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {formErrors.endDate && <p className="text-red-500 text-sm">{formErrors.endDate}</p>}
                            </div>

                            {dateRange.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="font-medium">Meal Schedule:</label>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="grid grid-cols-1 divide-y">
                                            {dateRange.map((date, index) => (
                                                <div key={index} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {getMealCountForDate(date) > 0
                                                                ? `${getMealCountForDate(date)} meals selected`
                                                                : "No meals selected"}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            type="button"
                                                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                            onClick={() => openMealSelectionModal(date)}
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                            onClick={() => openCopyModal(date)}
                                                        >
                                                            <Copy size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

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
                </div>
            )}

            {/* Meal Selection Modal */}
            {showMealModal && selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-1/2 max-h-3/4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">
                                Select Meals for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>
                            <button onClick={() => setShowMealModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-1 gap-2">
                                {mealData && mealData.length > 0 ? (
                                    mealData.map((meal) => (
                                        <div
                                            key={meal._id}
                                            className={`flex items-center p-3 rounded-lg border ${isMealSelected(meal._id) ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => handleMealSelection(meal._id)}
                                        >
                                            <div className={`w-6 h-6 mr-3 flex items-center justify-center rounded-full ${isMealSelected(meal._id) ? 'bg-blue-500 text-white' : 'border border-gray-300'
                                                }`}>
                                                {isMealSelected(meal._id) && <Check size={14} />}
                                            </div>
                                            <div>
                                                <p className="font-medium">{meal.mealName}</p>
                                                {meal.description && <p className="text-sm text-gray-500">{meal.description}</p>}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-4">No meals available</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end p-4 border-t">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => setShowMealModal(false)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Copy Meals Modal */}
            {showCopyModal && copySourceDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-1/2 max-h-3/4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">
                                Copy Meals from {copySourceDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </h3>
                            <button onClick={() => setShowCopyModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Selected meals to copy:</h4>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    {copySourceDate && (
                                        <div>
                                            {selectedMeals[copySourceDate.toISOString().split('T')[0]]?.length > 0 ? (
                                                <ul className="list-disc pl-5">
                                                    {selectedMeals[copySourceDate.toISOString().split('T')[0]].map(mealId => (
                                                        <li key={mealId}>{getMealName(mealId)}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">No meals selected for this day</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">Select target date(s):</h4>
                                    <button
                                        className="text-sm text-blue-500 hover:text-blue-700"
                                        onClick={copyToAllDays}
                                    >
                                        Copy to all days
                                    </button>
                                </div>

                                <div className="max-h-64 overflow-y-auto border rounded-lg">
                                    <div className="grid grid-cols-1 divide-y">
                                        {dateRange.map((date, index) => {
                                            // Don't show source date as a target option
                                            if (date.toISOString().split('T')[0] === copySourceDate.toISOString().split('T')[0]) {
                                                return null;
                                            }

                                            return (
                                                <div key={index} className="p-3 hover:bg-gray-50 flex justify-between items-center">
                                                    <p>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                                    <button
                                                        type="button"
                                                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                                        onClick={() => {
                                                            handleCopyMeals(date);
                                                            toast.success(`Meals copied to ${date.toLocaleDateString()}`);
                                                        }}
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4 border-t">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setShowCopyModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" />
        </div>
    );
}