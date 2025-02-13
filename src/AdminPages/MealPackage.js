// import React, { useState, useMemo, useEffect } from 'react';
// import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
// import DataTable from 'react-data-table-component';
// import axios from "../axiosConfig";

// const initialMealPackages = [
//     { id: 1, name: 'Breakfast Delight', },
//     { id: 2, name: 'Dinner Special' },
// ];

// export default function MealPackage() {
//     const [mealPackages, setMealPackages] = useState(initialMealPackages);
//     const [isCanvasOpen, setIsCanvasOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [formErrors, setFormErrors] = useState({});

//     const fetchProducts = async () => {
//         try {
//             const token = sessionStorage.getItem("token");
//             const response = await axios.get("/admin/category", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setMealPackages(response.data.categories);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleAdd = () => {
//         setSelectedPackage(null);
//         setImagePreview(null);
//         setIsCanvasOpen(true);
//         setFormErrors({});
//     };

//     const handleEdit = (mealPackage) => {
//         setSelectedPackage(mealPackage);
//         setImagePreview(mealPackage.image);
//         setIsCanvasOpen(true);
//         setFormErrors({});
//     };

//     const handleDelete = (id) => {
//         setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
//     };

//     const validateForm = (formData) => {
//         const errors = {};
//         if (!formData.get('name')) errors.name = "Name is required.";
//         return errors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const errors = validateForm(formData);
//         if (Object.keys(errors).length > 0) {
//             setFormErrors(errors);
//             return;
//         }

//         const newPackage = {
//             name: formData.get('name'),
//         };

//         const token = sessionStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         try {
//             let response;
//             if (selectedPackage) {
//                 response = await axios.put(`admin/addcategory/${selectedPackage.id}`, newPackage, { headers });
//                 setMealPackages(mealPackages.map(p => p.id === selectedPackage.id ? response.data : p));
//             } else {
//                 response = await axios.post(`/admin/addcategory`, newPackage, { headers });
//                 setMealPackages([...mealPackages, response.data]);
//             }
//             fetchProducts();
//             setIsCanvasOpen(false);
//             setImagePreview(null);
//         } catch (error) {
//             console.error('Error saving meal package:', error);
//         }
//     };

//     const filteredPackages = useMemo(() => {
//         return mealPackages.filter(pkg =>
//             (pkg.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//             (pkg.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
//         );
//     }, [mealPackages, searchTerm]);

//     const columns = [
//         { name: 'Name', selector: row => row.name, sortable: true },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 <div className="flex justify-center space-x-2">
//                     <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
//                         <Pencil size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(row.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
//                         <Trash2 size={16} />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="p-4">
//             <div className="flex justify-end mb-4">
//                 <button onClick={handleAdd} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                     <Plus size={16} />
//                     <span>Add Meal Package</span>
//                 </button>
//             </div>

//             <div className="bg-white rounded-lg shadow-md">
//                 <div className="p-4 border-b">
//                     <div className="flex justify-end items-center space-x-4">
//                         <div className="relative w-64">
//                             <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <input
//                                 type="text"
//                                 placeholder="Search meal Package..."
//                                 className="pl-8 pr-4 py-2 w-full border rounded-md"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-4">
//                     <DataTable columns={columns} data={filteredPackages} pagination responsive highlightOnHover />
//                 </div>
//             </div>

//             {isCanvasOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
//                     <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold">{selectedPackage ? 'Edit Meal Package' : 'Add Meal Package'}</h2>
//                             <button onClick={() => setIsCanvasOpen(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
//                                 <X size={16} />
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label className="block mb-1">Name:</label>
//                                 <input name="name" defaultValue={selectedPackage?.name} className="w-full border p-2 rounded" placeholder='Enter your meal name' required />
//                                 {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
//                             </div>
//                             <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
//                                 <button type="submit" className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition duration-300 text-lg">
//                                     {selectedPackage ? 'Update' : 'Save'}
//                                 </button>
//                                 <button type="button" onClick={() => setIsCanvasOpen(false)} className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition duration-300 text-lg">
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import axios from "../axiosConfig";

const initialMealPackages = [
    { id: 1, name: 'Breakfast Delight' },
    { id: 2, name: 'Dinner Special' },
];

export default function MealPackage() {
    const [mealPackages, setMealPackages] = useState(initialMealPackages);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    
    const mealPlans = ['Basic', 'Standard', 'Premium'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const statusOptions = ['Active', 'Inactive'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("/admin/category", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMealPackages(response.data.categories);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleAdd = () => {
        setSelectedPackage(null);
        setIsCanvasOpen(true);
        setFormErrors({});
    };

    const handleEdit = (mealPackage) => {
        setSelectedPackage(mealPackage);
        setIsCanvasOpen(true);
        setFormErrors({});
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.get('name')) errors.name = "Name is required.";
        if (!formData.get('mealPlan')) errors.mealPlan = "Meal plan is required.";
        if (!formData.get('pricePerWeek')) errors.pricePerWeek = "Price per week is required.";
        if (!formData.get('status')) errors.status = "Status is required.";
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

        const newPackage = {
            name: formData.get('name'),
            mealPlan: formData.get('mealPlan'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            meals: formData.get('meals'),
            pricePerWeek: formData.get('pricePerWeek'),
            status: formData.get('status'),
        };

        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            let response;
            if (selectedPackage) {
                response = await axios.put(`/admin/addcategory/${selectedPackage.id}`, newPackage, { headers });
                setMealPackages(mealPackages.map((p) => (p.id === selectedPackage.id ? response.data : p)));
            } else {
                response = await axios.post(`/admin/addcategory`, newPackage, { headers });
                setMealPackages([...mealPackages, response.data]);
            }
            fetchProducts();
            setIsCanvasOpen(false);
        } catch (error) {
            console.error('Error saving meal package:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this meal package?");
        if (!confirmDelete) return;
    
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
    
        try {
            await axios.delete(`/admin/deletecategory/${id}`, { headers });
            setMealPackages(mealPackages.filter(pkg => pkg.id !== id));
            alert("Meal package deleted successfully.");
        } catch (error) {
            console.error("Error deleting meal package:", error);
            alert("Failed to delete the meal package")
        }}
    

    const filteredPackages = useMemo(() => {
        return mealPackages.filter((pkg) =>
            (pkg.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [mealPackages, searchTerm]);

    const columns = [
        { name: 'Name', selector: (row) => row.name, sortable: true },
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
                                placeholder="Search meal Package..."
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
                    <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedPackage ? 'Edit Meal Package' : 'Add Meal Package'}</h2>
                            <button onClick={() => setIsCanvasOpen(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name:</label>
                                <input name="name" defaultValue={selectedPackage?.name} className="w-full border p-2 rounded" required />
                                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Meal Plan:</label>
                                <select name="mealPlan" defaultValue={selectedPackage?.mealPlan} className="w-full border p-2 rounded" required>
                                    <option value="">Select Meal Plan</option>
                                    {mealPlans.map((plan) => (
                                        <option key={plan} value={plan}>{plan}</option>
                                    ))}
                                </select>
                                {formErrors.mealPlan && <p className="text-red-500 text-sm">{formErrors.mealPlan}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Start Date:</label>
                                <input name="startDate" type="date" defaultValue={selectedPackage?.startDate} className="w-full border p-2 rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">End Date:</label>
                                <input name="endDate" type="date" defaultValue={selectedPackage?.endDate} className="w-full border p-2 rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Meals:</label>
                                <select name="meals" defaultValue={selectedPackage?.meals} className="w-full border p-2 rounded">
                                    <option value="">Select Meals</option>
                                    {meals.map((meal) => (
                                        <option key={meal} value={meal}>{meal}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Price Per Week:</label>
                                <input name="pricePerWeek" type="number" defaultValue={selectedPackage?.pricePerWeek} className="w-full border p-2 rounded" required />
                                {formErrors.pricePerWeek && <p className="text-red-500 text-sm">{formErrors.pricePerWeek}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Status:</label>
                                <select name="status" defaultValue={selectedPackage?.status} className="w-full border p-2 rounded" required>
                                    <option value="">Select Status</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {formErrors.status && <p className="text-red-500 text-sm">{formErrors.status}</p>}
                            </div>
                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button type="submit" className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition duration-300 text-lg">
                                    {selectedPackage ? 'Update' : 'Save'}
                                </button>
                                <button type="button" onClick={() => setIsCanvasOpen(false)} className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition duration-300 text-lg">
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
