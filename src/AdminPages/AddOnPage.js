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

export default function AddOnPage() {
    const [products, setProducts] = useState(initialProducts);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/admin/category");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    const handleAdd = () => {
        setSelectedProduct(null);
        setIsCanvasOpen(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsCanvasOpen(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productData = {
            productType: formData.get("productType"),  // Capture productType
            name: formData.get("name"),
            price: formData.get("price"),
            description: formData.get("description"),
            category: formData.get("category"),
            calories: formData.get("calories"),
            protein: formData.get("protein"),
            fat: formData.get("fat"),
            carbs: formData.get("carbs"),
            allergies: formData.get("allergies"),
            specialOccasion: formData.get("specialOccasion"),
            image: imageBase64 || null,
        };

        try {
            if (selectedProduct) {
                await axios.put(`/api/products/${selectedProduct.id}`, productData);
                alert("Product updated successfully!");
            } else {
                await axios.post("/api/products", productData);
                alert("Product added successfully!");
            }
            setIsCanvasOpen(false);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product. Please try again.");
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
                    <button onClick={() => handleDelete(row.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
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
                                {selectedProduct ? 'Edit Supplement Product' : 'Add Supplement Product'}
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
                                <label className="block mb-1">Product Type:</label>
                                <select name="productType" defaultValue={selectedProduct?.productType} className="w-full border p-2 rounded" required>
                                    <option value="smoothy">Smoothy</option>
                                    <option value="shake">Shake</option>
                                    <option value="bar">Bar</option>
                                </select>
                            </div>
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
                            {/* <div className="flex items-center space-x-4">
                                <button
                                    onClick={handlePrevProduct}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNextProduct}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div> */}
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
