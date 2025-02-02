// controllers.js
const { db } = require('./firebase_config'); 
const { collection, getDocs, addDoc } = require('firebase/firestore');



const SECRET_KEY = 'your_jwt_secret_key'; 


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded; 
        next();
    });
};

const generateToken = (userId, email) => {
    const payload = { userId, email }; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, SECRET_KEY, options);
};

// Controller: Get users
const getUsers = async (req, res) => {
    try {
        const usersCollection = collection(db, 'users');  
        const snapshot = await getDocs(usersCollection);  
        const usersList = snapshot.docs.map(doc => ({
            id: doc.id,    
            ...doc.data()  
        }));
        res.status(200).json(usersList);  
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Error fetching users' });  
    }
};

// Controller: Create user
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;  
        if (!name || !email || !age) {
            return res.status(400).json({ message: 'Name, email, and age are required' });  
        }

        const newUser = {
            name,
            email,
            age,
            createdAt: new Date(),  
        };

        const usersCollection = collection(db, 'users');
        const docRef = await addDoc(usersCollection, newUser);  

        // Generate JWT token for the new user
        const token = generateToken(docRef.id, email);

        res.status(201).json({ message: 'User created', id: docRef.id, token });  
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error creating user' });  
    }
};

// Export functions
module.exports = {
    getUsers: [verifyToken, getUsers],  // Protect this route
    createUser,  // Token is generated here
    generateToken,  // Export for external use if needed
};
 
