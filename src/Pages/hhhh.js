import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../axiosConfig';
import FooterPage from '../CommonLayouts/FooterPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Offcanvas } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const ListingSdkPage = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'region_name', direction: 'desc' });
    const [permissionsSession, setPermissionsSession] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    // Define form data state
    const [formData, setFormData] = useState({
        manufacturer_name: '',
        type: '',
        status: ''
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            const response = await axios.get('/sdk-manufacturer', {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    per_page: -1,
                },
            });
            setData(response.data.data.aaData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };


    const handleOffcanvasClose = () => {
        setShowOffcanvas(false);
        resetForm();
    };

    const handleOffcanvasShow = () => {
        setShowOffcanvas(true);
    };

    const handleEditClick = (item) => {
        // e.preventDefault(); 
        const statusValue = item.status === 'Active' ? 1 : item.status === 'Inactive' ? 0 : '';
        setFormData({
            sdk_manufacturer_id: item.encrypted_id,
            manufacturer_name: item.manufacturer_name,
            type: item.type,
            status: statusValue
        });
        setIsEditing(true);
        setShowOffcanvas(true);
    };
    const [isLoading, setIsLoading] = useState(false);

    // Add this component for the loader
    const LoadingOverlay = () => (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999
            }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="text-white mt-2">
                    {isEditing ? 'Updating Manufacturer...' : 'Adding Manufacturer...'}
                </div>
            </div>
        </div>
    );

    const handleSubmit = async () => {
        const { manufacturer_name, type, status } = formData;
        let newErrors = {};

        // Validate Manufacturer Name
        if (!manufacturer_name) {
            newErrors.manufacturer_name = 'Manufacturer Name is required.';
        } else if (manufacturer_name.length < 3 || manufacturer_name.length > 50) {
            newErrors.manufacturer_name = 'Manufacturer Name must be between 3 and 50 characters.';
        }

        // Validate Type
        if (!type) {
            newErrors.type = 'Type is required.';
        } else if (type.length < 3 || type.length > 50) {
            newErrors.type = 'Type must be between 3 and 50 characters.';
        }

        // Validate Status
        if (status === '' || status === undefined || status === null) {
            newErrors.status = 'Status is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);
            const token = sessionStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            };

            if (isEditing) {
                await axios.put(`/sdk-manufacturer`, formData, { headers });
                fetchData();
                toast.success('Manufacturer successfully updated!');
                setIsLoading(false);
                handleOffcanvasClose();

            } else {
                await axios.post('/sdk-manufacturer', formData, { headers });
                toast.success('Manufacturer successfully added!');
                setIsLoading(false);
                fetchData();
                handleOffcanvasClose();

            }

            fetchData();
            resetForm();
        } catch (error) {
            setIsLoading(false);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 422) {
                    if (data.message && data.message.includes('cannot be inactivated')) {
                        toast.error('The manufacturer cannot be inactivated because it is associated with SDK manufacturers.');
                    }
                } else {
                    toast('An unexpected error occurred. Please try again.', { type: 'error' });
                }
            }

            setErrors(newErrors);
        }
    };

    const resetForm = () => {
        setFormData({
            manufacturer_name: '',
            type: '',
            status: ''
        });
        setErrors({});
        setIsEditing(false);
    };
    const columns = [
        {
            name: 'Sl No',
            selector: (_, index) => index + 1,
            width: '70px'
        },
        {
            name: 'Manufacturer Name',
            selector: row => row.manufacturer_name,
            sortable: true,
            cell: row => (
                <div title={row.manufacturer_name}>
                    {row.manufacturer_name}
                </div>
            )
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
            cell: row => (
                <div title={row.type}>
                    {row.type}
                </div>
            )
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            cell: row => (
                <div title={row.status}>
                    {row.status}
                </div>
            )
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <span>
                        <a title="Edit"
                            href="#"
                            className="edit-item"
                            onClick={() => handleEditClick(row)}
                        >
                            <i className="icon-close fas fa-edit"></i>
                        </a>
                    </span>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const filteredData = data.filter(item => {
        const searchTermLower = searchTerm.toLowerCase();
        const ManufacturerName = item?.manufacturer_name || '';
        const Type = item?.type || '';
        const Status = item?.status || '';
        return ManufacturerName.toLowerCase().includes(searchTermLower) ||
            Type.toLowerCase().includes(searchTermLower) ||
            Status.toLowerCase().includes(searchTerm)
    });
    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="btm-for mb-4 text-lg-end">
                            <div className="btn-group mt-4">
                                <button
                                    type="button"
                                    className="btn template-btn px-5"
                                    onClick={() => {
                                        resetForm();
                                        handleOffcanvasShow();
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="m-4 d-flex justify-content-between align-items-center">
                        <h5>Manufacturer List</h5>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            sortServer={false}
                            progressPending={loading} // Show the spinner when loading is true
                            progressComponent={<LoadingSpinner />} // Use your custom spinner
                        />
                    </div>
                </div>
            </div>
            <FooterPage />
            <ToastContainer />
            <Offcanvas
                show={showOffcanvas}
                onHide={handleOffcanvasClose}
                placement="end"
                backdrop={true}
                className="custom-offcanvas addtask"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title style={{ color: 'white' }}>{isEditing ? 'Update' : 'Add'} Manufacturer</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="container-fluid">
                        <form className="row g-3 needs-validation" noValidate>
                            <div className="col-md-12">
                                <label htmlFor="manufacturer_name" className="form-label">Manufacturer Name<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.manufacturer_name ? 'is-invalid' : ''}`}
                                    id="manufacturer_name"
                                    name="manufacturer_name"
                                    value={formData.manufacturer_name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.manufacturer_name && (
                                    <div className="invalid-feedback">{errors.manufacturer_name}</div>
                                )}
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="type" className="form-label">Type <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.type && (
                                    <div className="invalid-feedback">{errors.type}</div>
                                )}
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="status" className="form-label">Status <span style={{ color: 'red' }}>*</span></label>
                                <select
                                    id="status"
                                    name="status"
                                    className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Select Status
                                    </option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {errors.status && (
                                    <div className="invalid-feedback">{errors.status}</div>
                                )}
                            </div>
                        </form>
                    </div>
                </Offcanvas.Body>
                <div className="button-footer">
                    <div className="d-md-flex d-flex d-grid align-items-center gap-3 justify-content-end">
                        <button
                            type="button"
                            className="btn px-4 template-btn"
                            onClick={handleSubmit}
                        >
                            {isEditing ? 'Update' : 'Add'}
                        </button>
                        <button
                            className="btn btn-cancel px-4"
                            type="button"
                            onClick={handleOffcanvasClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Offcanvas>
        </>
    );
};

export default ListingSdkPage;
