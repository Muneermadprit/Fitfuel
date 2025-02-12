import React, { useState } from 'react';
import { Package, Utensils, Users, PlusSquare, LayoutGrid, Settings, Home } from "lucide-react"; // Importing appropriate icons
import ProductCrudPage from './ProductCrudPage';  // Importing the page
import UserCrudPage from './UsersCrudPage';
import MealCrudPage from './MealCrudPage';
import AddOnPage from './AddOnPage';
import ImageCustomizer from './ImageCustomizer'

const Sidebar = ({ onSelect }) => {
    return (
        <div className="w-64 h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 text-white p-4 flex flex-col justify-between">
            <div className="text-2xl font-bold mb-6 text-center">Daily Fit</div>
            <ul className="space-y-4">
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('product')}>
                    <Package className="mr-2" /> Product
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('mealSelect')}>
                    <Utensils className="mr-2" /> Meal Selection
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('users')}>
                    <Users className="mr-2" /> Users Overview
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('addProduct')}>
                    <PlusSquare className="mr-2" /> Add On Product
                </li>
                <li className="cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('layoutDesign')}>
                    <LayoutGrid className="mr-2" /> Layout Design
                </li>
            </ul>
            <div className="mt-4 cursor-pointer hover:bg-purple-700 p-2 rounded flex items-center" onClick={() => onSelect('settings')}>
                <Settings className="mr-2" /> Settings
            </div>
        </div>
    );
};

const AdminDashboardPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('product');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'product':
                return <ProductCrudPage />;
            case 'mealSelect':
                return <MealCrudPage />;
            case 'users':
                return <UserCrudPage />;
            case 'addProduct':
                return <AddOnPage />;
            case 'layoutDesign':
                return <ImageCustomizer />;

            // case 'settings':
            //     return <SettingsPage />;
            default:
                return <ProductCrudPage />;
        }
    };

    const getMenuTitle = () => {
        switch (selectedMenu) {
            case 'product':
                return 'Product List';
            case 'users':
                return 'Users List';
            case 'mealSelect':
                return 'Meal List';
            case 'addProduct':
                return 'Add On Product';
            case 'layoutDesign':
                return 'Image Customizer';
            case 'settings':
                return 'Settings';
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
