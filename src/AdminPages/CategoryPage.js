import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryPage() {
    const [mealPackages, setMealPackages] = useState([]);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formErrors, setFormErrors] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://api.dailyfit.ae/api/admin/get-categories", { withCredentials: true });
            setMealPackages(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

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
        e.preventDefault();
        const categoryName = selectedPackage.categoryName.trim();

        if (!categoryName) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                name: "Category name is required",
            }));
            return;
        }

        try {
            if (isEditing) {
                // Include the ID in the request for updating
                const categoryData = {
                    identifier: selectedPackage.identifier,
                    categoryName: categoryName
                };
                await axios.patch(`https://api.dailyfit.ae/api/admin/updateCategory`, categoryData, { withCredentials: true });
                toast.success("Category updated successfully!");
            } else {
                const categoryData = { categoryName };
                await axios.post(`https://api.dailyfit.ae/api/admin/add-categories`, categoryData, { withCredentials: true });
                toast.success("Category added successfully!");
            }
            setIsCanvasOpen(false);
            setIsEditing(false);
            setSelectedPackage(null);
            fetchProducts(); // Refresh the list after operation
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const filteredPackages = useMemo(() => {
        return (mealPackages || []).filter(pkg =>
            (pkg.categoryName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);

    const columns = [
        {
            name: 'Category',
            selector: row => row.categoryName,
            sortable: true,
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

    const handleCanvasClose = () => {
        setIsCanvasOpen(false);
        setIsEditing(false);
        setSelectedPackage(null);
        setFormErrors({ name: '' });
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    <Plus size={16} />
                    <span>Add Category</span>
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
                                <label className="block mb-1">Category Name:</label>
                                <input
                                    name="category_name"
                                    value={selectedPackage?.categoryName || ""}
                                    onChange={(e) =>
                                        setSelectedPackage((prev) => ({
                                            ...prev,
                                            categoryName: e.target.value,
                                        }))
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter The Category Name"
                                    required
                                />
                                {formErrors.name && (
                                    <span className="text-red-500 text-sm">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button
                                    type="submit"
                                    className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 backdrop-blur-md shadow-md transition duration-300 text-lg"
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