import React, { useState } from 'react';
import { Settings, Home, Package, Utensils, Users, PlusSquare, LayoutGrid, Drumstick, Tag, Calendar, Box, Folder, ClipboardList } from "lucide-react"; // Importing appropriate icons
import ProductCrudPage from './ProductCrudPage';  // Importing the page
import UserCrudPage from './UsersCrudPage';
import MealPage from './MealPage';
import MealPackagePage from './MealPackage';
import MealTypePage from './MealTypePage';
import MealPlanPage from './MealPlanPage';
import AddOnPage from './AddOnPage';
import OrderDetailsPage from './OrderDetailsPage';
import CategoryPage from './CategoryPage';
import ImageCustomizer from './ImageCustomizer'

const Sidebar = ({ onSelect }) => {
    return (
        <div className="w-64 h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 text-white p-4 flex flex-col justify-between">
            <div className="text-2xl font-bold mb-6 text-center">Daily Fit</div>
            <ul className="space-y-4">
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('category')}>
                    <Folder className="mr-2" /> Category
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('meal')}>
                    <Drumstick className="mr-2" /> Meal
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('mealType')}>
                    <Tag className="mr-2" /> Meal Type
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('mealPlan')}>
                    <Calendar className="mr-2" /> Meal Plan
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('mealPackage')}>
                    <Box className="mr-2" /> Meal Package
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('addProduct')}>
                    <PlusSquare className="mr-2" /> Add On Product
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('users')}>
                    <Users className="mr-2" /> Users Overview
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('orders')}>
                    <ClipboardList className="mr-2" /> Orders Overview
                </li>
            </ul>
            <div className="mt-4 cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('settings')}>
                <Settings className="mr-2" /> Settings
            </div>
        </div>
    );
};

const AdminDashboardPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('meal');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'mealPlan':
                return <MealPlanPage />;
            case 'users':
                return <UserCrudPage />;
            case 'addProduct':
                return <AddOnPage />;
            case 'layoutDesign':
                return <ImageCustomizer />;
            case 'category':
                return <CategoryPage />;
            case 'meal':
                return <MealPage />;
            case 'mealType':
                return <MealTypePage />;
            case 'mealPackage':
                return <MealPackagePage />;
            case 'orders':
                return <OrderDetailsPage />;
            default:
                return <ProductCrudPage />;
        }
    };


    const getMenuTitle = () => {
        switch (selectedMenu) {
            case 'users':
                return 'Users List';
            case 'mealPlan':
                return 'Meal Plan';
            case 'addProduct':
                return 'Add On Product';
            case 'layoutDesign':
                return 'Image Customizer';
            case 'category':
                return 'Category List';
            case 'meal':
                return 'Meal';
            case 'mealType':
                return 'Meal Type';
            case 'mealPackage':
                return 'Meal Package';
            case 'orders':
                return 'Ordes List';
            default:
                return 'Daily Fit';
        }
    };


    return (
        <div className="flex">
            <Sidebar onSelect={setSelectedMenu} />
            <div className="flex-1 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center bg-white p-4 shadow">
                    <div className="text-xl font-bold">{getMenuTitle()}</div>
                    <Home className="cursor-pointer" onClick={() => setSelectedMenu('menu1')} />
                </div>
                <div className="p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
