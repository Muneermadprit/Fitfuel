import React, { useState, useMemo, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, Search, X } from 'lucide-react';  // Add X for close icon
import DataTable from 'react-data-table-component';
import axios from "axios";


const initialProducts = [
    { id: 1, name: 'Product A', price: '$10', description: 'Description A', category: 'Eid', image: '', calories: '', protein: '', fat: '', carbs: '', allergies: '', specialOccasion: '' },
    { id: 2, name: 'Product B', price: '$20', description: 'Description B', category: 'Christmas', image: '', calories: '', protein: '', fat: '', carbs: '', allergies: '', specialOccasion: '' },
    { id: 3, name: 'Product C', price: '$30', description: 'Description C', category: 'Onam', image: '', calories: '', protein: '', fat: '', carbs: '', allergies: '', specialOccasion: '' },
];

const categories = ['All', 'Eid', 'Christmas', 'Onam', 'Ramadan'];

export default function ProductCrudPage() {
    const [products, setProducts] = useState(initialProducts);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    useEffect(() => {
        fetchProducts();
        fetchCategory();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/admin/getproducts", { headers });
            console.log(response.data.product, 'ok')
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const token = sessionStorage.getItem("token"); // Retrieve token
            const response = await axios.get("/admin/category", {
                headers: {
                    Authorization: `Bearer ${token}`  // Pass token in headers
                }
            });
            console.log(response.data.categories, 'categories')
            // setMealPackages(response.data.categories); // Set only the categories array
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setIsCanvasOpen(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsCanvasOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(id);

        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await axios.delete(`/admin/deleteproduct/:${id}`, { headers });

            if (response.status === 200) {
                setProducts(products.filter(product => product.id !== id));
            } else {
                console.error("Failed to delete the product");
            }
        } catch (error) {
            console.error("Error deleting the product:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get form data
        const mealName = e.target.name.value.trim();
        const price = parseFloat(e.target.price.value);
        const description = e.target.description.value.trim();
        const category = e.target.category.value;
        const mealType = e.target.specialOccasion.value;
        const calories = parseFloat(e.target.calories.value) || 0;
        const protein = parseFloat(e.target.protein.value) || 0;
        const fat = parseFloat(e.target.fat.value) || 0;
        const carbs = parseFloat(e.target.carbs.value) || 0;
        const allergies = e.target.allergies.value ? e.target.allergies.value.split(',').map(a => a.trim()) : [];

        // Handle image upload (assuming `imageBase64` contains the uploaded image URL)
        if (!mealName || !description || !imageBase64 || !price) {
            // setFormErrors({ name: "All fields are required!" });
            return;
        }

        const mealData = {
            mealName,
            image: [imageBase64], // Assuming a single image uploaded
            description,
            category,
            package: ["Small", "Medium", "Large"], // Static packages as per the given model
            mealType,
            fareDetails: {
                totalFare: price,
                strikeOff: price + 1.5, // For demo, adding a static strike-off price
                discount: 1.5
            },
            moreDetails: {
                energy: calories,
                protein,
                fat,
                carbohydrates: carbs,
                allergens: allergies
            }
        };

        try {
            // Send POST request to the API
            const response = await axios.post('https://2733-2401-4900-6865-fc96-3074-5c65-9dbc-c80b.ngrok-free.app/api/admin/add-meal', mealData);
            console.log('Meal added successfully:', response.data);

            // Optionally, handle success (close canvas, show a success message, etc.)
            setIsCanvasOpen(false);
        } catch (error) {
            console.error('Failed to add meal:', error);
            // Optionally handle error (show an error message)
        }
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                const matchesSearch = (
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.price.toLowerCase().includes(searchTerm.toLowerCase())
                );
                const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });
    }, [products, searchTerm, selectedCategory]);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex justify-center space-x-2">
                    <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                        <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(row._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                        <Trash2 size={16} />
                    </button>
                    <button onClick={() => handleViewProduct(products[0])} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                        <Eye size={16} />
                    </button>
                </div>
            ),
        },
    ];
    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    const [imageBase64, setImageBase64] = useState(selectedProduct?.image || "");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setImageBase64("");
    };


    return (
        <div className="p-4">
            {/* Add button outside the box */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    <Plus size={16} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                {/* Search and filter controls aligned to right */}
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <select
                            className="border rounded-md px-4 py-2"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
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
                        data={filteredProducts}
                        pagination
                        responsive
                        highlightOnHover
                    />
                </div>
            </div>

            {/* Right-side Canvas Modal for Add/Edit Product */}
            {isCanvasOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <div className="bg-white w-1/3 p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {selectedProduct ? 'Edit Product' : 'Add Product'}
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
                                <label className="block mb-1">Product Name:</label>
                                <input name="name" defaultValue={selectedProduct?.name} className="w-full border p-2 rounded" placeholder="Product Name" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Price:</label>
                                <input name="price" defaultValue={selectedProduct?.price} className="w-full border p-2 rounded" placeholder="Price" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Description:</label>
                                <textarea name="description" defaultValue={selectedProduct?.description} className="w-full border p-2 rounded" placeholder="Description" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Product Image:</label>
                                <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={handleImageUpload} />
                            </div>

                            {imageBase64 && (
                                <div className="mb-4 flex flex-col items-center">
                                    <img src={imageBase64} alt="Product Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                                    <button type="button" onClick={handleImageDelete} className="mt-2 text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="block mb-1">Product Category:</label>
                                <select name="category" defaultValue={selectedProduct?.category} className="w-full border p-2 rounded" required>
                                    {categories.slice(1).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Calories:</label>
                                <input name="calories" defaultValue={selectedProduct?.calories} className="w-full border p-2 rounded" placeholder="Calories" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Protein:</label>
                                <input name="protein" defaultValue={selectedProduct?.protein} className="w-full border p-2 rounded" placeholder="Protein" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Fat:</label>
                                <input name="fat" defaultValue={selectedProduct?.fat} className="w-full border p-2 rounded" placeholder="Fat" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Carbs:</label>
                                <input name="carbs" defaultValue={selectedProduct?.carbs} className="w-full border p-2 rounded" placeholder="Carbs" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Allergies:</label>
                                <input name="allergies" defaultValue={selectedProduct?.allergies} className="w-full border p-2 rounded" placeholder="Allergies" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Course Category:</label>
                                <select name="specialOccasion" defaultValue={selectedProduct?.specialOccasion} className="w-full border p-2 rounded" required>
                                    <option value="bf">Breakfast</option>
                                    <option value="mc1">Main Course 1</option>
                                    <option value="mc2">Main Course 2</option>
                                    <option value="mc3">Main Course 3</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 p-4 bg-white shadow-inner rounded-b-lg">
                                <button type="submit" className="w-32 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition duration-300 text-lg">
                                    {selectedProduct ? 'Update' : 'Save'}
                                </button>
                                <button type="button" onClick={() => setIsCanvasOpen(false)} className="w-32 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition duration-300 text-lg">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-1/3 p-6 rounded-lg shadow-xl relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Product Detail View</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Name:</label>
                            <input
                                name="name"
                                defaultValue={selectedProduct?.name}
                                className="w-full border p-2 rounded bg-gray-50"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Price:</label>
                            <input
                                name="price"
                                defaultValue={selectedProduct?.price}
                                className="w-full border p-2 rounded bg-gray-50"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Description:</label>
                            <textarea
                                name="description"
                                defaultValue={selectedProduct?.description}
                                className="w-full border p-2 rounded bg-gray-50"
                                disabled
                                rows="3"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Category:</label>
                            <input
                                name="category"
                                defaultValue={selectedProduct?.category}
                                className="w-full border p-2 rounded bg-gray-50"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
