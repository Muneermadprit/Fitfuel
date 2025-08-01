// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import {
//   Search,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   MoreVertical,
//   Info,
//   AlertCircle,
//   Coffee,
//   DollarSign,
//   MapPin,
//   Phone
// } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MealDetailModal = ({ isOpen, onClose, orderDetails }) => {
//   if (!isOpen || !orderDetails) return null;

//   // Calculate total for package meals
//   const calculatePackageTotal = () => {
//     let total = 0;
//     if (orderDetails.selectedMeals?.package?.selectedMeals) {
//       orderDetails.selectedMeals.package.selectedMeals.forEach(dayMeal => {
//         dayMeal.meals.forEach(meal => {
//           total += meal.fareDetails.totalFare || 0;
//         });
//       });
//     }
//     return total;
//   };

//   // Calculate total for addons
//   const calculateAddonsTotal = () => {
//     let total = 0;
//     if (orderDetails.selectedMeals?.addons) {
//       orderDetails.selectedMeals.addons.forEach(addon => {
//         total += addon.fareDetails.totalFare || 0;
//       });
//     }
//     return total;
//   };

//   const packageTotal = calculatePackageTotal();
//   const addonsTotal = calculateAddonsTotal();
//   const grandTotal = packageTotal + addonsTotal;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Meal Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <XCircle size={24} />
//           </button>
//         </div>

//         {/* User Information */}
//         <div className="mb-6 p-3 bg-blue-50 rounded-lg">
//           <div className="text-blue-800 font-semibold mb-2">Customer Information</div>
//           <div className="text-gray-700">{orderDetails.userEmail}</div>

//           {/* Display address information */}
//           {orderDetails.address && (
//             <div className="mt-2">
//               <div className="flex items-center text-gray-700">
//                 <MapPin size={14} className="mr-1 text-blue-600" />
//                 <span className="text-sm">
//                   {[
//                     orderDetails.address.houseOrFlatNumber,
//                     orderDetails.address.buildingFloor,
//                     orderDetails.address.street,
//                     orderDetails.address.landmark,
//                     orderDetails.address.city,
//                     orderDetails.address.state,
//                     orderDetails.address.postalCode,
//                     orderDetails.address.country
//                   ].filter(Boolean).join(', ')}
//                 </span>
//               </div>
//               <div className="flex items-center text-gray-700 mt-1">
//                 <Phone size={14} className="mr-1 text-blue-600" />
//                 <span className="text-sm">{orderDetails.address.phone}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Package Information */}
//         {orderDetails.selectedMeals?.package?.selectedPackage && (
//           <div className="mb-6">
//             <div className="flex items-center mb-3">
//               <Calendar size={18} className="mr-2 text-blue-600" />
//               <span className="font-semibold text-lg">Package Duration</span>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-md mb-3">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <span className="text-gray-500 text-sm">Start Date:</span>
//                   <div className="font-medium">{orderDetails.selectedMeals.package.startDate}</div>
//                 </div>
//                 <div>
//                   <span className="text-gray-500 text-sm">End Date:</span>
//                   <div className="font-medium">{orderDetails.selectedMeals.package.endDate}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Display selected meals by date */}
//         {orderDetails.selectedMeals?.package?.selectedMeals?.length > 0 && (
//           <div className="mb-6">
//             <div className="flex items-center mb-3">
//               <Coffee size={18} className="mr-2 text-green-600" />
//               <span className="font-semibold text-lg">Selected Meals</span>
//             </div>

//             {orderDetails.selectedMeals.package.selectedMeals.map((dayMeals, index) => (
//               <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
//                 <div className="flex items-center mb-2 pb-2 border-b">
//                   <Calendar size={16} className="mr-2 text-blue-500" />
//                   <span className="font-semibold">{dayMeals.date}</span>
//                 </div>
//                 <div className="space-y-3">
//                   {dayMeals.meals?.map((meal, mealIndex) => (
//                     <div
//                       key={mealIndex}
//                       className="flex justify-between items-start pb-2 border-b border-gray-200"
//                     >
//                       <div className="flex-1">
//                         <div className="font-medium text-gray-800">{meal.mealName}</div>
//                         <div className="text-sm text-gray-600">{meal.description}</div>
//                       </div>
//                       <div className="ml-4 text-right">
//                         <div className="text-lg font-semibold">AED{meal.fareDetails.totalFare}</div>
//                         {meal.fareDetails.strikeOff > 0 && (
//                           <div className="text-xs text-gray-500 line-through">AED{meal.fareDetails.strikeOff}</div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Display addons if any */}
//         {orderDetails.selectedMeals?.addons?.length > 0 && (
//           <div className="mb-6">
//             <div className="flex items-center mb-3">
//               <Info size={18} className="mr-2 text-purple-600" />
//               <span className="font-semibold text-lg">Add-ons</span>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-md">
//               {orderDetails.selectedMeals.addons.map((addon, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-start pb-3 border-b border-gray-200 mb-3 last:mb-0 last:border-0"
//                 >
//                   <div className="flex-1">
//                     <div className="font-medium text-gray-800">{addon.mealName}</div>
//                     <div className="text-sm text-gray-600">{addon.description}</div>
//                   </div>
//                   <div className="ml-4 text-right">
//                     <div className="text-lg font-semibold">AED{addon.fareDetails.totalFare}</div>
//                     {addon.fareDetails.strikeOff > 0 && (
//                       <div className="text-xs text-gray-500 line-through">AED{addon.fareDetails.strikeOff}</div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Order Summary Section */}
//         <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//           <h3 className="font-bold text-lg mb-3 text-gray-800">Order Summary</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span>Package Meals:</span>
//               <span>AED{packageTotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Add-ons:</span>
//               <span>AED{addonsTotal.toFixed(2)}</span>
//             </div>
//             <div className="border-t border-gray-300 my-2 pt-2 flex justify-between items-center font-bold">
//               <span>Total:</span>
//               <span>AED{grandTotal.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function OrderDetailsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [orderStatus, setOrderStatus] = useState('all');

//   // State for API fetching
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   // Fetch orders on component mount
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get('https://api.dailyfit.ae/api/admin/get-orders', {
//         withCredentials: true
//       });
//       setOrders(response.data.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('Failed to fetch orders. Please try again.');
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrderDetails = async (orderId) => {
//     setDetailsLoading(true);
//     try {
//       const response = await axios.post('https://api.dailyfit.ae/api/admin/get-orderDetails', {
//         orderID: orderId
//       }, {
//         withCredentials: true
//       });

//       if (response.data.status && response.data.data.length > 0) {
//         setOrderDetails(response.data.data[0]);
//         setShowDetailsModal(true);
//       } else {
//         throw new Error('No order details found');
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       alert('Failed to fetch order details. Please try again.');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   // Get payment status display
//   const getPaymentStatusInfo = (status) => {
//     switch (status) {
//       case 0:
//         return { label: 'Not Paid', icon: XCircle, color: 'text-red-600' };
//       case 1:
//         return { label: 'Pending', icon: Clock, color: 'text-yellow-600' };
//       case 2:
//         return { label: 'Completed', icon: CheckCircle, color: 'text-green-600' };
//       default:
//         return { label: 'Unknown', icon: AlertCircle, color: 'text-gray-600' };
//     }
//   };

//   // Format address to a single line for display in table
//   const formatAddress = (address) => {
//     if (!address) return 'No address';

//     const parts = [
//       address.houseOrFlatNumber,
//       address.buildingFloor,
//       address.street,
//       address.city,
//       address.state,
//       address.postalCode
//     ].filter(Boolean);

//     return parts.join(', ');
//   };

//   const filteredOrders = useMemo(() => {
//     return orders.filter(order =>
//       (searchTerm === '' ||
//         order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.orderID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (order.address && order.address.phone && order.address.phone.includes(searchTerm))
//       ) &&
//       (orderStatus === 'all' ||
//         (orderStatus === 'completed' && order.paymentStatus === 2) ||
//         (orderStatus === 'pending' && order.paymentStatus === 1) ||
//         (orderStatus === 'not-paid' && order.paymentStatus === 0)
//       )
//     );
//   }, [orders, searchTerm, orderStatus]);

//   const statusOptions = [
//     { value: 'all', label: 'All Orders', icon: MoreVertical },
//     { value: 'not-paid', label: 'Not Paid', icon: XCircle, color: 'text-red-500' },
//     { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-500' },
//     { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-500' }
//   ];

//   // Columns for DataTable
//   const columns = [
//     {
//       name: 'Order ID',
//       selector: row => row.orderID,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Email',
//       selector: row => row.userEmail,
//       sortable: true,
//       width: '200px',
//     },
//     {
//       name: 'Address',
//       selector: row => formatAddress(row.address),
//       sortable: false,
//       cell: row => (
//         <div className="flex items-start me-2">
//           {/* <MapPin size={16} className="mr-1 mt-1 text-gray-500 flex-shrink-0" /> */}
//           <span className="truncate max-w-xs">{formatAddress(row.address)}</span>
//         </div>
//       ),
//       width: '300px',
//     },
//     {
//       name: 'Phone',
//       selector: row => row.address?.phone || 'N/A',
//       sortable: true,
//       cell: row => (
//         <div className="flex items-center ms-5">
//           {/* <Phone size={16} className="mr-1 text-gray-500" /> */}
//           {row.address?.phone || 'N/A'}
//         </div>
//       ),
//       width: '200px',
//     },
//     {
//       name: 'Amount',
//       selector: row => row.amount,
//       sortable: true,
//       cell: row => (
//         <span className="flex items-center">
//           AED {row.amount}
//         </span>
//       ),
//       width: 'px',
//     },
//     {
//       name: 'Status',
//       cell: row => {
//         const status = getPaymentStatusInfo(row.paymentStatus);
//         return (
//           <span className={`flex items-center ${status.color}`}>
//             <status.icon size={16} className="mr-2" /> {status.label}
//           </span>
//         );
//       },
//       sortable: true,
//       sortFunction: (rowA, rowB) => rowA.paymentStatus - rowB.paymentStatus,
//       width: '120px',
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         <button
//           onClick={() => fetchOrderDetails(row.orderID)}
//           disabled={detailsLoading}
//           className={`text-blue-600 hover:text-blue-800 flex items-center ${detailsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {detailsLoading ? (
//             <>
//               <Clock size={16} className="mr-2 animate-spin" /> Loading...
//             </>
//           ) : (
//             <>
//               <Info size={16} className="mr-2" /> View Meals
//             </>
//           )}
//         </button>
//       ),
//       width: '150px',
//     }
//   ];

//   // Custom styles for DataTable
//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: '#f3f4f6',
//         borderBottomColor: '#e5e7eb',
//       },
//     },
//     rows: {
//       style: {
//         '&:hover': {
//           backgroundColor: '#f9fafb',
//         },
//       },
//     },
//   };

//   // Loading and Error Components
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin">
//           <Clock size={48} className="text-blue-500" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50">
//         <div className="text-center p-6 bg-white rounded-lg shadow-md">
//           <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
//           <p className="text-red-600 text-lg mb-4">{error}</p>
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Retry Fetching Orders
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="relative w-full md:w-64">
//             <Search className="absolute left-2 top-3 h-5 w-5 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search by email, order ID or phone..."
//               className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-wrap justify-center gap-2">
//             {statusOptions.map((status) => (
//               <button
//                 key={status.value}
//                 onClick={() => setOrderStatus(status.value)}
//                 className={`
//                   flex items-center px-3 py-2 rounded-md whitespace-nowrap
//                   ${orderStatus === status.value
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'hover:bg-gray-100'
//                   }
//                 `}
//               >
//                 <status.icon
//                   size={16}
//                   className={`mr-2 ${status.color || 'text-gray-500'}`}
//                 />
//                 {status.label}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4">
//           <DataTable
//             columns={columns}
//             data={filteredOrders}
//             pagination
//             customStyles={customStyles}
//             highlightOnHover
//             pointerOnHover
//             paginationPerPage={10}
//             paginationRowsPerPageOptions={[10, 25, 50, 100]}
//             noDataComponent={
//               <div className="p-4 text-center flex flex-col items-center">
//                 <Info size={36} className="text-blue-500 mb-2" />
//                 <p>No orders found</p>
//               </div>
//             }
//           />
//         </div>
//       </div>

//       <MealDetailModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         orderDetails={orderDetails}
//       />
//     </div>
//   );
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
  AlertCircle,
  Coffee,
  DollarSign,
  MapPin,
  Phone
} from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealDetailModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen || !orderDetails) return null;

  // Calculate total for package meals
  const calculatePackageTotal = () => {
    let total = 0;
    if (orderDetails.selectedMeals?.package?.selectedMeals) {
      orderDetails.selectedMeals.package.selectedMeals.forEach(dayMeal => {
        dayMeal.meals.forEach(meal => {
          total += meal.fareDetails.totalFare || 0;
        });
      });
    }
    return total;
  };

  // Calculate total for addons
  const calculateAddonsTotal = () => {
    let total = 0;
    if (orderDetails.selectedMeals?.addons) {
      orderDetails.selectedMeals.addons.forEach(addon => {
        total += addon.fareDetails.totalFare || 0;
      });
    }
    return total;
  };

  const packageTotal = calculatePackageTotal();
  const addonsTotal = calculateAddonsTotal();
  const grandTotal = packageTotal + addonsTotal;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Meal Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* User Information */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <div className="text-blue-800 font-semibold mb-2">Customer Information</div>
          <div className="text-gray-700">{orderDetails.userEmail}</div>

          {/* Display address information */}
          {orderDetails.address && (
            <div className="mt-2">
              <div className="flex items-center text-gray-700">
                <MapPin size={14} className="mr-1 text-blue-600" />
                <span className="text-sm">
                  {[
                    orderDetails.address.houseOrFlatNumber,
                    orderDetails.address.buildingFloor,
                    orderDetails.address.street,
                    orderDetails.address.landmark,
                    orderDetails.address.city,
                    orderDetails.address.state,
                    orderDetails.address.postalCode,
                    orderDetails.address.country
                  ].filter(Boolean).join(', ')}
                </span>
              </div>
              <div className="flex items-center text-gray-700 mt-1">
                <Phone size={14} className="mr-1 text-blue-600" />
                <span className="text-sm">{orderDetails.address.phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Package Information */}
        {orderDetails.selectedMeals?.package?.selectedPackage && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Calendar size={18} className="mr-2 text-blue-600" />
              <span className="font-semibold text-lg">Package Duration</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-md mb-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">Start Date:</span>
                  <div className="font-medium">{orderDetails.selectedMeals.package.startDate}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">End Date:</span>
                  <div className="font-medium">{orderDetails.selectedMeals.package.endDate}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display selected meals by date */}
        {orderDetails.selectedMeals?.package?.selectedMeals?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Coffee size={18} className="mr-2 text-green-600" />
              <span className="font-semibold text-lg">Selected Meals</span>
            </div>

            {orderDetails.selectedMeals.package.selectedMeals.map((dayMeals, index) => (
              <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
                <div className="flex items-center mb-2 pb-2 border-b">
                  <Calendar size={16} className="mr-2 text-blue-500" />
                  <span className="font-semibold">{dayMeals.date}</span>
                </div>
                <div className="space-y-3">
                  {dayMeals.meals?.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="flex justify-between items-start pb-2 border-b border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{meal.mealName}</div>
                        <div className="text-sm text-gray-600">{meal.description}</div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-lg font-semibold">AED{meal.fareDetails.totalFare}</div>
                        {meal.fareDetails.strikeOff > 0 && (
                          <div className="text-xs text-gray-500 line-through">AED{meal.fareDetails.strikeOff}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display addons if any */}
        {orderDetails.selectedMeals?.addons?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Info size={18} className="mr-2 text-purple-600" />
              <span className="font-semibold text-lg">Add-ons</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              {orderDetails.selectedMeals.addons.map((addon, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start pb-3 border-b border-gray-200 mb-3 last:mb-0 last:border-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{addon.mealName}</div>
                    <div className="text-sm text-gray-600">{addon.description}</div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-lg font-semibold">AED{addon.fareDetails.totalFare}</div>
                    {addon.fareDetails.strikeOff > 0 && (
                      <div className="text-xs text-gray-500 line-through">AED{addon.fareDetails.strikeOff}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Summary Section */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Package Meals:</span>
              <span>AED{packageTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Add-ons:</span>
              <span>AED{addonsTotal.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>AED{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function OrderDetailsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState('all');

  // State for API fetching
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Changed from single detailsLoading to loadingOrderId to track which specific order is loading
  const [loadingOrderId, setLoadingOrderId] = useState(null);

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

  const fetchOrderDetails = async (orderId) => {
    setLoadingOrderId(orderId); // Set the specific order ID that's loading
    try {
      const response = await axios.post('https://api.dailyfit.ae/api/admin/get-orderDetails', {
        orderID: orderId
      }, {
        withCredentials: true
      });

      if (response.data.status && response.data.data.length > 0) {
        setOrderDetails(response.data.data[0]);
        setShowDetailsModal(true);
      } else {
        throw new Error('No order details found');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to fetch order details. Please try again.');
    } finally {
      setLoadingOrderId(null); // Clear the loading state
    }
  };

  // Get payment status display
  const getPaymentStatusInfo = (status) => {
    switch (status) {
      case 0:
        return { label: 'Not Paid', icon: XCircle, color: 'text-red-600' };
      case 1:
        return { label: 'Pending', icon: Clock, color: 'text-yellow-600' };
      case 2:
        return { label: 'Completed', icon: CheckCircle, color: 'text-green-600' };
      default:
        return { label: 'Unknown', icon: AlertCircle, color: 'text-gray-600' };
    }
  };

  // Format address to a single line for display in table
  const formatAddress = (address) => {
    if (!address) return 'No address';

    const parts = [
      address.houseOrFlatNumber,
      address.buildingFloor,
      address.street,
      address.city,
      address.state,
      address.postalCode
    ].filter(Boolean);

    return parts.join(', ');
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      (searchTerm === '' ||
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.address && order.address.phone && order.address.phone.includes(searchTerm))
      ) &&
      (orderStatus === 'all' ||
        (orderStatus === 'completed' && order.paymentStatus === 2) ||
        (orderStatus === 'pending' && order.paymentStatus === 1) ||
        (orderStatus === 'not-paid' && order.paymentStatus === 0)
      )
    );
  }, [orders, searchTerm, orderStatus]);

  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: MoreVertical },
    { value: 'not-paid', label: 'Not Paid', icon: XCircle, color: 'text-red-500' },
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-500' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-500' }
  ];

  // Columns for DataTable
  const columns = [
    {
      name: 'Order ID',
      selector: row => row.orderID,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Email',
      selector: row => row.userEmail,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Address',
      selector: row => formatAddress(row.address),
      sortable: false,
      cell: row => (
        <div className="flex items-start me-2">
          {/* <MapPin size={16} className="mr-1 mt-1 text-gray-500 flex-shrink-0" /> */}
          <span className="truncate max-w-xs">{formatAddress(row.address)}</span>
        </div>
      ),
      width: '300px',
    },
    {
      name: 'Phone',
      selector: row => row.address?.phone || 'N/A',
      sortable: true,
      cell: row => (
        <div className="flex items-center ms-5">
          {/* <Phone size={16} className="mr-1 text-gray-500" /> */}
          {row.address?.phone || 'N/A'}
        </div>
      ),
      width: '200px',
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
      cell: row => (
        <span className="flex items-center">
          AED {row.amount}
        </span>
      ),
      width: 'px',
    },
    {
      name: 'Status',
      cell: row => {
        const status = getPaymentStatusInfo(row.paymentStatus);
        return (
          <span className={`flex items-center ${status.color}`}>
            <status.icon size={16} className="mr-2" /> {status.label}
          </span>
        );
      },
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.paymentStatus - rowB.paymentStatus,
      width: '120px',
    },
    {
      name: 'Actions',
      cell: row => {
        const isCurrentRowLoading = loadingOrderId === row.orderID;
        return (
          <button
            onClick={() => fetchOrderDetails(row.orderID)}
            disabled={isCurrentRowLoading}
            className={`text-blue-600 hover:text-blue-800 flex items-center ${isCurrentRowLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isCurrentRowLoading ? (
              <>
                <Clock size={16} className="mr-2 animate-spin" /> Loading...
              </>
            ) : (
              <>
                <Info size={16} className="mr-2" /> View Meals
              </>
            )}
          </button>
        );
      },
      width: '150px',
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
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by email, order ID or phone..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setOrderStatus(status.value)}
                className={`
                  flex items-center px-3 py-2 rounded-md whitespace-nowrap
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
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
}