import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.27.235.199'
})
export default instance



// http://3.27.235.199

// Get request
// admin/getproducts
// admin/category


// post request

// admin/login
// admin/addproduct
// admin/addcategory