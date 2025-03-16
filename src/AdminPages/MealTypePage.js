import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Search, Plus, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MealTypePage() {
    const [mealPackages, setMealPackages] = useState([]);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const fetchMealTypes = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-mealtype", { withCredentials: true });
            setMealPackages(response.data.data);
        } catch (error) {
            console.error("Error fetching meal types:", error);
        }
    };

    useEffect(() => {
        fetchMealTypes();
    }, []);

    const handleAdd = () => {
        setSelectedPackage(null);
        setIsEditing(false);
        setIsCanvasOpen(true);
        setFormErrors({});
    };

    const handleEdit = (mealPackage) => {
        setSelectedPackage(mealPackage);
        setIsEditing(true);
        setIsCanvasOpen(true);
        setFormErrors({});
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.dailyfit.ae/api/admin/delete`, {
                data: { identifier: id },
                withCredentials: true,
            });

            // setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
            toast.success("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");
        }
    };

    const validateForm = (mealType) => {
        const errors = {};
        if (!mealType.trim()) errors.name = "Meal name is required.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mealType = e.target.name.value.trim();

        const errors = validateForm(mealType);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }


        try {
            if (isEditing && selectedPackage) {
                // Update existing meal type
                // await axios.patch(`https://api.dailyfit.ae/api/admin/update-category/${selectedPackage.id}`, categoryData);
                await axios.patch('https://api.dailyfit.ae/api/admin/updateMealType', {
                    // id: selectedPackage.id,
                    mealType
                }, { withCredentials: true });
            } else {
                // Add new meal type
                await axios.post('https://api.dailyfit.ae/api/admin/add-mealtype', {
                    mealType
                }, { withCredentials: true });
            }

            await fetchMealTypes();
            setIsCanvasOpen(false);
            setSelectedPackage(null);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to handle meal type:', error);
            setFormErrors({ submit: 'Failed to process your request. Please try again.' });
        }
    };

    const filteredPackages = useMemo(() => {
        return mealPackages.filter(pkg =>
            (pkg.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (pkg.mealType?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);

    const columns = [
        {
            name: 'Meal Type',
            selector: row => row.mealType || row.name,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.identifier)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
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
                    <span>Add Meal Type</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search meal type..."
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
                    <ToastContainer position="top-right" />
                    <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {isEditing ? 'Edit Meal Type' : 'Add Meal Type'}
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
                                    defaultValue={selectedPackage?.mealType || selectedPackage?.name || ''}
                                    className="w-full border p-2 rounded"
                                    placeholder='Enter meal type name'
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                                )}
                            </div>
                            {formErrors.submit && (
                                <p className="text-red-500 text-sm mb-4">{formErrors.submit}</p>
                            )}
                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button
                                    type="submit"
                                    className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition duration-300 text-lg"
                                >
                                    {isEditing ? 'Update' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsCanvasOpen(false)}
                                    className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition duration-300 text-lg"
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