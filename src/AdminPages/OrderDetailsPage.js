// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { Search } from 'lucide-react';
// import DataTable from 'react-data-table-component';

// export default function OrderDetailsPage() {
//     const [orders, setOrders] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get('https://api.dailyfit.ae/api/admin/get-orders', { withCredentials: true });
//             setOrders(response.data.data);
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//             setError('Failed to fetch orders. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredOrders = useMemo(() => {
//         return orders.filter(order =>
//             order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             order.orderID?.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [orders, searchTerm]);

//     const columns = [
//         {
//             name: 'Order ID',
//             selector: row => row.orderID || 'N/A',
//             sortable: true,
//         },
//         {
//             name: 'Email',
//             selector: row => row.userEmail || 'N/A',
//             sortable: true,
//         },
//         {
//             name: 'Package',
//             selector: row => row.selectedMeals?.package?.selectedPackage || 'No Package',
//             sortable: true,
//         },
//         {
//             name: 'Start Date',
//             selector: row => row.selectedMeals?.package?.startDate || 'N/A',
//             sortable: true,
//         },
//         {
//             name: 'End Date',
//             selector: row => row.selectedMeals?.package?.endDate || 'N/A',
//             sortable: true,
//         },
//         {
//             name: 'Amount',
//             selector: row => `$${row.amount || 0}`,
//             sortable: true,
//         }
//     ];

//     return (
//         <div className="p-4">
//             <div className="bg-white rounded-lg shadow-md">
//                 <div className="p-4 border-b flex justify-between items-center">
//                     <div className="relative w-64">
//                         <Search className="absolute left-2 top-3 h-5 w-5 text-gray-500" />
//                         <input
//                             type="text"
//                             placeholder="Search orders..."
//                             className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div className="p-4">
//                     {loading ? (
//                         <p className="text-center text-gray-600">Loading orders...</p>
//                     ) : error ? (
//                         <p className="text-center text-red-600">{error}</p>
//                     ) : (
//                         <DataTable
//                             columns={columns}
//                             data={filteredOrders}
//                             pagination
//                             paginationPerPage={10}
//                             paginationRowsPerPageOptions={[10, 20, 30]}
//                             responsive
//                             highlightOnHover
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MoreVertical, 
  Info,
  AlertCircle
} from 'lucide-react';

const MealDetailModal = ({ isOpen, onClose, selectedMeals }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Meal Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>
        {selectedMeals?.map((dayMeals, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <div className="flex items-center mb-2">
              <Calendar size={16} className="mr-2 text-blue-500" />
              <span className="font-semibold">{dayMeals.date}</span>
            </div>
            <div className="pl-6">
              {dayMeals.meals?.map((mealId, mealIndex) => (
                <div 
                  key={mealId} 
                  className="flex items-center text-gray-700 mb-1"
                >
                  <Info size={16} className="mr-2 text-green-500" />
                  <span>Meal {mealIndex + 1}: {mealId}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function OrderDetailsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderMeals, setSelectedOrderMeals] = useState(null);
  const [orderStatus, setOrderStatus] = useState('all');
  
  // New state for API fetching
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://api.dailyfit.ae/api/admin/get-orders', { 
        withCredentials: true 
      });
      setOrders(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      (searchTerm === '' || 
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderID?.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (orderStatus === 'all' || 
        (orderStatus === 'completed' && order.paymentStatus === 2) ||
        (orderStatus === 'pending' && order.paymentStatus === 1)
      )
    );
  }, [orders, searchTerm, orderStatus]);

  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: MoreVertical },
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-500' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-500' }
  ];

  // Columns for DataTable
  const columns = [
    {
      name: 'Order ID',
      selector: row => row.orderID,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.userEmail,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => `$${row.amount}`,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        row.paymentStatus === 1 ? (
          <span className="flex items-center text-yellow-600">
            <Clock size={16} className="mr-2" /> Pending
          </span>
        ) : (
          <span className="flex items-center text-green-600">
            <CheckCircle size={16} className="mr-2" /> Completed
          </span>
        )
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <button 
          onClick={() => setSelectedOrderMeals(row.selectedMeals?.package?.selectedMeals || [])}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Info size={16} className="mr-2" /> View Meals
        </button>
      ),
    }
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f3f4f6',
        borderBottomColor: '#e5e7eb',
      },
    },
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
  };

  // Loading and Error Components
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin">
          <Clock size={48} className="text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchOrders} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Fetching Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setOrderStatus(status.value)}
                className={`
                  flex items-center px-3 py-2 rounded-md 
                  ${orderStatus === status.value 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <status.icon 
                  size={16} 
                  className={`mr-2 ${status.color || 'text-gray-500'}`} 
                />
                {status.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <DataTable
            columns={columns}
            data={filteredOrders}
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            noDataComponent={
              <div className="p-4 text-center flex flex-col items-center">
                <Info size={36} className="text-blue-500 mb-2" />
                <p>No orders found</p>
              </div>
            }
          />
        </div>
      </div>

      <MealDetailModal 
        isOpen={!!selectedOrderMeals}
        onClose={() => setSelectedOrderMeals(null)}
        selectedMeals={selectedOrderMeals || []}
      />
    </div>
  );
}